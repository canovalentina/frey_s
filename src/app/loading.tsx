export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="flex flex-col gap-2 w-32">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="h-[1px] bg-[#E5E5E5] animate-pulse"
            style={{ animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
