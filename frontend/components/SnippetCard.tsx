import Link from 'next/link';
import { Snippet } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface SnippetCardProps {
  snippet: Snippet;
}

export function SnippetCard({ snippet }: SnippetCardProps) {
  return (
    <Link
      href={`/snippet/${snippet._id}`}
      className="group flex flex-col justify-between h-full block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-950"
    >
      <div>
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" title={snippet.title}>
            {snippet.title}
          </h3>
          <div className="flex flex-col items-end shrink-0 ml-2">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-800 dark:text-gray-200">
              {snippet.type}
            </span>
            <span className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
              {formatDate(snippet.createdAt)}
            </span>
          </div>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 mb-4">
          {snippet.content}
        </p>
      </div>

      {snippet.tags && snippet.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-gray-900">
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
  );
}
