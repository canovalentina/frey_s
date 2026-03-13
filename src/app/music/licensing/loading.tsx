function SkeletonTrackCard() {
  return (
    <div className="border border-[#e2e0dd] p-5 flex flex-col gap-4 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-[#e2e0dd] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#e2e0dd] rounded w-2/3" />
          <div className="h-3 bg-[#e2e0dd] rounded w-1/3" />
        </div>
        <div className="space-y-1 shrink-0">
          <div className="h-3 bg-[#e2e0dd] rounded w-8" />
          <div className="h-5 bg-[#e2e0dd] rounded w-12" />
        </div>
      </div>
      <div className="h-10 bg-[#e2e0dd] rounded" />
      <div className="flex gap-2">
        <div className="h-5 w-16 bg-[#e2e0dd] rounded" />
        <div className="h-5 w-20 bg-[#e2e0dd] rounded" />
      </div>
    </div>
  );
}

export default function LicensingLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="mb-12 space-y-4 animate-pulse">
        <div className="h-3 w-24 bg-[#e2e0dd] rounded" />
        <div className="h-12 w-64 bg-[#e2e0dd] rounded" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#e2e0dd] mb-16">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="bg-[#f7f5f2] p-4 animate-pulse space-y-2">
            <div className="h-2 w-16 bg-[#e2e0dd] rounded" />
            <div className="h-5 w-20 bg-[#e2e0dd] rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonTrackCard key={i} />
        ))}
      </div>
    </div>
  );
}
