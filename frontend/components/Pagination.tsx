"use client";

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

function PageNav({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  createPageURL,
  router,
}: any) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={!hasPreviousPage}
        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      <div className="flex items-center gap-1 hidden sm:flex">
         <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
           Page <span className="font-semibold">{currentPage}</span> of {totalPages}
         </span>
      </div>

      <button
         onClick={() => router.push(createPageURL(currentPage + 1))}
         disabled={!hasNextPage}
         className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}

export function PaginationTop({
  currentPage,
  totalPages,
  total,
  limit,
  hasPreviousPage,
  hasNextPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-semibold">{(currentPage - 1) * limit + 1}</span> to{' '}
          <span className="font-semibold">{Math.min(currentPage * limit, total)}</span> of{' '}
          <span className="font-semibold">{total}</span> results
        </span>

        <div className="flex items-center gap-2">
          <label htmlFor="limit" className="text-sm text-gray-500 dark:text-gray-400">
            Per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 pl-2 pr-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="6">6</option>
            <option value="9">9</option>
            <option value="12">12</option>
            <option value="15">15</option>
            <option value="18">18</option>
          </select>
        </div>
      </div>

      {totalPages > 1 && (
        <PageNav
          currentPage={currentPage}
          totalPages={totalPages}
          hasPreviousPage={hasPreviousPage}
          hasNextPage={hasNextPage}
          createPageURL={createPageURL}
          router={router}
        />
      )}
    </div>
  );
}

export function PaginationBottom({
  currentPage,
  totalPages,
  total,
  hasPreviousPage,
  hasNextPage,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (total === 0 || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-end mt-8 py-4 border-t border-gray-200 dark:border-gray-800">
      <PageNav
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        createPageURL={createPageURL}
        router={router}
      />
    </div>
  );
}
