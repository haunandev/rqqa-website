"use client";

/**
 * Subscribe Form Component
 * Client component for email subscription
 */

import { FormEvent } from "react";

export function SubscribeForm() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add subscription logic here
    console.log("Subscribe form submitted");
  };

  return (
    <form className="flex gap-2" onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email Anda"
        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-primary-600 text-sm"
      />
      <button
        type="submit"
        className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition text-sm font-semibold"
      >
        Subscribe
      </button>
    </form>
  );
}
