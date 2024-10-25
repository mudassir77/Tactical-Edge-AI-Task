import Image from 'next/image'
import React from 'react'

import { cn } from '@/lib/utils'

import { APP_IMAGES } from '@/constant/image'
interface backgroundWrapperProps {
    children: React.ReactNode,
    style?: string
}
const BackgroundWrapper = ({ children, style }: backgroundWrapperProps) => {
    return (
        <div className=''>
            {children}
            <Image
                className={cn('absolute bottom-0 w-full md:block hidden', style)}
                src={APP_IMAGES.backgroundImage}
                width='800'
                height='658'
                alt=''
            />
            <Image
                className={cn('absolute bottom-0 w-full block md:hidden', style)}
                src={APP_IMAGES.backgroundImageMobile}
                width='800'
                height='658'
                alt=''
            />
        </div>
    )
}

export default React.memo(BackgroundWrapper)
