"use client"
import { ChevronLeft, Edit2, ImageIcon, X, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'

const VerifyInfluencerPage = () => {
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileHeadline, setProfileHeadline] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [bio, setBio] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [whatsappNumber, setWhatsappNumber] = useState<string>('')
  const [countryCode, setCountryCode] = useState<string>('+91')
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendTimer, setResendTimer] = useState(20)
  const [canResend, setCanResend] = useState(false)
  const [collaborationCosts, setCollaborationCosts] = useState({
    instagram: {
      reel: '',
      story: '',
      post: ''
    },
    facebook: {
      post: '',
      story: ''
    },
    youtube: {
      video: '',
      shorts: ''
    },
    linkedin: {
      post: '',
      article: ''
    },
    twitter: {
      post: '',
      thread: ''
    }
  })
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram'])
  const inputsRef = useRef<HTMLInputElement[]>([])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleResend = () => {
    setResendTimer(20);
    setCanResend(false);
    console.log("Resending OTP...");
  };

  const handleOtpChange = (value: string, index: number) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace") {
      const updatedOtp = [...otp];
      if (!otp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
      updatedOtp[index] = "";
      setOtp(updatedOtp);
    }

    if (event.key === "ArrowLeft" && index > 0) {
      inputsRef.current[index - 1].focus();
    }

    if (event.key === "ArrowRight" && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpPaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData("text").slice(0, 6).split("");
    const updatedOtp = [...otp];
    pasteData.forEach((char, idx) => {
      if (idx < updatedOtp.length) {
        updatedOtp[idx] = char;
      }
    });
    setOtp(updatedOtp);
    const filledIndex = pasteData.length - 1;
    if (inputsRef.current[filledIndex]) {
      inputsRef.current[filledIndex].focus();
    }
  };

  const handleBannerUpload = () => {
    bannerInputRef.current?.click()
  }

  const handleProfileUpload = () => {
    profileInputRef.current?.click()
  }

  const handleBannerFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBannerImage(imageUrl)
      console.log('Banner file selected:', file.name)
    }
  }

  const handleRemoveBanner = () => {
    setBannerImage(null)
    if (bannerInputRef.current) {
      bannerInputRef.current.value = ''
    }
  }

  const handleProfileFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileImage(imageUrl)
      console.log('Profile file selected:', file.name)
    }
  }

  const handleRemoveProfile = () => {
    setProfileImage(null)
    if (profileInputRef.current) {
      profileInputRef.current.value = ''
    }
  }

  const handleContinueToStep2 = () => {
    setCurrentStep(2)
  }

  const handleBackToStep1 = () => {
    setCurrentStep(1)
  }

  const handleContinueToStep3 = () => {
    setCurrentStep(3)
  }

  const handleBackToStep2 = () => {
    setCurrentStep(2)
  }

  const handleContinueToStep4 = () => {
    setCurrentStep(4)
  }

  const handleBackToStep3 = () => {
    setCurrentStep(3)
  }

  const handlePlatformToggle = (platform: string) => {
    if (platform === 'instagram') return // Instagram is always included

    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const handleCollaborationCostChange = (platform: string, type: string, value: string) => {
    setCollaborationCosts(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        [type]: value
      }
    }))
  }
  const renderStep1 = () => (
    <>
        <div className="flex flex-col items-center py-16 px-4 pb-32 space-y-12">
            <div className="text-center">
                <div className="relative mb-4 flex items-center justify-center">
                    <div className='rounded-full w-32 h-32 relative overflow-hidden'>
                        <Image src="/images/user/influencer.svg" alt="Influencer" fill className='object-cover' />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white absolute bottom-1 right-10">
                        <Image src="/images/common/verification-badge.svg" alt="verification-badge" height={20} width={18}/>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-black">Add verification Badge</h2>
            </div>

            <div className="w-full max-w-sm space-y-8">
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile Banner*</h3>
                    {bannerImage ? (
                        <div className="relative rounded-lg overflow-hidden min-h-[120px]">
                            <Image
                                src={bannerImage}
                                alt="Banner preview"
                                fill
                                className="object-cover"
                            />

                            {/* Remove Button */}
                            <button
                                onClick={handleRemoveBanner}
                                className="absolute top-2 right-2 flex items-center bg-theme-blue hover:bg-black/70 text-white rounded-full p-1.5 transition-colors duration-200 z-10"
                                title="Remove banner image"
                            >
                                <X size={16} />
                            </button>

                            {/* Upload Overlay on Hover */}
                            <div
                                onClick={handleBannerUpload}
                                className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all duration-200 cursor-pointer group"
                            >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center text-white">
                                    <Upload size={20} className="mb-1" />
                                    <span className="text-xs font-medium">Change Banner</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={handleBannerUpload}
                            className="border-2 border-dashed border-theme-primary rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 min-h-[120px] cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">Tap to add Image</p>
                            <p className="text-xs text-gray-500 mt-1">JPG / PNG Max Size 50kb</p>
                        </div>
                    )}
                    <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleBannerFileChange}
                        className="hidden"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile Image*</h3>
                    <div className="flex justify-center">
                        <div className="relative">
                            {profileImage ? (
                                <>
                                    <div className="w-24 h-24 rounded-full overflow-hidden relative">
                                        <Image
                                            src={profileImage}
                                            alt="Profile preview"
                                            fill
                                            className="object-cover"
                                        />

                                        {/* Upload Overlay on Hover */}
                                        <div
                                            onClick={handleProfileUpload}
                                            className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer group rounded-full"
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center text-white">
                                                <Upload size={16} className="mb-1" />
                                                <span className="text-xs font-medium">Change</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={handleRemoveProfile}
                                        className="absolute top-1 -right-1 w-6 h-6 bg-theme-blue text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10"
                                        title="Remove profile image"
                                    >
                                        <X size={12} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div
                                        onClick={handleProfileUpload}
                                        className="w-24 h-24 rounded-full flex items-center border border-dashed border-gray-200 relative justify-center overflow-hidden cursor-pointer"
                                    >
                                        <Image src="/images/user/influencer.svg" alt="Profile" fill className="object-contain" />
                                    </div>
                                    <button
                                        onClick={handleProfileUpload}
                                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleProfileFileChange}
                        className="hidden"
                    />
                </div>

                {/* Profile Headline Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile headline</h3>
                    <div className="relative">
                        <textarea
                            value={profileHeadline}
                            onChange={(e) => setProfileHeadline(e.target.value)}
                            placeholder="Add Profile Headline"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                            maxLength={500}
                        />
                        <span className="absolute -bottom-3 right-0 text-xs text-gray-500">
                            {profileHeadline.length}/500
                        </span>
                    </div>
                </div>

                {/* Location Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Location</h3>
                    <div className="space-y-3">
                        <div className="relative">
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">Country</option>
                                <option value="india">India</option>
                                <option value="usa">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                            >
                                <option value="">City</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="delhi">Delhi</option>
                                <option value="bangalore">Bangalore</option>
                                <option value="pune">Pune</option>
                                <option value="hyderabad">Hyderabad</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bio Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Tell Other About Your Self</h3>
                    <div className="relative">
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Add Bio"
                            className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32"
                            maxLength={1000}
                        />
                        <span className="absolute -bottom-3 right-0 text-xs text-gray-500">
                            {bio.length}/1000
                        </span>
                    </div>
                </div>

                {/* social link inputs */}
                <div>
                    
                </div>

                {/* Social Links Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Add Social Link</h3>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => {/* Handle Facebook link */}}
                            className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center"
                        >
                            <Image src="/images/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => {/* Handle Facebook link */}}
                            className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center"
                        >
                            <Image src="/images/icons/instagram.svg" alt="Facebook" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => {/* Handle Facebook link */}}
                            className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center"
                        >
                            <Image src="/images/icons/youtube.svg" alt="Facebook" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => {/* Handle Facebook link */}}
                            className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center"
                        >
                            <Image src="/images/icons/linkedin.svg" alt="Facebook" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => {/* Handle Facebook link */}}
                            className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center"
                        >
                            <Image src="/images/icons/x-social.svg" alt="Facebook" width={32} height={32} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep2}/>
        </div>
    </>
  )

  const renderStep2 = () => (
    <>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-6">
            <div className="text-left">
                <h2 className="text-xl font-bold text-black">Add Collaboration Cost</h2>
            </div>

            <div className="w-full max-w-sm space-y-6">
                {/* Instagram Section - Always shown */}
                <div>
                    <h3 className="text-base font-bold text-black mb-2">Instagram</h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Image src="/images/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                                <span className="font-medium text-black">Reel</span>
                            </div>
                            <hr className='w-[0.9px] h-5 bg-black'/>
                            <input
                                type="text"
                                placeholder="Add Amount"
                                value={collaborationCosts.instagram.reel}
                                onChange={(e) => handleCollaborationCostChange('instagram', 'reel', e.target.value)}
                                className="text-[#999] bg-transparent outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Image src="/images/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                                <span className="font-medium text-black">Story</span>
                            </div>
                            <hr className='w-[0.9px] h-5 bg-black'/>
                            <input
                                type="text"
                                placeholder="Add Amount"
                                value={collaborationCosts.instagram.story}
                                onChange={(e) => handleCollaborationCostChange('instagram', 'story', e.target.value)}
                                className="text-[#999] bg-transparent outline-none"
                            />
                        </div>

                        <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                            <div className="flex items-center gap-3">
                                <Image src="/images/icons/instagram.svg" alt="Instagram" width={24} height={24} />
                                <span className="font-medium text-black">Post</span>
                            </div>
                            <hr className='w-[0.9px] h-5 bg-black'/>
                            <input
                                type="text"
                                placeholder="Add Amount"
                                value={collaborationCosts.instagram.post}
                                onChange={(e) => handleCollaborationCostChange('instagram', 'post', e.target.value)}
                                className="text-[#999] bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Platforms */}
                {selectedPlatforms.includes('facebook') && (
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">Facebook</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                                    <span className="font-medium text-black">Post</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.facebook.post}
                                    onChange={(e) => handleCollaborationCostChange('facebook', 'post', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/facebook.svg" alt="Facebook" width={24} height={24} />
                                    <span className="font-medium text-black">Story</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.facebook.story}
                                    onChange={(e) => handleCollaborationCostChange('facebook', 'story', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedPlatforms.includes('youtube') && (
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">YouTube</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/youtube.svg" alt="YouTube" width={24} height={24} />
                                    <span className="font-medium text-black">Video</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.youtube.video}
                                    onChange={(e) => handleCollaborationCostChange('youtube', 'video', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/youtube.svg" alt="YouTube" width={24} height={24} />
                                    <span className="font-medium text-black">Shorts</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.youtube.shorts}
                                    onChange={(e) => handleCollaborationCostChange('youtube', 'shorts', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedPlatforms.includes('linkedin') && (
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">LinkedIn</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                                    <span className="font-medium text-black">Post</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.linkedin.post}
                                    onChange={(e) => handleCollaborationCostChange('linkedin', 'post', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
                                    <span className="font-medium text-black">Article</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.linkedin.article}
                                    onChange={(e) => handleCollaborationCostChange('linkedin', 'article', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {selectedPlatforms.includes('twitter') && (
                    <div>
                        <h3 className="text-lg font-semibold text-black mb-2">X (Twitter)</h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/x-social.svg" alt="X" width={24} height={24} />
                                    <span className="font-medium text-black">Post</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.twitter.post}
                                    onChange={(e) => handleCollaborationCostChange('twitter', 'post', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                            <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Image src="/images/icons/x-social.svg" alt="X" width={24} height={24} />
                                    <span className="font-medium text-black">Thread</span>
                                </div>
                                <hr className='w-[0.9px] h-5 bg-black'/>
                                <input
                                    type="text"
                                    placeholder="Add Amount"
                                    value={collaborationCosts.twitter.thread}
                                    onChange={(e) => handleCollaborationCostChange('twitter', 'thread', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Add More Platform Section */}
                <div>
                    <div className="text-center mb-4">
                        <span className="text-sm font-medium text-gray-500 tracking-wider">ADD FOR MORE PLATFORM</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={() => handlePlatformToggle('facebook')}
                            className={`h-14 w-14 rounded-xl border ${
                                selectedPlatforms.includes('facebook')
                                    ? 'border-theme-primary bg-blue-50'
                                    : 'border-[#E4E4E4]'
                            } flex items-center justify-center transition-colors`}
                        >
                            <Image src="/images/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => handlePlatformToggle('youtube')}
                            className={`h-14 w-14 rounded-xl border ${
                                selectedPlatforms.includes('youtube')
                                    ? 'border-theme-primary bg-blue-50'
                                    : 'border-[#E4E4E4]'
                            } flex items-center justify-center transition-colors`}
                        >
                            <Image src="/images/icons/youtube.svg" alt="YouTube" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => handlePlatformToggle('linkedin')}
                            className={`h-14 w-14 rounded-xl border ${
                                selectedPlatforms.includes('linkedin')
                                    ? 'border-theme-primary bg-blue-50'
                                    : 'border-[#E4E4E4]'
                            } flex items-center justify-center transition-colors`}
                        >
                            <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={32} height={32} />
                        </button>
                        <button
                            onClick={() => handlePlatformToggle('twitter')}
                            className={`h-14 w-14 rounded-xl border ${
                                selectedPlatforms.includes('twitter')
                                    ? 'border-theme-primary bg-blue-50'
                                    : 'border-[#E4E4E4]'
                            } flex items-center justify-center transition-colors`}
                        >
                            <Image src="/images/icons/x-social.svg" alt="X" width={32} height={32} />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep3}/>
        </div>
    </>
  )

  const renderStep3 = () => (
    <>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-6">
            <div className="text-left">
                <h2 className="text-xl font-bold text-black">Verify Contact for Campaign Notification</h2>
            </div>

            <div className="w-full max-w-sm space-y-4">
                <div>
                    <label className="text-sm font-medium text-black mb-2 block">
                        WhatsApp Number<span className="text-red-500">*</span>
                    </label>
                    <div className='flex items-center gap-x-2 w-full'>
                        <div className="border border-[#E4E4E4] px-3 py-4 rounded-full flex items-center gap-2">
                            <Image src="/images/icons/india-flag.svg" alt="India" width={20} height={15} />
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className='bg-transparent outline-none text-sm font-medium'
                            >
                                <option value="+91">+91</option>
                                <option value="+1">+1</option>
                                <option value="+44">+44</option>
                            </select>
                        </div>
                        <div className="border border-[#E4E4E4] px-4 py-3 rounded-full flex-1">
                            <input
                                type="tel"
                                placeholder="Enter WhatsApp number"
                                value={whatsappNumber}
                                onChange={(e) => setWhatsappNumber(e.target.value)}
                                className="w-full text-black placeholder-gray-400 bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep4}/>
        </div>
    </>
  )

  const renderStep4 = () => (
    <>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-6">
            <div className="text-left">
                <h2 className="text-xl font-bold text-black">OTP Verification</h2>
                <p className="text-sm text-gray-600 mt-2">
                    You have received an OTP at {countryCode}{whatsappNumber}
                </p>
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div>
                    <div className="flex gap-2 justify-center" id="otp-container">
                        {otp.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={otp[index]}
                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                onPaste={(e) => handleOtpPaste(e)}
                                ref={(el) => {
                                    if (el) {
                                        inputsRef.current[index] = el;
                                    }
                                }}
                                className="border-2 border-black rounded-full w-13 h-16 flex items-center justify-center text-center font-medium focus:outline-none focus:border-theme-primary"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm font-normal text-gray-700">
                        {"Didn't Get OTP"}
                    </p>
                    <div>
                        {canResend ? (
                            <button
                                onClick={handleResend}
                                className="text-blue-600 hover:text-blue-700 underline text-sm"
                            >
                                Resend
                            </button>
                        ) : (
                            <span className="text-gray-400 text-sm">
                                (Resend in 00: {resendTimer.toString().padStart(2, '0')})
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true}/>
        </div>
    </>
  )

  return (
    <div className='min-h-screen flex flex-col'>
        <div className='border-b border-[#E4E4E4]'>
            <div className="back flex items-center gap-x-3 px-4 py-3">
                <button onClick={
                    currentStep === 2 ? handleBackToStep1 :
                    currentStep === 3 ? handleBackToStep2 :
                    currentStep === 4 ? handleBackToStep3 :
                    undefined
                }>
                    <ChevronLeft size={20}/>
                </button>
                <span className='font-bold text-black'>
                    Profile Verification
                </span>
            </div>
        </div>
        {currentStep === 1 ? renderStep1() : currentStep === 2 ? renderStep2() : currentStep === 3 ? renderStep3() : renderStep4()}
    </div>
  )
}

export default VerifyInfluencerPage