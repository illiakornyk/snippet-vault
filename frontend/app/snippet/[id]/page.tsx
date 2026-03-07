import { api } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DeleteButton } from '@/components/DeleteButton';
import { formatDateTime } from '@/lib/utils';

export default async function SnippetDetails({ params }: { params: Promise<{ id: string }> }) {
  let snippet;
  try {
    const { id } = await params;
    snippet = await api.getSnippet(id);
  } catch (error) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="mb-8">
        <Link
          href="/"
          className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 flex items-center gap-1 mb-4"
        >
          ← Back to snippets
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-4xl font-extrabold tracking-tight">{snippet.title}</h1>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-0.5 text-sm font-semibold text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
              {snippet.type}
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div>
            Created: <span className="font-medium text-gray-700 dark:text-gray-300">{formatDateTime(snippet.createdAt)}</span>
          </div>
          {snippet.updatedAt !== snippet.createdAt && (
            <div>
              Updated: <span className="font-medium text-gray-700 dark:text-gray-300">{formatDateTime(snippet.updatedAt)}</span>
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 overflow-hidden">
        <div className="p-6 sm:p-8">
          <pre className="whitespace-pre-wrap font-mono text-sm sm:text-base leading-relaxed text-gray-800 dark:text-gray-200">
            {snippet.content}
          </pre>
        </div>

        {snippet.tags && snippet.tags.length > 0 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
            <div className="flex flex-wrap gap-2">
              {snippet.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-md bg-white px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 w-full">
        <DeleteButton id={snippet._id} />
        <Link
          href={`/snippet/${snippet._id}/edit`}
          className="w-full sm:w-auto text-center px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm transition-colors"
        >
          Edit Snippet
        </Link>
      </div>
    </div>
  );
}
