"use client"
import BrandsOtpForm from "@/components/auth/brands/BrandsOtpForm";
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton';
import AccountNotFoundModal from '@/components/modals/AccountNotFoundModal';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import useMutationApi, { DynamicMutationPayload } from "@/hooks/useMutationApi";

interface FormData {
    email: string;
    password: string;
}

const BrandsSignInPage = () => {
  const router = useRouter();
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [showAccountNotFoundModal, setShowAccountNotFoundModal] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const {mutateAsync: signInMutation, isPending: signinMutationLoading} = useMutationApi({
    endpoint: 'auth/brand/login',
    method: 'POST',
    onError(){
      setShowAccountNotFoundModal(true);
    },
    onSuccess(){
      setShowOtpForm(true);
    }
  });

  const handleContinue = async () => {
    if (formData.email && formData.password) {
      try {
        await signInMutation(formData as unknown as DynamicMutationPayload);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleCreateAccount = () => {
    setShowAccountNotFoundModal(false);
    router.push('/auth/brands/signup');
  };

  const handleTryAgain = () => {
    setShowAccountNotFoundModal(false);
    // Reset form or just close modal to let user try again
  };

  const handleCloseModal = () => {
    setShowAccountNotFoundModal(false);
  }

  return (
    <div className="min-h-screen md:flex">
      {/* Mobile Layout */}
      <div className="md:hidden max-w-md w-full h-dvh text-center flex flex-col items-center mx-auto" style={{backgroundImage: 'url(/images/bg/brands-signin-bg.svg)', backgroundSize: 'cover'}}>
        <div className="mt-40 w-full relative">
          <div className="logo relative">
            <h2 className="text-theme-primary text-2xl">CollabKaroo</h2>
          </div>
          <div className="cartoon-images mt-12">
            <div className="absolute left-0 right-0 animate-wave" style={{animationDelay: '0s'}}>
              <Image src="/images/cartoons/cartoon-1.svg" alt="Cartoon" width={49} height={49}/>
            </div>
            <div className="absolute left-20 top-16 right-0 animate-wave" style={{animationDelay: '0.2s'}}>
              <Image src="/images/cartoons/cartoon-2.svg" alt="Cartoon" width={43} height={43}/>
            </div>
            <div className="absolute left-24 top-32 right-0 animate-wave" style={{animationDelay: '0.4s'}}>
              <Image src="/images/cartoons/cartoon-3.svg" alt="Cartoon" width={48} height={48}/>
            </div>
            <div className="absolute left-1/2 -translate-x-10 top-16 right-0 animate-wave" style={{animationDelay: '0.6s'}}>
              <Image src="/images/cartoons/cartoon-4.svg" alt="Cartoon" width={85} height={85}/>
            </div>
            <div className="absolute right-20 top-16 animate-wave" style={{animationDelay: '0.8s'}}>
              <Image src="/images/cartoons/cartoon-5.svg" alt="Cartoon" width={47} height={47}/>
            </div>
            <div className="absolute right-24 top-32 animate-wave" style={{animationDelay: '1s'}}>
              <Image src="/images/cartoons/cartoon-6.svg" alt="Cartoon" width={43} height={43}/>
            </div>
            <div className="absolute right-0 animate-wave" style={{animationDelay: '1.2s'}}>
              <Image src="/images/cartoons/cartoon-7.svg" alt="Cartoon" width={44} height={44}/>
            </div>
          </div>
        </div>
        <div className="w-full pb-2 mt-auto">
          <div className="space-y-4">
            
            {
                showOtpForm ? (
                  <div className="px-4">
                    <BrandsOtpForm email={formData.email}/>
                  </div>
                ) : (
                    <div>
                        <h2 className="font-bold text-black text-center px-10 pb-24">
                          FIND THE RIGHT CREATORS FOR YOUR BRAND
                        </h2>
                        <div className="flex flex-col gap-y-4 pb-4">
                        <div className="flex font-semibold items-center justify-center gap-x-4">
                          <button className="border-b border-theme-primary text-theme-primary">Login as Brand</button>
                          <span>/</span>
                          <button onClick={() => router.push('/auth/signin')}>Login as Influencer</button>
                        </div>
                          <div className="flex flex-col gap-4 px-4">
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
                          <div className="forgot-password mt-2">
                              <Link href={"/auth/brands/forgot-password"} className="font-semibold text-[#222]">Forgot Password?</Link>
                          </div>
                        </div>
                        <div onClick={handleContinue} className="px-4 pb-4">
                            <ArrowFilledButton 
                                className="w-full text-center mt-2" 
                                text={signinMutationLoading ? "Logging In..." : "Continue"} 
                                textCenter={true}
                                disabled={signinMutationLoading}
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
                <BrandsOtpForm email={formData.email}/>
              ) : (
                <div>
                  <div className="flex gap-2 font-semibold items-center justify-center gap-x-4 mb-4">
                    <button className="border-b border-theme-primary text-theme-primary">Login as Brand</button>
                    <span>/</span>
                    <button onClick={() => router.push('/auth/influencer/signin')}>Login as Influencer</button>
                  </div>
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
                    <Link href={"/auth/brands/forgot-password"} className="font-semibold text-[#222]">Forgot Password?</Link>
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

      {/* Account Not Found Modal */}
      <AccountNotFoundModal
        isOpen={showAccountNotFoundModal}
        onClose={handleCloseModal}
        onCreateAccount={handleCreateAccount}
        onTryAgain={handleTryAgain}
        email={formData.email}
      />
    </div>
  )
}

export default BrandsSignInPage