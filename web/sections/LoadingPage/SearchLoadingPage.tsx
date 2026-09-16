export function SearchLoadingPage() {
  return (
    <main className="min-h-[calc(100dvh-694px)] animate-pulse bg-slate-blue-95 md:min-h-[calc(100dvh-479px)]">
      <div className="mx-auto p-8 px-layout-sm lg:px-layout-lg">
        <div className="grid grid-cols-[1fr_min-content]">
          <div className="h-14 rounded-s-xs bg-white-100/20" />
          <div className="h-14 w-14 rounded-e-xs bg-white-100/30" />
        </div>
      </div>
    </main>
  );
}
