export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <div className="h-20 border-b border-gray-100 bg-white" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 space-y-3">
            <div className="h-8 w-80 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-56 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <div className="h-20 w-20 animate-pulse rounded-[10px] bg-gray-200" />
                    <div className="flex-1 space-y-3">
                      <div className="h-6 w-48 animate-pulse rounded-full bg-gray-200" />
                      <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
                      <div className="h-4 w-5/6 animate-pulse rounded-full bg-gray-100" />
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <div className="h-10 animate-pulse rounded-lg bg-emerald-100" />
                    <div className="h-10 animate-pulse rounded-lg bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-80 animate-pulse rounded-2xl bg-white shadow-sm" />
          </div>
        </div>
      </main>
    </div>
  );
}