import Link from 'next/link';
import { Snippet } from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface SnippetCardProps {
  snippet: Snippet;
}

export const typeColors: Record<string, string> = {
  note: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300',
  link: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  command: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
};

export function SnippetCard({ snippet }: SnippetCardProps) {
  const typeClasses = typeColors[snippet.type] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';

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
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${typeClasses}`}>
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
          {snippet.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30"
            >
              {tag}
            </span>
          ))}
          {snippet.tags.length > 3 && (
            <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-400/20">
              +{snippet.tags.length - 3}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
