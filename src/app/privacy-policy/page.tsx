"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const PrivacyPolicyPage = () => {
    const router = useRouter()
    return (
        <div className='mt-4 px-4 bg-[#F1F1F1] h-screen'>
            <div className="header flex items-center gap-x-2">
                <button onClick={() => router.back()}>
                    <ChevronLeft/>
                </button>
                <span className='font-bold'>Privacy Policy</span>
            </div>
            <div className='mt-3 bg-white py-10 px-8 rounded-2xl'>
                <div className="px-4">
                    <h2 className='font-bold text-xl'>1. Introduction:</h2>
                    <p className='mt-4'>{`BuyMyBills, operated by DEPSHANTA MARKETING SOLUTIONS PRIVATE LIMITED (“we,” “us,” or “our”), is committed to safeguarding the privacy of users on our website and mobile application (collectively, the “Platform” or “Site”). This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our Services. By accessing or using BuyMyBills, you agree to this Privacy Policy and the Terms of Service.`}</p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage