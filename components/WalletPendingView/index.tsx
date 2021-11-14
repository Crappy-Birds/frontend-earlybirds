import React from 'react'
import { injected } from '../../connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { SUPPORTED_WALLETS } from '../../constants/wallet'
import { WalletOption } from '@/components/WalletOption'
import { HiInformationCircle, HiX } from 'react-icons/hi'

interface WalletPendingViewProps {
  connector?: AbstractConnector
  error?: boolean
  setPendingError: (error: boolean) => void
  tryActivation: (connector: AbstractConnector) => void
}

export const WalletPendingView: React.FC<WalletPendingViewProps> = ({
  connector,
  error = false,
  setPendingError,
  tryActivation,
}) => {
  const isMetamask = window?.ethereum?.isMetaMask

  return (
    <>
      <div>
        {error ? (
          <div className="p-4 bg-red-100 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <HiX className="w-5 h-5 text-red-400" aria-hidden="true" />
              </div>
              <div className="flex-1 ml-3 md:flex md:justify-between">
                <p className="text-sm text-red-700">Error connecting</p>
                <p className="mt-3 text-sm md:mt-0 md:ml-6">
                  <button
                    className="font-medium text-red-700 whitespace-nowrap hover:text-red-600"
                    onClick={() => {
                      setPendingError(false)
                      connector && tryActivation(connector)
                    }}
                  >
                    Try Again <span aria-hidden="true">&rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-blue-100 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <HiInformationCircle
                  className="w-5 h-5 text-blue-400"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1 ml-3 md:flex md:justify-between">
                <p className="text-sm text-blue-700">Initializing...</p>
              </div>
            </div>
          </div>
        )}
      </div>
      {Object.keys(SUPPORTED_WALLETS).map((key) => {
        const option = SUPPORTED_WALLETS[key]
        if (option.connector === connector) {
          if (option.connector === injected) {
            if (isMetamask && option.name !== 'MetaMask') {
              return null
            }
            if (!isMetamask && option.name === 'MetaMask') {
              return null
            }
          }
          return (
            <WalletOption
              id={`connect-${key}`}
              key={key}
              clickable={false}
              color={option.color}
              header={option.name}
              subheader={option.description}
              icon={option.iconURL}
            />
          )
        }
        return null
      })}
    </>
  )
}
