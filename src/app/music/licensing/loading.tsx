export default function LicensingLoading() {
  return (
    <div className="px-6 md:px-12 py-16 md:py-20 animate-pulse">
      <div className="mb-12 space-y-3">
        <div className="h-2 w-20 bg-[#E5E5E5]" />
        <div className="h-6 w-36 bg-[#E5E5E5]" />
      </div>
      <div className="grid grid-cols-4 border border-[#E5E5E5] mb-12">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="p-5 space-y-2 border-r border-[#E5E5E5] last:border-r-0">
            <div className="h-2 w-16 bg-[#E5E5E5]" />
            <div className="h-3 w-20 bg-[#E5E5E5]" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border-t border-[#E5E5E5] py-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-[#E5E5E5]" />
              <div className="flex-1">
                <div className="h-3 w-32 bg-[#E5E5E5] mb-1.5" />
                <div className="h-2 w-20 bg-[#E5E5E5]" />
              </div>
            </div>
            <div className="h-6 bg-[#E5E5E5]" />
          </div>
        ))}
      </div>
    </div>
  );
}
