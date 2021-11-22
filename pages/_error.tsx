/* eslint-disable @typescript-eslint/no-explicit-any */
function Error({ statusCode }: any) {
  return (
    <div className="relative h-screen">
      <main className="flex flex-col items-center justify-center w-full h-full space-y-5">
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-xl italic font-bold uppercase md:text-3xl">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </h1>
        </div>
      </main>
    </div>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
