"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton';
import React, { useState } from 'react'
import useMutationApi from '@/hooks/useMutationApi';

const ForgotPasswordPage = () => {
    const [formData, setFormData] = useState({
        email: ''
      });
    const {mutateAsync: forgotPasswordMutation, isPending: forgotPasswordMutationLoading} = useMutationApi({
        endpoint: "auth/brand/forgot-password",
        method: "POST"
    })

    const handleForgotPassword = () => {
        forgotPasswordMutation(formData)
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen w-full gap-y-6'
    style={{
        backgroundImage: "url('/images/bg/forgot-password-bg-image.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
    >
        <h3 className='font-bold'>Forgot Password</h3>
        <div className='w-full px-4'>
            <input 
                type="email"
                placeholder="Enter Email Address"
                value={formData.email}
                onChange={(e) => setFormData({
                    ...formData,
                    email: e.target.value
                })}
                className="w-full bg-gray-50 border border-[#E4E4E4] rounded-full px-6 py-4 text-black focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
            />
        </div>
        <div className='w-full px-4 fixed bottom-4'>
            <ArrowFilledButton
                text={forgotPasswordMutationLoading ? "Sending..." : "Continue"}
                textCenter={true}
                onClick={handleForgotPassword}
                disabled={forgotPasswordMutationLoading}
            />
        </div>
    </div>
  )
}

export default ForgotPasswordPage