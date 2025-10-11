"use client"
import React, { useState } from 'react'
import { ArrowLeft, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import useMutationApi from '@/hooks/useMutationApi'
import DeleteUserOtpForm from '@/components/auth/DeleteUserOtpForm'

type UserType = 'influencer' | 'brand' | ''

const DeleteUserPage = () => {
  const router = useRouter()
  const [userType, setUserType] = useState<UserType>('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showOtpForm, setShowOtpForm] = useState(false)

  const isFormValid = () => {
    if (!userType) return false
    if (userType === 'influencer' && mobileNumber.length === 10) return true
    if (userType === 'brand' && email.includes('@')) return true
    return false
  }

  // Build endpoint with query parameters for delete
  const buildDeleteEndpoint = () => {
    const params = new URLSearchParams({
      userType: userType as string
    })

    if (userType === 'influencer') {
      params.append('phone', mobileNumber)
    } else if (userType === 'brand') {
      params.append('email', email)
    }

    return `auth/delete-account-by-identifier?${params.toString()}`
  }

  const {mutateAsync: deleteAccount, isPending: deleteAccountLoading} = useMutationApi({
    endpoint: buildDeleteEndpoint(),
    method: 'DELETE',
    onSuccess: () => {
      setShowOtpForm(true)
    }
  })

  const handleDeleteAccount = async () => {
    await deleteAccount({})
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 px-5">
        {/* Header */}
        <div className="flex items-center gap-2 pt-6 pb-4 text-[#000]">
          <button onClick={() => showOtpForm ? setShowOtpForm(false) : router.back()}>
            <ArrowLeft />
          </button>
          <span className="font-bold">Delete Account</span>
        </div>

        {showOtpForm ? (
          /* OTP Form */
          <div className="mt-4">
            <DeleteUserOtpForm
              phone={userType === 'influencer' ? mobileNumber : undefined}
              email={userType === 'brand' ? email : undefined}
              userType={userType === '' ? undefined : userType}
            />
          </div>
        ) : (
          <>
            {/* Description */}
            <div className="pb-6 text-sm text-[#555] font-normal">
              Please select your account type and provide your credentials to proceed with account deletion.
            </div>

            {/* Form */}
            <div className="flex flex-col gap-4">
              {/* Select User Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-[#555] mb-2">
                  Select Account Type
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full bg-gray-50 border border-[#E4E4E4] rounded-full px-4 py-5 text-left flex items-center justify-between focus:outline-none focus:border-theme-primary"
                >
                  <span className={userType ? 'text-black' : 'text-[#999]'}>
                    {userType === 'influencer' ? 'Influencer' : userType === 'brand' ? 'Brand' : 'Select Account Type'}
                  </span>
                  <ChevronDown className={`transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-2 bg-white border border-[#E4E4E4] rounded-2xl shadow-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('influencer')
                        setIsDropdownOpen(false)
                        setEmail('')
                      }}
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 text-black transition-colors"
                    >
                      Influencer
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setUserType('brand')
                        setIsDropdownOpen(false)
                        setMobileNumber('')
                      }}
                      className="w-full px-4 py-4 text-left hover:bg-gray-50 text-black border-t border-[#E4E4E4] transition-colors"
                    >
                      Brand
                    </button>
                  </div>
                )}
              </div>

              {/* Conditional Input Fields */}
              {userType === 'influencer' && (
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    Mobile Number
                  </label>
                  <div className="bg-gray-50 border border-[#E4E4E4] rounded-full py-5 px-4">
                    <input
                      type="tel"
                      placeholder="Enter Mobile Number"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="h-full w-full bg-transparent focus:outline-none text-black placeholder:text-[#999]"
                      maxLength={10}
                    />
                  </div>
                </div>
              )}

              {userType === 'brand' && (
                <div>
                  <label className="block text-sm font-medium text-[#555] mb-2">
                    Email Address
                  </label>
                  <div className="bg-gray-50 border border-[#E4E4E4] rounded-full py-5 px-4">
                    <input
                      type="email"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-full w-full bg-transparent focus:outline-none text-black placeholder:text-[#999]"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Warning Message */}
            {userType && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-sm text-red-600">
                    Warning: You can restore your account anytime within 30 days of requesting deletion. After that period, it will be permanently removed.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Fixed Bottom Button */}
      {!showOtpForm && (
        <div className="p-4 bg-white">
          <button
            onClick={handleDeleteAccount}
            disabled={!isFormValid() || deleteAccountLoading}
            className={`w-full py-4 rounded-full font-medium text-base transition-colors ${
              isFormValid() || deleteAccountLoading
                ? 'bg-[#FF3B30] text-white'
                : 'bg-[#E4E4E4] text-[#999] cursor-not-allowed'
            }`}
          >
            {deleteAccountLoading ? "Sending otp..." : "Continue"}
          </button>
        </div>
      )}
    </div>
  )
}

export default DeleteUserPage
