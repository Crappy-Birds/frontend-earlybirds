import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { FaDiscord } from 'react-icons/fa'

const Home: NextPage = () => {
  return (
    <div className="h-screen">
      <Head>
        <title>Crappy Birds</title>
        <meta name="description" content="Early Birds" />
      </Head>

      <header className="h-20 flex items-center justify-center">
        <Image
          src="/images/logo.png"
          alt="Crappy Birds Logo"
          width={192}
          height={18}
        />
      </header>
      <main className="h-3/4 w-full relative flex flex-col items-center justify-center space-y-5">
        {/* <div className="w-full sm:w-96">
          <Image
            src="/images/logo.png"
            alt="Crappy Birds Logo"
            width={192}
            height={18}
          />
        </div> */}
        <div className="relative">
          <div className="relative z-10 flex flex-col bg-dark-400 w-64 py-8 px-6 items-center rounded-lg border border-gray-500 space-y-5">
            <h1 className="font-bold uppercase italic text-xl">
              You&#39;re early!
            </h1>
            <p className="italic">Login with Discord</p>
            <button className="bg-indigo-500 text-base uppercase font-semibold italic max-w-60 px-4 py-2 rounded inline-flex items-center">
              <FaDiscord className="w-6 h-6 mr-2" aria-hidden="true" />
              Login
            </button>
          </div>
          <div className="absolute top-0 right-0 -translate-y-2/3 w-[133px] rotate-12 h-auto z-0 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/bird_02.png"
              alt="Crappy Birds Logo"
              width={266 / 2}
              height={320 / 2}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Home
