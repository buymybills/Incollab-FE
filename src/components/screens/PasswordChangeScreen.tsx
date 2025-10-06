import Image from 'next/image'
import React from 'react'

const PasswordChangeScreen = () => {
  return (
    <div className='flex items-center flex-col justify-center h-screen gap-y-8'>
        <div className="image">
            <Image src="/images/icons/password-lock.svg" alt="brand-logo" width={300} height={300}/>
        </div>
        <div className="w-[308px] mx-auto space-y-2.5">
            <p className='font-bold text-[26px] text-center'>Password Recovery Successful</p>
            <p className='text-center'>Return to the login screen to enter the application</p>
        </div>
    </div>
  )
}

export default PasswordChangeScreen