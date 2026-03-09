"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();
  const isFormPage = pathname === '/create' || pathname.includes('/edit');
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
      <div className="container mx-auto flex h-14 min-[425px]:h-16 items-center justify-between px-2 min-[425px]:px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-1.5 min-[425px]:gap-2">
          <div className="flex h-6 w-6 min-[425px]:h-8 min-[425px]:w-8 items-center justify-center rounded-md min-[425px]:rounded-lg bg-blue-600 text-white font-bold text-xs min-[425px]:text-base">
            SV
          </div>
          <span className="text-sm min-[425px]:text-xl font-bold tracking-tight">Snippet Vault</span>
        </Link>
        {isFormPage ? (
          <Link
            href="/"
            className="inline-flex h-7 min-[425px]:h-9 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 px-2 min-[425px]:px-4 py-1 min-[425px]:py-2 text-[10px] min-[425px]:text-sm font-medium text-gray-900 dark:text-gray-100 shadow-sm transition-colors hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-300"
          >
            Dashboard
          </Link>
        ) : (
          <Link
            href="/create"
            className="inline-flex h-7 min-[425px]:h-9 items-center justify-center rounded-md bg-blue-600 px-2 min-[425px]:px-4 py-1 min-[425px]:py-2 text-[10px] min-[425px]:text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
          >
            Create Snippet
          </Link>
        )}
      </div>
    </header>
  );
}
