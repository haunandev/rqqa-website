export interface Organization {
  name: string;
  foundedYear: number;
  address: {
    street: string;
    subdistrict: string;
    district: string;
    city: string;
    province: string;
    postalCode: string;
  };
  background: string[];
  vision: string;
  missions: string[];
  contact?: {
    email?: string;
    phone?: string;
    website?: string;
  };
}

export interface Program {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  category: "flagship" | "unit" | "education";
  details?: string[];
  image?: string;
}

export interface Unit {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  image?: string;
  email?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  image?: string;
  category?: string;
  tags?: string[];
}
