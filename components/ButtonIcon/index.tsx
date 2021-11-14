import React from 'react'
import { IconType } from 'react-icons/lib'

interface ButtonIconProps {
  icon?: IconType
  action?: () => void
}

export const ButtonIcon: React.FC<ButtonIconProps> = ({
  icon,
  action,
  children,
}) => {
  const Icon = icon
  return (
    <button
      className="inline-flex items-center justify-center w-full px-5 py-3 text-sm italic font-semibold uppercase bg-black rounded max-w-60"
      onClick={action}
    >
      {Icon && <Icon className="w-5 h-5 mr-4" aria-hidden="true" />}
      {children}
    </button>
  )
}
