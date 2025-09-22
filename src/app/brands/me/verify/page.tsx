"use client"
import { ChevronLeft, Edit2, ImageIcon, X, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'

const VerifyBrandPage = () => {
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const [bannerImage, setBannerImage] = useState<string | null>(null)
  const [profileImage, setProfileImage] = useState<string | null>(null)
  const [profileHeadline, setProfileHeadline] = useState<string>('')
  const [country, setCountry] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [bio, setBio] = useState<string>('')
    const [brandHeadquarterCountry, setBrandHeadquarterCountry] = useState<string>('')
    const [brandHeadquarterCity, setBrandHeadquarterCity] = useState<string>('')
    const [foundedYear, setFoundedYear] = useState<string>('')
    const [brandWebsite, setBrandWebsite] = useState<string>('')
    const [activeRegions, setActiveRegions] = useState<string>('')
      const [incorporationDocument, setIncorporationDocument] = useState<File | null>(null)
      const [gstDocument, setGstDocument] = useState<File | null>(null)
      const [panDocument, setPanDocument] = useState<File | null>(null)
      const [incorporationPreview, setIncorporationPreview] = useState<string | null>(null)
      const [gstPreview, setGstPreview] = useState<string | null>(null)
      const [panPreview, setPanPreview] = useState<string | null>(null)
      const incorporationInputRef = useRef<HTMLInputElement>(null)
      const gstInputRef = useRef<HTMLInputElement>(null)
      const panInputRef = useRef<HTMLInputElement>(null)
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1)
//   const [whatsappNumber, setWhatsappNumber] = useState<string>('')
  const countryCode:string = '+91'
  const whatsappNumber:string = ''
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [socialLinks, setSocialLinks] = useState<{[key: string]: string}>({})
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [resendTimer, setResendTimer] = useState(20)
  const [canResend, setCanResend] = useState(false)
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

  useEffect(() => {
    return () => {
      if (incorporationPreview) {
        URL.revokeObjectURL(incorporationPreview)
      }
      if (gstPreview) {
        URL.revokeObjectURL(gstPreview)
      }
      if (panPreview) {
        URL.revokeObjectURL(panPreview)
      }
    }
  }, [incorporationPreview, gstPreview, panPreview]);

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

  const handleContinueToStep5 = () => {
    setCurrentStep(5)
  }

  const handleBackToStep4 = () => {
    setCurrentStep(4)
  }

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        // Remove platform and its social link
        const newPlatforms = prev.filter(p => p !== platform)
        setSocialLinks(prevLinks => {
          const newLinks = { ...prevLinks }
          delete newLinks[platform]
          return newLinks
        })
        return newPlatforms
      } else {
        // Add platform and initialize empty social link
        setSocialLinks(prevLinks => ({
          ...prevLinks,
          [platform]: ''
        }))
        return [...prev, platform]
      }
    })
  }

  const handleSocialLinkChange = (platform: string, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [platform]: value
    }))
  }

  const handleRemovePlatform = (platform: string) => {
    setSelectedPlatforms(prev => prev.filter(p => p !== platform))
    setSocialLinks(prev => {
      const newLinks = { ...prev }
      delete newLinks[platform]
      return newLinks
    })
  }

  const renderStep1 = () => (
    <>
        <div className="text-center">
                    <div className="relative mb-4 flex items-center justify-center mt-10">
                        <div className='rounded-full w-32 h-32 relative overflow-hidden'>
                            <Image src="/images/user/influencer.svg" alt="Influencer" fill className='object-cover' />
                        </div>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white absolute bottom-1 right-32">
                            <Image src="/images/common/verification-badge.svg" alt="verification-badge" height={20} width={18}/>
                        </div>
                    </div>
                    <h2 className="text-xl font-bold text-black">Add verification Badge</h2>
                </div>  
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep2}/>
        </div>
    </>
  )

  const renderStep2 = () => (
    <>
        <div className="flex flex-col items-center py-16 px-4 pb-32 space-y-12">
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
                                className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
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
                    <h3 className="text-lg font-semibold text-black mb-4 mt-6">Add Social Link</h3>

                    {/* Selected Platform Links */}
                    {selectedPlatforms.length > 0 && (
                        <div className="space-y-3 mb-6">
                            {selectedPlatforms.map((platform) => (
                                <div className="flex items-center gap-x-2.5 p-4 border border-gray-200 rounded-lg relative" key={platform}>
                                    <div className="flex items-center gap-3">
                                        <Image src={`/images/icons/${platform}.svg`} alt={platform} width={24} height={24} />
                                        <span className="font-medium text-black capitalize">{platform}</span>
                                    </div>
                                    <hr className='w-[0.9px] h-5 bg-black'/>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={socialLinks[platform] || ''}
                                        onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                                        className="text-[#999] bg-transparent outline-none flex-1"
                                    />
                                    <button
                                        onClick={() => handleRemovePlatform(platform)}
                                        className='bg-[#999] rounded-full w-5 h-5 flex items-center justify-center ml-2'
                                    >
                                        <X className='text-white' size={12}/>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Add More Links Section */}
                    <div>
                        {selectedPlatforms.length > 0 && (
                            <div className="flex items-center justify-center gap-x-2.5 mb-4">
                                <div className='w-10 h-0.5 bg-gradient-to-r from-white to-[#222]'/>
                                <span className="text-xs font-bold text-black tracking-wider">ADD MORE LINKS</span>
                                <div className='w-10 h-0.5 bg-gradient-to-r from-[#222] to-white'/>
                            </div>
                        )}
                        <div className="flex gap-4 justify-center">
                            {!selectedPlatforms.includes('facebook') && (
                                <button
                                    onClick={() => handlePlatformToggle('facebook')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('instagram') && (
                                <button
                                    onClick={() => handlePlatformToggle('instagram')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/instagram.svg" alt="Instagram" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('youtube') && (
                                <button
                                    onClick={() => handlePlatformToggle('youtube')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/youtube.svg" alt="YouTube" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('linkedin') && (
                                <button
                                    onClick={() => handlePlatformToggle('linkedin')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('x-social') && (
                                <button
                                    onClick={() => handlePlatformToggle('x-social')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/x-social.svg" alt="X" width={32} height={32} />
                                </button>
                            )}
                        </div>
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
            <div className="w-full max-w-sm space-y-6">
                {/* Brand Headquarter Location Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Brand Headquarter Location?<span className="text-red-500">*</span></h3>
                    <div className="space-y-3">
                        <div className="relative">
                            <select
                                value={brandHeadquarterCountry}
                                onChange={(e) => setBrandHeadquarterCountry(e.target.value)}
                                className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                            >
                                <option value="">Country</option>
                                <option value="india">India</option>
                                <option value="usa">United States</option>
                                <option value="uk">United Kingdom</option>
                                <option value="canada">Canada</option>
                                <option value="australia">Australia</option>
                                <option value="germany">Germany</option>
                                <option value="france">France</option>
                                <option value="japan">Japan</option>
                                <option value="china">China</option>
                                <option value="brazil">Brazil</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        <div className="relative">
                            <select
                                value={brandHeadquarterCity}
                                onChange={(e) => setBrandHeadquarterCity(e.target.value)}
                                className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                            >
                                <option value="">City</option>
                                <option value="mumbai">Mumbai</option>
                                <option value="delhi">Delhi</option>
                                <option value="bangalore">Bangalore</option>
                                <option value="pune">Pune</option>
                                <option value="hyderabad">Hyderabad</option>
                                <option value="chennai">Chennai</option>
                                <option value="kolkata">Kolkata</option>
                                <option value="ahmedabad">Ahmedabad</option>
                                <option value="new-york">New York</option>
                                <option value="los-angeles">Los Angeles</option>
                                <option value="london">London</option>
                                <option value="paris">Paris</option>
                                <option value="tokyo">Tokyo</option>
                                <option value="beijing">Beijing</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Founded In Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Founded In<span className="text-red-500">*</span></h3>
                    <div className="relative">
                        <select
                            value={foundedYear}
                            onChange={(e) => setFoundedYear(e.target.value)}
                            className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500"
                        >
                            <option value="">Year</option>
                            {Array.from({ length: 50 }, (_, i) => {
                                const year = new Date().getFullYear() - i;
                                return (
                                    <option key={year} value={year}>{year}</option>
                                );
                            })}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Brand Website Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Brand Website<span className="text-red-500">*</span></h3>
                    <div>
                        <input
                            type="url"
                            placeholder="Http.."
                            value={brandWebsite}
                            onChange={(e) => setBrandWebsite(e.target.value)}
                            className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                        />
                    </div>
                </div>

                {/* Active Regions Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Active Regions (Campaigns)<span className="text-red-500">*</span></h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Eg. Asia, Europe etc."
                            value={activeRegions}
                            onChange={(e) => setActiveRegions(e.target.value)}
                            className="w-full py-4 ps-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep4}/>
        </div>
    </>
  )

  const handleIncorporationUpload = () => {
    incorporationInputRef.current?.click()
  }
  
    const handleGstUpload = () => {
      gstInputRef.current?.click()
    }
  
    const handlePanUpload = () => {
      panInputRef.current?.click()
    }
  
    const handleIncorporationFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setIncorporationDocument(file)

        if (file.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(file)
          setIncorporationPreview(imageUrl)
        } else {
          setIncorporationPreview(null)
        }
        console.log('Incorporation document selected:', file.name)
      }
    }
  
    const handleGstFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setGstDocument(file)

        if (file.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(file)
          setGstPreview(imageUrl)
        } else {
          setGstPreview(null)
        }
        console.log('GST document selected:', file.name)
      }
    }
  
    const handlePanFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setPanDocument(file)

        if (file.type.startsWith('image/')) {
          const imageUrl = URL.createObjectURL(file)
          setPanPreview(imageUrl)
        } else {
          setPanPreview(null)
        }
        console.log('PAN document selected:', file.name)
      }
    }

    const handleRemoveIncorporation = () => {
      setIncorporationDocument(null)
      setIncorporationPreview(null)
      if (incorporationInputRef.current) {
        incorporationInputRef.current.value = ''
      }
    }

    const handleRemoveGst = () => {
      setGstDocument(null)
      setGstPreview(null)
      if (gstInputRef.current) {
        gstInputRef.current.value = ''
      }
    }

    const handleRemovePan = () => {
      setPanDocument(null)
      setPanPreview(null)
      if (panInputRef.current) {
        panInputRef.current.value = ''
      }
    }

  const renderStep4 = () => (
    <>
    <div className="flex flex-col py-5 px-4 pb-32 space-y-8">
        <div className="w-full max-w-sm space-y-8">
            {/* Company Incorporation Number Document */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                    Company Incorporation Number Document<span className="text-red-500">*</span>
                </h3>

                {incorporationDocument ? (
                    <div className="space-y-3">
                        {incorporationPreview ? (
                            <div className="relative border rounded-lg overflow-hidden">
                                <Image
                                    src={incorporationPreview}
                                    alt="Incorporation document preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    onClick={handleRemoveIncorporation}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <polyline points="14,2 14,8 20,8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{incorporationDocument.name}</span>
                                </div>
                                <button
                                    onClick={handleRemoveIncorporation}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleIncorporationUpload}
                            className="w-full border border-dashed border-gray-300 rounded-lg p-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Change Document
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={handleIncorporationUpload}
                        className="border-2 border-dashed border-gray-300 rounded-full p-4 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15V9M12 9L14 11M12 9L10 11" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#9CA3AF" strokeWidth="2"/>
                                </svg>
                            </div>
                            <span className="text-gray-500 font-medium">Upload Documents</span>
                        </div>
                    </div>
                )}

                <input
                    ref={incorporationInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleIncorporationFileChange}
                    className="hidden"
                />
            </div>

            {/* Company GST Document */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                    Company GST Document<span className="text-red-500">*</span>
                </h3>

                {gstDocument ? (
                    <div className="space-y-3">
                        {gstPreview ? (
                            <div className="relative border rounded-lg overflow-hidden">
                                <Image
                                    src={gstPreview}
                                    alt="GST document preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    onClick={handleRemoveGst}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <polyline points="14,2 14,8 20,8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{gstDocument.name}</span>
                                </div>
                                <button
                                    onClick={handleRemoveGst}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handleGstUpload}
                            className="w-full border border-dashed border-gray-300 rounded-lg p-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Change Document
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={handleGstUpload}
                        className="border-2 border-dashed border-gray-300 rounded-full p-4 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15V9M12 9L14 11M12 9L10 11" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#9CA3AF" strokeWidth="2"/>
                                </svg>
                            </div>
                            <span className="text-gray-500 font-medium">Upload Documents</span>
                        </div>
                    </div>
                )}

                <input
                    ref={gstInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleGstFileChange}
                    className="hidden"
                />
            </div>

            {/* Pan Detail */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                    Pan Detail<span className="text-red-500">*</span>
                </h3>

                {panDocument ? (
                    <div className="space-y-3">
                        {panPreview ? (
                            <div className="relative border rounded-lg overflow-hidden">
                                <Image
                                    src={panPreview}
                                    alt="PAN document preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    onClick={handleRemovePan}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        ) : (
                            <div className="border rounded-lg p-4 bg-gray-50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                            <polyline points="14,2 14,8 20,8" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{panDocument.name}</span>
                                </div>
                                <button
                                    onClick={handleRemovePan}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <button
                            onClick={handlePanUpload}
                            className="w-full border border-dashed border-gray-300 rounded-lg p-3 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                        >
                            Change Document
                        </button>
                    </div>
                ) : (
                    <div
                        onClick={handlePanUpload}
                        className="border-2 border-dashed border-gray-300 rounded-full p-4 flex items-center justify-center bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 15V9M12 9L14 11M12 9L10 11" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z" stroke="#9CA3AF" strokeWidth="2"/>
                                </svg>
                            </div>
                            <span className="text-gray-500 font-medium">Upload Documents</span>
                        </div>
                    </div>
                )}

                <input
                    ref={panInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handlePanFileChange}
                    className="hidden"
                />
            </div>
        </div>
    </div>

    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep5}/>
    </div>
</>
  )

  const renderStep5 = () => (
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
                        Didn&apos;t Get OTP
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
                    currentStep === 5 ? handleBackToStep4 :
                    undefined
                }>
                    <ChevronLeft size={20}/>
                </button>
                <span className='font-bold text-black'>
                    Profile Verification
                </span>
            </div>
        </div>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
    </div>
  )
}

export default VerifyBrandPage