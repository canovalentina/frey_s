function SkeletonAlbum() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-[#e2e0dd] mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-16 bg-[#e2e0dd] rounded" />
        <div className="h-5 w-32 bg-[#e2e0dd] rounded" />
        <div className="h-3 w-20 bg-[#e2e0dd] rounded" />
        <div className="h-4 bg-[#e2e0dd] rounded" />
        <div className="h-4 w-3/4 bg-[#e2e0dd] rounded" />
      </div>
    </div>
  );
}

export default function MusicLoading() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
      <div className="mb-16 space-y-4 animate-pulse">
        <div className="h-3 w-24 bg-[#e2e0dd] rounded" />
        <div className="h-16 w-48 bg-[#e2e0dd] rounded" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonAlbum key={i} />
        ))}
      </div>
    </div>
  );
}
