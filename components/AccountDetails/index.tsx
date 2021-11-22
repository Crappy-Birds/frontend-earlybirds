import { useWeb3React } from '@web3-react/core'
import React, { useState } from 'react'
import { HiCheckCircle, HiX } from 'react-icons/hi'
import { ButtonIcon } from '../ButtonIcon'
import { useRouter } from 'next/router'

export interface LinkUserResponse {
  type: string
  error?: string
}

function linkUser(
  walletAddress: string,
  discordAddress: string | string[]
): Promise<LinkUserResponse> {
  return new Promise<LinkUserResponse>((resolve, reject) => {
    fetch(`${process.env.NEXT_PUBLIC_API}wallet/discord`, {
      method: 'post',
      body: JSON.stringify({
        walletAddress: walletAddress,
        discordAddress: discordAddress,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .then((res: any) => {
        res.status === 200 ? resolve(res.json()) : reject(res.json())
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .catch((error: any) => reject(error))
  })
}

export const AccountDetails: React.FC = ({}) => {
  const { account, library } = useWeb3React()
  const router = useRouter()
  const { id } = router.query

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(false)

  async function validateAccount() {
    if (!!(library && account && id)) {
      library
        .getSigner(account)
        .signMessage(process.env.NEXT_PUBLIC_SIGN_KEY)
        .then(async () => {
          const result = await linkUser(account, id)
          console.log(result)
          if (result.type == 'success') {
            setSuccess(true)
          } else if (result.type == 'error' && result.error) {
            setError(result.error)
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .catch((error: any) => {
          setError(error.message)
          setSuccess(false)
        })
    }
  }

  return (
    <div className="space-y-5">
      <p>Sign a message to validate your entry</p>
      {error != '' && (
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
