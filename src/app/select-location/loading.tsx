export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <div className="h-20 border-b border-gray-100 bg-white" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="space-y-3">
            <div className="h-8 w-56 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-80 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="h-10 w-full animate-pulse rounded-lg bg-emerald-100" />
            <div className="h-4 w-64 animate-pulse rounded-full bg-gray-100" />
            <div className="h-12 w-full animate-pulse rounded-lg bg-gray-100" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="h-8 w-20 animate-pulse rounded-full bg-gray-200" />
              ))}
            </div>
            <div className="h-10 w-full animate-pulse rounded-lg bg-emerald-100" />
          </div>
        </div>
      </main>
    </div>
  );
}