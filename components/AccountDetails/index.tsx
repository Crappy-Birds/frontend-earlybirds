import { useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'
import { HiCheckCircle, HiX } from 'react-icons/hi'
import { ButtonIcon } from '../ButtonIcon'

export const AccountDetails: React.FC = ({}) => {
  const { account, library } = useWeb3React()

  const [error, setError] = useState<string>()
  const [success, setSuccess] = useState<boolean>(false)

  function validateAccount() {
    if (!!(library && account)) {
      library
        .getSigner(account)
        .signMessage(process.env.NEXT_PUBLIC_SIGN_KEY)
        .then(async (signature: string) => {
          console.log(signature)
          /** @todo save data */
          setSuccess(true)
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          //toast error
          setError(error.message)
          setSuccess(false)
        })
    }
  }

  return (
    <div className="space-y-5">
      <p>Sign a message to validate your entry</p>
      {error && (
        <div className="p-4 bg-red-100 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <HiX className="w-5 h-5 text-red-400" aria-hidden="true" />
            </div>
            <div className="flex-1 ml-3 md:flex md:justify-between">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="p-4 bg-green-100 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <HiCheckCircle
                className="w-5 h-5 text-green-400"
                aria-hidden="true"
              />
            </div>
            <div className="flex-1 ml-3 md:flex md:justify-between">
              <p className="text-sm text-green-700">Account validated</p>
            </div>
          </div>
        </div>
      )}
      <ButtonIcon action={validateAccount}>Sign Message</ButtonIcon>
      <p className="text-xs italic text-gray-500">Connected as: {account}</p>
    </div>
  )
}
