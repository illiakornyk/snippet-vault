import { api } from '@/lib/api';
import Link from 'next/link';
import { SearchFilter } from '@/components/SearchFilter';
import { PaginationTop, PaginationBottom } from '@/components/Pagination';
import { formatDate, getStringParam, getIntParam } from '@/lib/utils';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = getStringParam(resolvedParams.q);
  const tag = getStringParam(resolvedParams.tag);
  const page = getIntParam(resolvedParams.page, 1);
  const limit = getIntParam(resolvedParams.limit, 9);

  let snippetsResult;
  let errorMsg = null;
  try {
    snippetsResult = await api.getSnippets({ q, tag, page, limit });
  } catch (error) {
    errorMsg = 'Make sure the backend is running!';
  }

  const snippets = snippetsResult?.data || [];
  const meta = snippetsResult?.meta;
  const hasFilters = Boolean(q || tag);



  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Snippets</h1>
      </div>

      <SearchFilter />

      {errorMsg ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900">
          <h2 className="text-xl font-semibold mb-2">Error Loading Snippets</h2>
          <p>{errorMsg}</p>
        </div>
      ) : snippets.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">No snippets found</h2>
          <p className="text-gray-500 mb-6">
            {hasFilters
              ? "No snippets match your applied search filters."
              : "You don't have any snippets saved yet."}
          </p>
          {!hasFilters && (
            <Link
              href="/create"
              className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Create your first snippet
            </Link>
          )}
        </div>
      ) : (
        <>
          {meta && meta.total > 0 && (
            <PaginationTop
              currentPage={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              hasPreviousPage={meta.hasPreviousPage}
              hasNextPage={meta.hasNextPage}
            />
          )}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {snippets.map((snippet) => (
              <Link
                key={snippet._id}
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
                    {snippet.tags.map((tagObj) => (
                      <span
                        key={tagObj}
                        className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30"
                      >
                        {tagObj}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {meta && meta.totalPages >= 1 && (
            <PaginationBottom
              currentPage={meta.page}
              totalPages={meta.totalPages}
              total={meta.total}
              limit={meta.limit}
              hasPreviousPage={meta.hasPreviousPage}
              hasNextPage={meta.hasNextPage}
            />
          )}
        </>
      )}
    </div>
  );
}
