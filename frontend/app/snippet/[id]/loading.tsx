export default function SnippetDetailsLoading() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 animate-pulse">
      <div className="mb-8">
        {/* Back link */}
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>

        {/* Title + type badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="h-10 w-3/4 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-7 w-16 bg-blue-100 dark:bg-blue-900/30 rounded-full"></div>
        </div>

        {/* Dates */}
        <div className="mt-4 flex items-center gap-4">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>

      {/* Content block */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-950 overflow-hidden">
        <div className="p-6 sm:p-8 space-y-3">
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-11/12"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
        </div>

        {/* Tags */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 dark:bg-gray-900/50 dark:border-gray-800">
          <div className="flex gap-2">
            <div className="h-6 w-14 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-6 w-18 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            <div className="h-6 w-12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-end gap-3 w-full">
        <div className="h-9 w-full sm:w-28 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
        <div className="h-9 w-full sm:w-28 bg-blue-200 dark:bg-blue-900/30 rounded-md"></div>
      </div>
    </div>
  );
}
