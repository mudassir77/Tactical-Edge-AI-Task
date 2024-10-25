import React from 'react'

import SignUpCard from '@/app/components/cards/SignUpCard'

import BackgroundWrapper from '../components/wrapper/BackgroundWrapper'

const signIn = () => {

    return (
        <BackgroundWrapper>
            <div className='flex items-center justify-center h-screen flex-col gap-10 p-2'>
                <p className='text-white font-primary font-semibold text-5xl leading-14 lg:text-[64px] lg:leading-20'>
                    Sign up
                </p>
                <SignUpCard />
            </div>
        </BackgroundWrapper>
    )
}

export default signIn
