/\*\*

- Contoh Implementasi
- Cara menggunakan Strapi API setup di components dan pages
  \*/

// ============================================================
// 1. SERVER COMPONENT - Fetch data di server
// ============================================================

import { programService } from '@/lib/api/services/programService';
import Link from 'next/link';

export default async function ProgramPage() {
try {
// Fetch data di server - lebih aman dan performant
const { data: programs } = await programService.getPublished({
pageSize: 20,
});

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Program Kami</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs?.map((program) => (
            <Link
              key={program.id}
              href={`/program/${program.attributes.slug}`}
            >
              <article className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                {program.attributes.media?.data?.[0] && (
                  <img
                    src={program.attributes.media.data[0].attributes.url}
                    alt={program.attributes.media.data[0].attributes.alternativeText || program.attributes.title}
                    className="w-full h-48 object-cover"
                  />
                )}

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">
                    {program.attributes.title}
                  </h2>
                  <p className="text-gray-600">
                    {program.attributes.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    );

} catch (error) {
console.error('Failed to fetch programs:', error);
return <div>Gagal memuat program</div>;
}
}

// ============================================================
// 2. CLIENT COMPONENT - Fetch data di client dengan hook
// ============================================================

'use client';

import { useStrapiBList } from '@/hooks/useStrapiData';

export function ProgramList() {
const { data: programs, loading, error } = useStrapiBList('programs', {
populate: 'media',
pagination: { pageSize: 10 },
});

if (loading) {
return <div>Loading...</div>;
}

if (error) {
return <div>Error: {error.message}</div>;
}

return (

<div className="space-y-4">
{programs?.map((program) => (
<div key={program.id} className="border rounded p-4">
<h3 className="font-semibold">{program.attributes.title}</h3>
<p>{program.attributes.description}</p>
</div>
))}
</div>
);
}

// ============================================================
// 3. DYNAMIC ROUTE - Fetch single item berdasarkan slug
// ============================================================

import type { Metadata } from 'next';

interface Props {
params: {
slug: string;
};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
try {
const program = await programService.getBySlug(params.slug);

    return {
      title: program?.attributes.title,
      description: program?.attributes.description,
    };

} catch (error) {
return { title: 'Program' };
}
}

export default async function ProgramDetail({ params }: Props) {
try {
const program = await programService.getBySlug(params.slug);

    if (!program) {
      return <div>Program tidak ditemukan</div>;
    }

    return (
      <article className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">
          {program.attributes.title}
        </h1>

        {program.attributes.media?.data?.[0] && (
          <img
            src={program.attributes.media.data[0].attributes.url}
            alt={program.attributes.media.data[0].attributes.alternativeText || program.attributes.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />
        )}

        <div className="prose max-w-none">
          {program.attributes.content && (
            <div dangerouslySetInnerHTML={{ __html: program.attributes.content }} />
          )}

          {!program.attributes.content && (
            <p>{program.attributes.description}</p>
          )}
        </div>
      </article>
    );

} catch (error) {
console.error('Failed to fetch program:', error);
return <div>Gagal memuat program</div>;
}
}

// ============================================================
// 4. API ROUTE - Fetch & transform data (optional)
// ============================================================

// app/api/programs/route.ts
import { programService } from '@/lib/api/services/programService';
import { NextResponse } from 'next/server';

export async function GET() {
try {
const { data: programs } = await programService.getPublished();

    return NextResponse.json({
      success: true,
      data: programs,
    });

} catch (error) {
return NextResponse.json(
{
success: false,
error: error instanceof Error ? error.message : 'Unknown error',
},
{ status: 500 }
);
}
}

// ============================================================
// 5. FORM SUBMISSION - Create/Update data
// ============================================================

'use client';

import { programService } from '@/lib/api/services/programService';
import { FormEvent, useState } from 'react';

export function CreateProgramForm() {
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [success, setSuccess] = useState(false);

async function handleSubmit(e: FormEvent<HTMLFormElement>) {
e.preventDefault();
setLoading(true);
setError(null);
setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get('title'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      content: formData.get('content'),
    };

    try {
      await programService.create(data);
      setSuccess(true);
      e.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create program');
    } finally {
      setLoading(false);
    }

}

return (

<form onSubmit={handleSubmit} className="space-y-4">
{error && <div className="text-red-600">{error}</div>}
{success && <div className="text-green-600">Program berhasil dibuat!</div>}

      <div>
        <label className="block font-semibold mb-2">Title</label>
        <input
          type="text"
          name="title"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Slug</label>
        <input
          type="text"
          name="slug"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Description</label>
        <textarea
          name="description"
          required
          className="w-full border rounded p-2"
        />
      </div>

      <div>
        <label className="block font-semibold mb-2">Content</label>
        <textarea name="content" className="w-full border rounded p-2" />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Create Program'}
      </button>
    </form>

);
}

// ============================================================
// 6. SEARCH FUNCTIONALITY
// ============================================================

'use client';

import { programService } from '@/lib/api/services/programService';
import { useCallback, useState } from 'react';

export function SearchPrograms() {
const [results, setResults] = useState<any[]>([]);
const [loading, setLoading] = useState(false);

const handleSearch = useCallback(async (query: string) => {
if (!query.trim()) {
setResults([]);
return;
}

    setLoading(true);
    try {
      const { data } = await programService.search(query);
      setResults(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }

}, []);

return (

<div>
<input
type="search"
placeholder="Search programs..."
onChange={(e) => handleSearch(e.target.value)}
className="w-full border rounded p-2"
/>

      {loading && <p>Searching...</p>}

      <div className="space-y-2 mt-4">
        {results.map((result) => (
          <div key={result.id} className="border rounded p-3">
            <h4 className="font-semibold">{result.attributes.title}</h4>
            <p className="text-sm text-gray-600">
              {result.attributes.description}
            </p>
          </div>
        ))}
      </div>
    </div>

);
}
