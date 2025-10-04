"use client"
import { ChevronLeft } from 'lucide-react'
import React from 'react'
import { useRouter } from 'next/navigation'

const TermsPage = () => {
    const router = useRouter()
    return (
        <div className='mt-4 px-4 bg-[#F1F1F1] h-screen'>
            <div className="header flex items-center gap-x-2">
                <button onClick={() => router.back()}>
                    <ChevronLeft/>
                </button>
                <span className='font-bold'>Terms and Condition</span>
            </div>
            <div className='mt-3 bg-white py-10 px-8 rounded-2xl'>
                <div className="px-4">
                    <h2 className='font-bold text-xl'>1. Introduction:</h2>
                    <p className='mt-4'>{`Welcome to BuyMyBills (the "Site") please carefully review these Terms of Service (“Terms,” “Terms of Service,” or “Agreement”) prior to utilizing our platform or any of its services (collectively referred to as “Services”). These Terms constitute a legally binding agreement that governs your use of our website (https://gobuymybills.com) and mobile application (collectively referred to as the “Platform”/”Site”), which is created by BuyMyBills and operated by DEPSHANTA MARKETING SOLUTIONS PRIVATE LIMITED, a company incorporated under the Companies Act, 2013, having its registered office located at Plot A-18, Manjeet Farm, Near Metro Station, Uttam Nagar, New Delhi, West Delhi-110059, Delhi (“BuyMyBills”).`}</p>
                </div>
            </div>
        </div>
    )
}

export default TermsPage