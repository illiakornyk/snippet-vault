import { api } from '@/lib/api';
import Link from 'next/link';
import { SearchFilter } from '@/components/SearchFilter';
import { PaginationTop, PaginationBottom } from '@/components/Pagination';
import { SnippetCard } from '@/components/SnippetCard';
import { getStringParam, getIntParam } from '@/lib/utils';

interface HomeProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resolvedParams = await searchParams;
  const q = getStringParam(resolvedParams.q);
  const tag = getStringParam(resolvedParams.tag);
  const page = getIntParam(resolvedParams.page, 1);
  const limit = getIntParam(resolvedParams.limit, 9);

  let snippetsResult;
  let errorMsg: string | null = null;
  try {
    snippetsResult = await api.getSnippets({ q, tag, page, limit });
  } catch {
    errorMsg = 'Cannot reach server';
  }

  const snippets = snippetsResult?.data || [];
  const meta = snippetsResult?.meta;
  const hasFilters = Boolean(q || tag);

  function renderContent() {
    if (errorMsg) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center text-red-500 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900">
          <h2 className="text-xl font-semibold mb-2">Error Loading Snippets</h2>
          <p>{errorMsg}</p>
        </div>
      );
    }

    if (snippets.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
          <h2 className="text-xl font-semibold mb-2">No snippets found</h2>
          <p className="text-gray-500 mb-6">
            {hasFilters
              ? 'No snippets match your applied search filters.'
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
      );
    }

    return (
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
            <SnippetCard key={snippet._id} snippet={snippet} />
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
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Snippets</h1>
      </div>

      <SearchFilter />

      {renderContent()}
    </div>
  );
}
