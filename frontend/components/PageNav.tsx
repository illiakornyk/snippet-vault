"use client";

import { useRouter } from 'next/navigation';

export interface PageNavProps {
  currentPage: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  createPageURL: (pageNumber: number | string) => string;
}

export function PageNav({
  currentPage,
  totalPages,
  hasPreviousPage,
  hasNextPage,
  createPageURL,
}: PageNavProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full sm:w-auto mt-4 sm:mt-0">
      <button
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={!hasPreviousPage}
        className="relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
      >
        Previous
      </button>

      <div className="hidden sm:flex items-center justify-center gap-1">
         <span className="px-3 py-2 text-sm text-gray-700 dark:text-gray-300">
           Page <span className="font-semibold">{currentPage}</span> of {totalPages}
         </span>
      </div>

      <button
         onClick={() => router.push(createPageURL(currentPage + 1))}
         disabled={!hasNextPage}
         className="relative inline-flex items-center justify-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors w-full sm:w-auto"
      >
        Next
      </button>
    </div>
  );
}
