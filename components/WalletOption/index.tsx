/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Image from 'next/image'

interface WalletOptionProps {
  link?: string | null
  clickable?: boolean
  size?: number | null
  onClick?: null | (() => void)
  color: string
  header: React.ReactNode
  subheader: React.ReactNode | null
  icon: string
  active?: boolean
  id: string
}

export const WalletOption: React.FC<WalletOptionProps> = ({
  link = null,
  clickable = true,
  size,
  onClick = null,
  color,
  header,
  subheader = null,
  icon,
  active = false,
  id,
}) => {
  return (
    <button
      type="button"
      className="inline-flex items-center w-full px-4 py-3 text-base font-medium text-white align-middle bg-black border border-transparent rounded-lg hover:bg-dark-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
      id={id}
      disabled={!clickable}
      onClick={onClick || undefined}
    >
      <div className="flex items-center mr-6">
        <Image src={icon} alt={'Icon'} width={24} height={24} />
      </div>
      <span className="mr-auto font-black">{header}</span>
      <div>
        {active && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-200 text-green-900">
            Active
          </span>
        )}
      </div>
    </button>
  )
}
