import React from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { Wallets } from '@/components/Wallets'
import { NetworkContextName } from 'constants/misc'

function Web3StatusInner() {
  const { account, error } = useWeb3React()

  if (account) {
    return <p className="text-base"> Logged-in as {account}</p>
  } else if (error) {
    return (
      <p color="red">
        {error instanceof UnsupportedChainIdError ? 'Wrong Network' : Error}
      </p>
    )
  } else {
    return (
      <p className="text-lg">Sign in with one of available wallet providers</p>
    )
  }
}

const Web3Status: React.FC = ({}) => {
  const { active } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  return (
    <>
      <Web3StatusInner />
      {(contextNetwork.active || active) && <Wallets />}
    </>
  )
}

export default Web3Status
