'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { PageNav } from './PageNav';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const PAGE_LIMITS = [6, 9, 12, 15, 18];

function usePaginationURL() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
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
  const createPageURL = usePaginationURL();

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', newLimit);
    params.set('page', '1');
    router.push(`${pathname}?${params.toString()}`);
  };

  if (total === 0) return null;

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-6 mb-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          Showing{' '}
          <span className="font-semibold">{(currentPage - 1) * limit + 1}</span>{' '}
          to{' '}
          <span className="font-semibold">
            {Math.min(currentPage * limit, total)}
          </span>{' '}
          of <span className="font-semibold">{total}</span> results
        </span>

        <div className="flex items-center gap-2">
          <label
            htmlFor="limit"
            className="text-sm text-gray-500 dark:text-gray-400"
          >
            Per page:
          </label>
          <select
            id="limit"
            value={limit}
            onChange={handleLimitChange}
            className="text-sm rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-1 pl-2 pr-6 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {PAGE_LIMITS.map((limitValue) => (
              <option key={limitValue} value={limitValue}>
                {limitValue}
              </option>
            ))}
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
  const createPageURL = usePaginationURL();

  if (total === 0 || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center sm:justify-end mt-8 py-4 border-t border-gray-200 dark:border-gray-800 w-full">
      <PageNav
        currentPage={currentPage}
        totalPages={totalPages}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        createPageURL={createPageURL}
      />
    </div>
  );
}
