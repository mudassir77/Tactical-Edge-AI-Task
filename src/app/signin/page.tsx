import React from 'react'

import SignInCard from '../components/cards/SignInCard'
import BackgroundWrapper from '../components/wrapper/BackgroundWrapper'

const signIn = () => {

    return (
        <BackgroundWrapper>
            <div className='flex items-center justify-center h-screen flex-col gap-10 p-2'>
                <p className='text-white font-primary font-semibold text-5xl leading-14 lg:text-[64px] lg:leading-20'>
                    Sign in
                </p>
                <SignInCard />
            </div>
        </BackgroundWrapper>
    )
}

export default signIn
