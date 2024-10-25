import React from 'react'

import { cn } from '@/lib/utils'

import Loader from '@/app/components/loader/Loader'
interface AppButtonProps {
  style?: string,
  text: string,
  disabled?: boolean
  isLoading?: boolean
  onClick?: () => void,
  type?: 'button' | 'submit' | 'reset'
}
const AppButton = ({ text, style, onClick, disabled, isLoading, type }: AppButtonProps) => {
  return (

    <button onClick={onClick} type={type} className={cn("bg-buttonGreen font-bold font-primary text-base text-white rounded-md leading-6 py-[15px] px-10 cursor-pointer hover:opacity-80", style)}>
      {isLoading ? (
        <div className='flex justify-center'>
          <Loader size='xs' />
        </div>
      ) :
        <div>
          {text}
        </div>
      }

    </button>
  )
}
export default React.memo(AppButton)
