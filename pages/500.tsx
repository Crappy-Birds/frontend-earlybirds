export default function Custom500() {
  return (
    <div className="relative h-screen">
      <main className="flex flex-col items-center justify-center w-full h-full space-y-5">
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-xl italic font-bold uppercase md:text-3xl">
            OOPS ! Server-side error occurred
          </h1>
        </div>
      </main>
    </div>
  )
}
