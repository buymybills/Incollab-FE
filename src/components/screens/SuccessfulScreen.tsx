import React from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const SuccessfulScreen = ({onBack}: {onBack: () => void}) => {
  return (
    <div className='flex items-center flex-col justify-center'>
        <button className='absolute top-5 left-5' onClick={onBack}>
          <X size={20} className="text-black" />
        </button>
        <div className='relative h-36 w-36 mt-9'>
            <Image src="/images/icons/green-tick-badge.svg" alt="Successful" fill className='object-cover'/>
        </div>
        <div className='text-center space-y-4 mt-7'>
            <p className='text-black font-bold text-2xl px-10'>Your Campaign is successfully posted</p>
            <p className='text-[#555] font-medium text-sm'>Check the application status in &apos;Campaign Management&apos; tab in Profile & Setting</p>
        </div>
    </div>
  )
}

export default SuccessfulScreen