export function NewsroomLoadingPage() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-fullwidth animate-pulse flex-col">
      <div className="flex h-topbar w-full items-center justify-between bg-white-100 px-layout-sm shadow-sm">
        <div className="h-6 w-28 rounded bg-grey-40" />
        <div className="flex gap-4">
          <div className="h-4 w-16 rounded bg-grey-40" />
          <div className="h-4 w-16 rounded bg-grey-40" />
          <div className="h-4 w-16 rounded bg-grey-40" />
        </div>
      </div>

      <div className="dark flex flex-1 flex-col bg-slate-blue-95 py-24">
        <div className="mx-auto flex w-full max-w-content flex-col gap-4 px-layout-sm">
          <div className="h-12 w-2/3 rounded bg-slate-70" />
          <div className="h-5 w-full max-w-text rounded bg-slate-70" />
          <div className="h-5 w-4/5 max-w-text rounded bg-slate-70" />
          <div className="mt-4 h-14 w-full max-w-lg rounded bg-slate-70" />
        </div>

        <div className="mx-auto mt-16 flex w-full max-w-content flex-col gap-8 px-layout-sm lg:grid lg:grid-cols-[27%_1fr] lg:gap-12">
          <div className="flex flex-col gap-4">
            <div className="h-6 w-32 rounded bg-slate-70" />
            <div className="h-12 w-full rounded bg-slate-70" />
            <div className="h-12 w-full rounded bg-slate-70" />
            <div className="h-12 w-full rounded bg-slate-70" />
          </div>
          <div className="flex flex-col gap-6">
            <div className="h-8 w-48 rounded bg-slate-70" />
            {['first', 'second', 'third', 'fourth'].map((id) => (
              <div className="border-slate-70 border-b pb-6" key={id}>
                <div className="flex flex-col gap-3">
                  <div className="h-5 w-1/3 rounded bg-slate-70" />
                  <div className="h-7 w-4/5 rounded bg-slate-70" />
                  <div className="h-4 w-2/3 rounded bg-slate-70" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
