"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') || '');
  const [tag, setTag] = useState(searchParams.get('tag') || '');

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (tag.trim()) params.set('tag', tag.trim());


    router.push(`/?${params.toString()}`);
  };

  const handleClear = () => {
    setQ('');
    setTag('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSearch} className="mb-6 bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
      <div className="md:col-span-5 lg:col-span-6">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Search
        </label>
        <input
          type="text"
          id="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search by title or content..."
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div className="md:col-span-4 lg:col-span-4">
        <label htmlFor="tag" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Filter by Tag
        </label>
        <input
          type="text"
          id="tag"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="e.g. react"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800"
        />
      </div>
      <div className="md:col-span-3 lg:col-span-2 flex gap-2 w-full mt-2 md:mt-0">
        <button
          type="submit"
          className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
        >
          Apply
        </button>
        {(q || tag) && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-md transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </form>
  );
}
