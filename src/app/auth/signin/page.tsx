"use client"
import React, { useState, useEffect } from "react"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import OtpForm from '@/components/auth/OtpForm'
import Image from "next/image"
import { ChevronDown } from "lucide-react"
import useMutationApi from "@/hooks/useMutationApi"

const SignInPage = () => {
  const [mobileNumber, setMobileNumber] = useState("")
  const [showOtpForm, setShowOtpForm] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = [
    "/images/influencer/fashion-signin.svg",
    "/images/influencer/food-signin.svg",
    "/images/influencer/electronic-signin.svg"
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 2000) // Changes every 2 second

    return () => clearInterval(interval)
  }, [images.length])

  const handleContinue = () => {
    setShowOtpForm(true)
  }

  const {mutateAsync: sendOtp, isPending: sendOtpLoading} = useMutationApi({
    endpoint: 'auth/influencer/request-otp',
    method: 'post',
    onSuccess: () => {
      setShowOtpForm(true)
    }
  })

  const handleSendOtp = async () => {
    await sendOtp({
      phone: mobileNumber
    })
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile Layout */}
      <div className="md:hidden w-full text-center h-screen flex flex-col items-center justify-around px-4 mx-auto" style={{backgroundImage: 'url(/images/bg/signin-landing-page-bg.svg)', backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="flex items-center justify-center h-80 w-80 relative mt-36 mobile-image overflow-hidden">
        <Image
          src={images[currentImageIndex]}
          alt="carousel"
          fill
          className="object-cover animate-[slideIn_1s_ease-in-out]"
          key={currentImageIndex}
        />
      </div>
        <div className="space-y-6 w-full mt-auto mb-10">
          <div className="logo relative top-2">
            <h2 className="font-bold text-theme-primary text-2xl">CollabKaroo</h2>
          </div>
          <div className="space-y-4">
            
            {
                showOtpForm ? (
                    <OtpForm phone={mobileNumber}/>
                ) : (
                    <div className="">
                        <h2 className="font-bold text-black text-center mb-6">
                            Login / Signup as Influencer
                        </h2>
                        <div className="flex gap-2 mb-6">
                            <div className="flex items-center px-3 gap-1 bg-gray-50 border border-gray-200 rounded-full py-3">
                                <Image src={"/images/icons/india-flag.svg"} alt="flag" width={20} height={20}/>
                                <span>+91</span>
                                <ChevronDown/>
                            </div>
                            <div className="bg-white border border-[#E4E4E4] rounded-full w-full py-4">
                                <input 
                                    type="tel"
                                    placeholder="Enter Mobile number"
                                    value={mobileNumber}
                                    onChange={(e) => setMobileNumber(e.target.value)}
                                    className="h-full w-full bg-transparent focus:outline-none pl-4"
                                    maxLength={10}
                                />
                            </div>
                        </div>
                        {mobileNumber.length === 10 ? (
                            <div onClick={handleSendOtp}>
                                <ArrowFilledButton 
                                    className="w-full text-center" 
                                    text={sendOtpLoading ? "Sending OTP..." : "Continue"} 
                                    textCenter={true}
                                />
                            </div>
                        ) : (
                            <button 
                                className="w-full bg-[#E4E4E4] text-[#111] py-5 rounded-full font-bold text-base"
                                onClick={handleContinue}
                            >
                                Continue
                            </button>
                        )}
                    </div>
                )
            }
          </div>
          
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            By Login / signup, you agree to our <span className="text-blue-600">Terms of Use</span><br />
            and <span className="text-blue-600">Privacy Policy</span>
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex w-full max-w-5xl mx-auto h-[549px] my-auto">
        {/* Left Side - Hero Section */}
        <div className="bg-[#D9D9D9] flex items-start justify-start">
          <div className="max-w-md p-6">
            <h1 className="text-4xl lg:text-[32px] font-bold text-black tracking-tight leading-tight mb-6 w-64">
              GROW YOUR INFLUENCE. GET DISCOVERED.
            </h1>
            <p className="text-[#999] text-base leading-relaxed">
              Build your professional profile, showcase your content, apply for brand campaigns, and track your earnings — all in one place.
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
                <OtpForm phone={mobileNumber}/>
              ) : (
                <div>
                  <h3 className="font-bold text-black text-center mb-8 text-lg">
                    Login / Signup as Influencer
                  </h3>
                  <div className="flex gap-3 md:gap-2 mb-8">
                    <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-4 py-4">
                      <span className="text-lg">🇮🇳</span>
                      <span className="font-medium">+91</span>
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <input 
                      type="tel"
                      placeholder="Enter Mobile number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-1 bg-gray-50 border border-[#E4E4E4] rounded-full px-6 py-4 text-black focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                      maxLength={10}
                    />
                  </div>
                  {mobileNumber.length === 10 ? (
                    <div onClick={handleContinue}>
                      <ArrowFilledButton 
                        className="w-full text-center py-4" 
                        text="Continue" 
                        textCenter={true}
                      />
                    </div>
                  ) : (
                    <button 
                      className="w-full bg-[#E4E4E4]/30 text-[#111] py-4 rounded-full font-bold text-base"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}

              <p className="text-sm text-gray-500 text-center leading-relaxed">
                By Login / signup, you agree to our <span className="text-blue-600">Terms of Use</span><br />
                and <span className="text-blue-600">Privacy Policy</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignInPage