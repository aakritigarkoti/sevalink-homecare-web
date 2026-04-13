export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <div className="h-20 border-b border-gray-100 bg-white" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg rounded-xl border border-gray-200 bg-white p-6 shadow-md">
          <div className="space-y-3">
            <div className="h-8 w-56 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-72 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 p-2">
              <div className="h-20 w-20 animate-pulse rounded-[10px] bg-gray-200" />
              <div className="h-5 w-48 animate-pulse rounded-full bg-gray-200" />
            </div>

            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-12 animate-pulse rounded-lg bg-gray-100" />
            ))}

            <div className="h-11 w-full animate-pulse rounded-lg bg-emerald-100" />
          </div>
        </div>
      </main>
    </div>
  );
}