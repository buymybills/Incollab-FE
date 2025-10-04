"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface SendForVerificationScreenProps {
    onClose: () => void
}

const SendForVerificationScreen = ({onClose}: SendForVerificationScreenProps) => {
    return (
        <div className='relative'>
            <button className='absolute left-5 top-10'>
                <X size={20} className='text-black' onClick={onClose}/>
            </button>
            <div className='flex flex-col items-center justify-center h-dvh gap-y-2'>
                <Image src={"/images/icons/verification_timer.svg"} alt="verification_timer" height={202} width={202}/>
                <h2 className='font-bold text-2xl'>Profile Sent for Verification</h2>
                <p className='font-medium text-[#555] text-sm'>It will takes 24hr to 48hr for verification</p>
            </div>
        </div>
    )
}

export default SendForVerificationScreen