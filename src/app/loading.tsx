export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <div className="h-20 border-b border-gray-100 bg-white px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between">
          <div className="h-10 w-36 animate-pulse rounded-lg bg-gray-200" />
          <div className="hidden gap-3 md:flex">
            <div className="h-4 w-24 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-20 animate-pulse rounded-full bg-gray-200" />
            <div className="h-4 w-28 animate-pulse rounded-full bg-gray-200" />
          </div>
          <div className="h-10 w-32 animate-pulse rounded-full bg-gray-200" />
        </div>
      </div>

      <main className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center">
          <div className="w-full max-w-3xl space-y-3 text-center">
            <div className="mx-auto h-5 w-40 animate-pulse rounded-full bg-gray-200" />
            <div className="mx-auto h-10 w-72 animate-pulse rounded-xl bg-gray-200 sm:w-96" />
            <div className="mx-auto h-4 w-64 animate-pulse rounded-full bg-gray-200" />
          </div>

          <div className="mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-24 animate-pulse rounded-2xl bg-white shadow-sm" />
            ))}
          </div>

          <div className="mt-10 grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-72 animate-pulse rounded-[20px] bg-white shadow-sm" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}