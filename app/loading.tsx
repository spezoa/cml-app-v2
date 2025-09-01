export default function RootLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded"></div>
        <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded"></div>
      </div>
    </div>
  );
}