import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Web3Status from '@/components/Web3Status'

const Link: NextPage = () => {
  return (
    <div className="relative h-screen">
      <Head>
        <title>Crappy Birds</title>
        <meta name="description" content="Early Birds" />
      </Head>

      <header className="absolute top-0 left-0 flex items-center justify-center w-full h-28">
        <Image
          src="/images/logo.png"
          alt="Crappy Birds Logo"
          width={498 / 1.5}
          height={115 / 1.5}
        />
      </header>
      <main className="flex flex-col items-center justify-center w-full h-full space-y-5">
        <div className="relative">
          <div className="relative z-10 flex flex-col items-center px-6 py-8 space-y-5 border border-gray-500 rounded-lg bg-dark-400">
            <h1 className="text-xl italic font-bold uppercase">
              You&#39;re early!
            </h1>
            <div className="flex flex-col max-w-xs space-y-4 break-words md:max-w-lg">
              <Web3Status />
            </div>
          </div>
          <div className="absolute top-0 right-0 -translate-y-2/3 w-[133px] rotate-12 h-auto z-0 hover:rotate-0 transition-transform duration-500">
            <Image
              src="/images/bird_02.png"
              alt="Early Crappy Bird catches the worm"
              width={266 / 2}
              height={320 / 2}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Link
