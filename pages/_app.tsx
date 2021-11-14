/* eslint-disable @typescript-eslint/no-explicit-any */
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Web3ReactProvider } from '@web3-react/core'
import Web3ReactManager from '@/components/Web3ReactManager'
import getLibrary from 'utils/getLibrary'

declare global {
  interface Window {
    web3: any
    ethereum: any
    Box: any
    box: any
    space: any
    [name: string]: any
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ReactManager>
        <Component {...pageProps} />
      </Web3ReactManager>
    </Web3ReactProvider>
  )
}
export default MyApp
