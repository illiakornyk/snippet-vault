export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Your Snippets</h1>
      </div>

      <div className="mb-6 bg-white dark:bg-gray-950 p-4 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col sm:flex-row gap-4 items-end animate-pulse">
        <div className="flex-1 w-full h-16 bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        <div className="flex-1 w-full sm:max-w-xs h-16 bg-gray-100 dark:bg-gray-900 rounded-md"></div>
        <div className="w-full sm:w-20 h-9 bg-gray-100 dark:bg-gray-900 rounded-md mb-0"></div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="h-48 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 animate-pulse"
          >
            <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6"></div>
            </div>
            <div className="mt-6 flex gap-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
              <div className="h-6 w-12 bg-gray-200 dark:bg-gray-800 rounded-md"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
