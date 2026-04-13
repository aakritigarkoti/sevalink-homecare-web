export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f6fbf8]">
      <div className="h-20 border-b border-gray-100 bg-white" />
      <main className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="h-52 w-full animate-pulse rounded-xl bg-gray-200" />
          <div className="mt-5 space-y-3">
            <div className="h-4 w-40 animate-pulse rounded-full bg-gray-200" />
            <div className="h-8 w-80 animate-pulse rounded-xl bg-gray-200" />
            <div className="h-4 w-full animate-pulse rounded-full bg-gray-100" />
            <div className="h-4 w-5/6 animate-pulse rounded-full bg-gray-100" />
          </div>
          <div className="mt-6 h-32 w-full animate-pulse rounded-xl bg-gray-100" />
          <div className="mt-6 h-12 w-44 animate-pulse rounded-lg bg-emerald-100" />
        </div>
      </main>
    </div>
  );
}