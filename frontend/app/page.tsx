import { api } from '@/lib/api';
import Link from 'next/link';

export default async function Home() {

  let snippetsResult;
  try {
    snippetsResult = await api.getSnippets();
  } catch (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center text-red-500">
        <h2 className="text-2xl font-semibold mb-2">Error Loading Snippets</h2>
        <p>Make sure the backend is running!</p>
      </div>
    );
  }

  const snippets = snippetsResult?.data || [];

  if (snippets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-semibold mb-2">No snippets found</h2>
        <p className="text-gray-500 mb-6">You don't have any snippets saved yet.</p>
        <Link
          href="/create"
          className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Create your first snippet
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Snippets</h1>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => (
          <Link
            key={snippet._id}
            href={`/snippet/${snippet._id}`}
            className="group block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 transition-colors">
                {snippet.title}
              </h3>
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                {snippet.type}
              </span>
            </div>
            <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
              {snippet.content}
            </p>
            {snippet.tags && snippet.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-auto">
                {snippet.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
