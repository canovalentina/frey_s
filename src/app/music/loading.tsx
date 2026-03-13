export default function MusicLoading() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20">
      <div className="mb-12 border-b border-[#E5E5E5] pb-8 animate-pulse">
        <div className="h-2 w-16 bg-[#E5E5E5] mb-3" />
        <div className="h-6 w-24 bg-[#E5E5E5]" />
      </div>
      <div className="flex flex-col">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-6 py-5 border-b border-[#E5E5E5] animate-pulse">
            <div className="w-5 h-2 bg-[#E5E5E5]" />
            <div className="w-12 h-12 bg-[#E5E5E5] shrink-0" />
            <div className="flex-1 space-y-2">
              <div className="h-3 w-32 bg-[#E5E5E5]" />
              <div className="h-2 w-48 bg-[#E5E5E5]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
