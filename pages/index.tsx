import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="relative h-screen">
      <Head>
        <title>Crappy Birds</title>
        <meta name="description" content="Early Birds" />
      </Head>
      <main className="flex flex-col items-center justify-center w-full h-full space-y-5">
        <div className="z-10 flex flex-col items-center">
          <h1 className="text-xl italic font-bold uppercase md:text-3xl">
            Looking for something ? 👀
          </h1>
        </div>
      </main>
    </div>
  )
}

export default Home
