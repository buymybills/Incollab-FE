"use client"
import BrandsOtpForm from "@/components/auth/brands/BrandsOtpForm";
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton';
import Link from "next/link";
import { useState } from "react";

interface FormData {
    email: string;
    password: string;
}

const BrandsSignInPage = () => {
  const [showOtpForm, setShowOtpForm] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  })

  const handleContinue = () => {
    setShowOtpForm(true)
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile Layout */}
      <div className="md:hidden max-w-md w-full text-center flex flex-col items-center justify-between px-4 mx-auto">
        <div className='space-y-5 pt-12'>
            <div className="space-y-2">
                <h1 className="text-[32px] font-bold text-black tracking-tight text-start w-64">
                    FIND THE RIGHT CREATORS FOR YOUR BRAND
                </h1>
            </div>
            
            <p className="text-[#999] text-base leading-relaxed text-left">
                Post campaigns, receive influencer applications, track ROI, and build lasting partnerships with creators
            </p>
        </div>
        
        <div className="space-y-6 w-full pb-8">
          
          <div className="space-y-4">
            
            {
                showOtpForm ? (
                    <BrandsOtpForm/>
                ) : (
                    <div>
                        <h2 className="font-bold text-black text-center mb-6">
                            Login as Brand
                        </h2>
                        <div className="flex flex-col gap-2 mb-4">
                            <input 
                                type="email"
                                placeholder="Enter Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    email: e.target.value
                                })}
                                className="flex-1 bg-gray-50 border border-[#E4E4E4] rounded-full px-4 py-5 text-black focus:outline-none focus:border-theme-blue placeholder:text-black"
                            />
                            <input 
                                type="password"
                                placeholder="Enter Password"
                                value={formData.password}
                                onChange={(e) => setFormData({
                                    ...formData,
                                    password: e.target.value
                                })}
                                className="flex-1 bg-gray-50 border border-[#E4E4E4] rounded-full px-4 py-5 text-black focus:outline-none focus:border-theme-blue placeholder:text-black"
                            />
                        </div>
                        <div className="forgot-password mb-6">
                            <Link href={"/"} className="font-semibold text-[#222]">Forgot Password?</Link>
                        </div>
                        <div onClick={handleContinue}>
                            <ArrowFilledButton 
                                className="w-full text-center" 
                                text="Continue" 
                                textCenter={true}
                            />
                        </div>
                    </div>
                )
            }
          </div>
          
          <div>
            <p className="font-light text-black">Do not have an account? <Link href={"/auth/brands/signup"} className="font-bold text-black">Create Account</Link></p>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-5xl mx-auto h-[549px] my-auto">
        {/* Left Side - Hero Section */}
        <div className="bg-[#D9D9D9] flex items-start justify-start">
          <div className="max-w-md p-6">
            <h1 className="text-4xl lg:text-[32px] font-bold text-black tracking-tight leading-tight mb-6 w-64">
              FIND THE RIGHT CREATORS FOR YOUR BRAND
            </h1>
            <p className="text-[#999] text-base leading-relaxed">
              Post campaigns, receive influencer applications, track ROI, and build lasting partnerships with creators
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center px-16">
          <div className="w-full max-w-md">
            {/* Logo */}
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-blue-500 mb-8">Cloutsy</h2>
            </div>

            <div className="space-y-8">
              {showOtpForm ? (
                <BrandsOtpForm/>
              ) : (
                <div>
                  <h3 className="font-bold text-black text-center mb-8 text-lg">
                    Login as Brand
                  </h3>
                  <div className="flex flex-col gap-3 mb-4">
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
                    <input 
                      type="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={(e) => setFormData({
                        ...formData,
                        password: e.target.value
                      })}
                      className="w-full bg-gray-50 border border-[#E4E4E4] rounded-full px-6 py-4 text-black focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                    />
                  </div>
                  <div className="forgot-password mb-8 text-center">
                    <Link href={"/"} className="font-semibold text-[#222]">Forgot Password?</Link>
                  </div>
                  <div onClick={handleContinue}>
                    <ArrowFilledButton 
                      className="w-full text-center py-4" 
                      text="Continue" 
                      textCenter={true}
                    />
                  </div>
                </div>
              )}

              <div className="text-center">
                <p className="font-light text-black">Do not have an account? <Link href={"/auth/brands/signup"} className="font-bold text-black">Create Account</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandsSignInPage