"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import { ChevronLeft, Edit2, ImageIcon, Upload, X } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form"
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import useFetchApi from '@/hooks/useFetchApi'
import { useAuthContext } from '@/auth/context/auth-provider'
import { useRouter } from 'next/navigation'
import SendForVerificationScreen from '@/components/screens/SendForVerificationScreen'

// Form data interface
interface VerifyInfluencerFormData {
  bannerImage: string
  profileImage: string
  profileHeadline: string
  country: string
  city: string
  bio: string
  socialLinks: {[key: string]: string}
  collaborationCosts: {
    instagram: {
      reel: number | null
      story: number | null
      post: number | null
    }
    facebook: {
      post: number | null
      story: number | null
    }
    youtube: {
      video: number | null
      shorts: number | null
    }
    linkedin: {
      post: number | null
      article: number | null
    }
    twitter: {
      post: number | null
      thread: number | null
    }
  }
  whatsappNumber: string
  countryCode: string
  otp: string[]
}

interface CountryDataType {
    id: string
    name: string
    code: string
}

interface CityDataType{
    id: string
    name: string
    state: string
}

const VerifyInfluencerPage = () => {
  const { user, refetchUser } = useAuthContext()
  const router = useRouter()
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)

  // Check if verification status is pending, if so start at step 6
  const initialStep = user?.verificationStatus?.status === 'pending' ? 6 : 1
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(initialStep)

  const [resendTimer, setResendTimer] = useState(20)
  const [canResend, setCanResend] = useState(false)
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [collaborationPlatforms, setCollaborationPlatforms] = useState<string[]>(['instagram'])
  const inputsRef = useRef<HTMLInputElement[]>([])
  const [countries, setCountries] = useState<CountryDataType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [cities, setCities] = useState<CityDataType[]>([])
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)

  // Update step if verification status changes to pending
  useEffect(() => {
    if (user?.verificationStatus?.status === 'pending' && currentStep !== 6) {
      setCurrentStep(6)
    }
  }, [user?.verificationStatus?.status, currentStep])

  const {data: countriesData} = useFetchApi<CountryDataType[]>({
    endpoint: 'brand/dropdown-data/countries',
  })

  useEffect(() => {
    if (countriesData) {
      setCountries(countriesData)
    }
  }, [countriesData])
  
  const {data: citiesData} = useFetchApi<CityDataType[]>({
    endpoint: `brand/dropdown-data/cities/${selectedCountry}`,
    retrieveOnMount: !!selectedCountry
  })

  useEffect(() => {
    if (citiesData) {
      setCities(citiesData)
    }
  }, [citiesData])

  const {mutateAsync: verifyInfluencer, isPending: verifyLoading} = useMutationApi({
    endpoint: 'influencer/profile',
    method: 'PUT',
    headers:{
        'contn-type': 'multipart/form-data'
    }
  })

  const {mutateAsync: requestWhatsappOtp} = useMutationApi({
    endpoint: 'influencer/request-whatsapp-otp',
    method: 'POST',
  })

  const {mutateAsync: verifyWhatsappOtp, isPending: verifyOtpLoading} = useMutationApi({
    endpoint: 'influencer/verify-whatsapp-otp',
    method: 'POST',
    onSuccess: () => {
      refetchUser();
    }
  })

  // Initialize react-hook-form
  const methods = useForm<VerifyInfluencerFormData>({
    defaultValues: {
      bannerImage: "",
      profileImage: "",
      profileHeadline: "",
      country: "",
      city: "",
      bio: "",
      socialLinks: {},
      collaborationCosts: {
        instagram: {
          reel: null,
          story: null,
          post: null
        },
        facebook: {
          post: null,
          story: null
        },
        youtube: {
          video: null,
          shorts: null
        },
        linkedin: {
          post: null,
          article: null
        },
        twitter: {
          post: null,
          thread: null
        }
      },
      whatsappNumber: "",
      countryCode: "+91",
      otp: ["", "", "", "", "", ""]
    },
    mode: "onChange"
  })

  const { handleSubmit, register, formState: { errors }, trigger, setValue, watch, getValues } = methods

  // Populate form with existing user data
  useEffect(() => {
    if (user) {
      // Set images if they exist
      if (user.profileBanner) {
        setValue("bannerImage", user.profileBanner)
      }
      if (user.profileImage) {
        setValue("profileImage", user.profileImage)
      }

      // Set profile headline
      if (user.profileHeadline) {
        setValue("profileHeadline", user.profileHeadline)
      }

      // Set location
      if (user.location?.country?.id) {
        setValue("country", user.location.country.id.toString())
        setSelectedCountry(user.location.country.id.toString())
      }
      if (user.location?.city?.id) {
        setValue("city", user.location.city.id.toString())
      }

      // Set bio
      if (user.bio) {
        setValue("bio", user.bio)
      }

      // Set social links and populate selected platforms
      if (user.socialLinks) {
        const platforms: string[] = []
        const socialLinksData: {[key: string]: string} = {}

        if (user.socialLinks.instagram) {
          platforms.push('instagram')
          socialLinksData.instagram = user.socialLinks.instagram
        }
        if (user.socialLinks.youtube) {
          platforms.push('youtube')
          socialLinksData.youtube = user.socialLinks.youtube
        }
        if (user.socialLinks.facebook) {
          platforms.push('facebook')
          socialLinksData.facebook = user.socialLinks.facebook
        }
        if (user.socialLinks.linkedin) {
          platforms.push('linkedin')
          socialLinksData.linkedin = user.socialLinks.linkedin
        }
        if (user.socialLinks.twitter) {
          platforms.push('x-social')
          socialLinksData['x-social'] = user.socialLinks.twitter
        }

        setSelectedPlatforms(platforms)
        setValue("socialLinks", socialLinksData)
      }

      // Set collaboration costs if they exist
      if (user.collaborationCosts) {
        const costs = user.collaborationCosts
        const activePlatforms: string[] = ['instagram'] // Instagram is always included

        if (costs.instagram) {
          setValue("collaborationCosts.instagram.reel", costs.instagram.reel || null)
          setValue("collaborationCosts.instagram.story", costs.instagram.story || null)
          setValue("collaborationCosts.instagram.post", costs.instagram.post || null)
        }

        if (costs.facebook && (costs.facebook.post || costs.facebook.story)) {
          activePlatforms.push('facebook')
          setValue("collaborationCosts.facebook.post", costs.facebook.post || null)
          setValue("collaborationCosts.facebook.story", costs.facebook.story || null)
        }

        if (costs.youtube && (costs.youtube.video || costs.youtube.shorts)) {
          activePlatforms.push('youtube')
          setValue("collaborationCosts.youtube.video", costs.youtube.video || null)
          setValue("collaborationCosts.youtube.shorts", costs.youtube.shorts || null)
        }

        if (costs.linkedin && (costs.linkedin.post || costs.linkedin.article)) {
          activePlatforms.push('linkedin')
          setValue("collaborationCosts.linkedin.post", costs.linkedin.post || null)
          setValue("collaborationCosts.linkedin.article", costs.linkedin.article || null)
        }

        if (costs.twitter && (costs.twitter.post || costs.twitter.thread)) {
          activePlatforms.push('twitter')
          setValue("collaborationCosts.twitter.post", costs.twitter.post || null)
          setValue("collaborationCosts.twitter.thread", costs.twitter.thread || null)
        }

        setCollaborationPlatforms(activePlatforms)
      }

      // Set WhatsApp number if it exists
      if (user.contact?.whatsappNumber) {
        // Remove country code from the number if it exists
        const phoneNumber = user.contact.whatsappNumber.replace(/^\+\d{1,3}/, '')
        setValue("whatsappNumber", phoneNumber)
      }
    }
  }, [user, setValue])

  // Watch form values
  const watchedBannerImage = watch("bannerImage")
  const watchedProfileImage = watch("profileImage")
  const watchedSocialLinks = watch("socialLinks")
  const watchedCollaborationCosts = watch("collaborationCosts")
  const watchedWhatsappNumber = watch("whatsappNumber")
  const watchedCountryCode = watch("countryCode")
  const watchedOtp = watch("otp")

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
    const currentOtp = getValues("otp")
    const updatedOtp = [...currentOtp];
    updatedOtp[index] = value;
    setValue("otp", updatedOtp);

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const currentOtp = getValues("otp")
    
    if (event.key === "Backspace") {
      const updatedOtp = [...currentOtp];
      if (!currentOtp[index] && index > 0) {
        inputsRef.current[index - 1].focus();
      }
      updatedOtp[index] = "";
      setValue("otp", updatedOtp);
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
    const currentOtp = getValues("otp")
    const updatedOtp = [...currentOtp];
    pasteData.forEach((char, idx) => {
      if (idx < updatedOtp.length) {
        updatedOtp[idx] = char;
      }
    });
    setValue("otp", updatedOtp);
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

  const handleBannerFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBannerFile(file)
      setValue("bannerImage", imageUrl)
      await trigger("bannerImage")
      console.log('Banner file selected:', file.name)
    }
  }

  const handleRemoveBanner = async () => {
    setValue("bannerImage", "")
    setBannerFile(null)
    if (bannerInputRef.current) {
      bannerInputRef.current.value = ''
    }
    await trigger("bannerImage")
  }

  const handleProfileFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileFile(file)
      setValue("profileImage", imageUrl)
      await trigger("profileImage")
      console.log('Profile file selected:', file.name)
    }
  }

  const handleRemoveProfile = async () => {
    setValue("profileImage", "")
    setProfileFile(null)
    if (profileInputRef.current) {
      profileInputRef.current.value = ''
    }
    await trigger("profileImage")
  }

  const handleContinueToStep2 = () => {
    setCurrentStep(2)
  }

  const handleBackToStep1 = () => {
    setCurrentStep(1)
  }

  const handleContinueToStep3 = async () => {
    const isValid = await trigger(["bannerImage", "profileImage", "profileHeadline", "country", "city", "bio"])
    if (isValid) {
      try {
        const formData = getValues()
        const payload = new FormData()

        // Add files
        if (bannerFile) {
          payload.append('profileBanner', bannerFile)
        }
        if (profileFile) {
          payload.append('profileImage', profileFile)
        }

        // Add other data
        payload.append('profileHeadline', formData.profileHeadline)
        payload.append('countryId', formData.country)
        payload.append('cityId', formData.city)
        payload.append('bio', formData.bio)
        payload.append('instagramUrl', formData.socialLinks.instagram || '')
        payload.append('youtubeUrl', formData.socialLinks.youtube || '')
        payload.append('facebookUrl', formData.socialLinks.facebook || '')
        payload.append('linkedinUrl', formData.socialLinks.linkedin || '')
        payload.append('twitterUrl', formData.socialLinks['x-social'] || '')

        await verifyInfluencer(payload as unknown as DynamicMutationPayload)
        setCurrentStep(3)
      } catch (error) {
        console.error('Error updating profile:', error)
      }
    }
  }

  const handleBackToStep2 = () => {
    setCurrentStep(2)
  }

  const handleContinueToStep4 = async () => {
    const isValid = await trigger("collaborationCosts")
    if (isValid) {
      try {
        const formData = getValues()
        const payload = new FormData()

        // Add collaboration costs for Instagram (always present)
        payload.append('collaborationCosts[instagram][reel]', formData.collaborationCosts.instagram.reel?.toString() || '')
        payload.append('collaborationCosts[instagram][story]', formData.collaborationCosts.instagram.story?.toString() || '')
        payload.append('collaborationCosts[instagram][post]', formData.collaborationCosts.instagram.post?.toString() || '')

        // Add collaboration costs for other platforms if they're selected
        if (collaborationPlatforms.includes('facebook')) {
          payload.append('collaborationCosts[facebook][post]', formData.collaborationCosts.facebook.post?.toString() || '')
          payload.append('collaborationCosts[facebook][story]', formData.collaborationCosts.facebook.story?.toString() || '')
        }

        if (collaborationPlatforms.includes('youtube')) {
          payload.append('collaborationCosts[youtube][video]', formData.collaborationCosts.youtube.video?.toString() || '')
          payload.append('collaborationCosts[youtube][shorts]', formData.collaborationCosts.youtube.shorts?.toString() || '')
        }

        if (collaborationPlatforms.includes('linkedin')) {
          payload.append('collaborationCosts[linkedin][post]', formData.collaborationCosts.linkedin.post?.toString() || '')
          payload.append('collaborationCosts[linkedin][article]', formData.collaborationCosts.linkedin.article?.toString() || '')
        }

        if (collaborationPlatforms.includes('twitter')) {
          payload.append('collaborationCosts[twitter][post]', formData.collaborationCosts.twitter.post?.toString() || '')
          payload.append('collaborationCosts[twitter][thread]', formData.collaborationCosts.twitter.thread?.toString() || '')
        }

        await verifyInfluencer(payload as unknown as DynamicMutationPayload)
        setCurrentStep(4)
      } catch (error) {
        console.error('Error updating collaboration costs:', error)
      }
    }
  }

  const handleContinueToStep5 = async () => {
    const isValid = await trigger(["whatsappNumber"])
    if (isValid) {
      try {
        const formData = getValues()
        const payload = {
          countryCode: formData.countryCode,
          whatsappNumber: formData.whatsappNumber
        }

        await requestWhatsappOtp(payload)
        setCurrentStep(5)
      } catch (error) {
        console.error('Error requesting WhatsApp OTP:', error)
      }
    }
  }

  const handleBackToStep4 = () => {
    setCurrentStep(4)
  }

  const handleBackToStep3 = () => {
    setCurrentStep(3)
  }

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        // Remove platform and its social link
        const newPlatforms = prev.filter(p => p !== platform)
        const currentLinks = getValues("socialLinks")
        const newLinks = { ...currentLinks }
        delete newLinks[platform]
        setValue("socialLinks", newLinks)
        return newPlatforms
      } else {
        // Add platform and initialize empty social link
        const currentLinks = getValues("socialLinks")
        setValue("socialLinks", {
          ...currentLinks,
          [platform]: ''
        })
        return [...prev, platform]
      }
    })
  }

  const handleSocialLinkChange = async (platform: string, value: string) => {
    const currentLinks = getValues("socialLinks")
    setValue("socialLinks", {
      ...currentLinks,
      [platform]: value
    })
    await trigger("socialLinks")
  }

  const handleRemovePlatform = (platform: string) => {
    setSelectedPlatforms(prev => prev.filter(p => p !== platform))
    const currentLinks = getValues("socialLinks")
    const newLinks = { ...currentLinks }
    delete newLinks[platform]
    setValue("socialLinks", newLinks)
  }

  const handleCollaborationPlatformToggle = (platform: string) => {
    setCollaborationPlatforms(prev => {
      if (prev.includes(platform)) {
        // Don't remove Instagram as it's required by default
        if (platform === 'instagram') return prev
        return prev.filter(p => p !== platform)
      } else {
        return [...prev, platform]
      }
    })
  }

  const handleCollaborationCostChange = async (platform: string, type: string, value: string) => {
    const currentCosts = getValues("collaborationCosts")
    setValue("collaborationCosts", {
      ...currentCosts,
      [platform]: {
        ...currentCosts[platform as keyof typeof currentCosts],
        [type]: value
      }
    })
    await trigger("collaborationCosts")
  }

  // Form submit handlers for each step
  const onSubmitStep2 = (data: VerifyInfluencerFormData) => {
    console.log("Step 2 submitted:", data)
    setCurrentStep(3)
  }

  const onSubmitStep3 = (data: VerifyInfluencerFormData) => {
    console.log("Step 3 submitted:", data)
    setCurrentStep(4)
  }

  const onSubmitStep4 = (data: VerifyInfluencerFormData) => {
    console.log("Step 4 submitted:", data)
    setCurrentStep(5)
  }

  const onSubmitStep5 = async () => {
    const isValid = await trigger("otp")
    if (isValid) {
      try {
        const formData = getValues()
        const otpString = formData.otp.join("")

        const payload = {
          whatsappNumber: `${formData.countryCode}${formData.whatsappNumber}`,
          otp: otpString
        }

        console.log("Verifying WhatsApp OTP:", payload)

        await verifyWhatsappOtp(payload)

        console.log("WhatsApp OTP verification successful!")
        // Move to verification sent screen
        setCurrentStep(6)

      } catch (error) {
        console.error('Error verifying WhatsApp OTP:', error)
      }
    }
  }

  const renderStep1 = () => (
    <>
        <div className="text-center">
            <div className="relative mb-4 flex items-center justify-center mt-10">
              <div className="relative">
                <div className='rounded-full w-32 h-32 relative overflow-hidden'>
                    <Image src="/images/user/influencer.svg" alt="Influencer" fill className='object-cover' />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white absolute bottom-1 right-0">
                    <Image src="/images/common/verification-badge.svg" alt="verification-badge" height={20} width={18}/>
                </div>
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
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitStep2)}>
        <div className="flex flex-col items-center mt-10 px-4 pb-32 space-y-12">
            <div className="w-full max-w-sm">
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile Banner*</h3>
                    {watchedBannerImage ? (
                        <div className="relative rounded-lg overflow-hidden min-h-[120px]">
                            <Image
                                src={watchedBannerImage}
                                alt="Banner preview"
                                fill
                                className="object-cover"
                            />

                            <button
                                type="button"
                                onClick={handleRemoveBanner}
                                className="absolute top-2 right-2 flex items-center bg-theme-blue hover:bg-black/70 text-white rounded-full p-1.5 transition-colors duration-200 z-10"
                                title="Remove banner image"
                            >
                                <X size={16} />
                            </button>

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
                    <input
                        type="hidden"
                        {...register("bannerImage", {
                            required: "Banner image is required"
                        })}
                    />
                    {errors.bannerImage && (
                        <p className="text-red-500 text-sm mt-2">{errors.bannerImage.message}</p>
                    )}
                </div>

                <div>
                    <h3 className="text-lg font-semibold text-black mb-3 mt-6">Add Profile Image*</h3>
                    <div className="flex justify-center">
                        <div className="relative">
                            {watchedProfileImage ? (
                                <>
                                    <div className="w-24 h-24 rounded-full overflow-hidden relative">
                                        <Image
                                            src={watchedProfileImage}
                                            alt="Profile preview"
                                            fill
                                            className="object-cover"
                                        />

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

                                    <button
                                        type="button"
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
                                        type="button"
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
                    <input
                        type="hidden"
                        {...register("profileImage", {
                            required: "Profile image is required"
                        })}
                    />
                    {errors.profileImage && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errors.profileImage.message}</p>
                    )}
                </div>

                {/* Profile Headline Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-3 mt-6">Add Profile headline</h3>
                    <div className="relative">
                        <textarea
                            {...register("profileHeadline", {
                                required: "Profile headline is required",
                                minLength: {
                                    value: 10,
                                    message: "Profile headline must be at least 10 characters"
                                },
                                maxLength: {
                                    value: 500,
                                    message: "Profile headline cannot exceed 500 characters"
                                }
                            })}
                            placeholder="Add Profile Headline"
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 ${
                                errors.profileHeadline ? 'border-red-500' : 'border-gray-300'
                            }`}
                            maxLength={500}
                        />
                        <span className="absolute -bottom-3 right-0 text-xs text-gray-500">
                            {watch("profileHeadline")?.length || 0}/500
                        </span>
                    </div>
                    {errors.profileHeadline && (
                        <p className="text-red-500 text-sm mt-4">{errors.profileHeadline.message}</p>
                    )}
                </div>

                {/* Location Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-3 mt-6">Location</h3>
                    <div className="space-y-3">
                        <div className="relative">
                            <select
                                {...register("country", {
                                    required: "Please select your country"
                                })}
                                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
                                    errors.country ? 'border-red-500' : 'border-gray-300'
                                }`}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="">Select Country</option>
                                {
                                    countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.country && (
                            <p className="text-red-500 text-sm">{errors.country.message}</p>
                        )}
                        <div className="relative">
                            <select
                                {...register("city", {
                                    required: "Please select your city"
                                })}
                                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white ${
                                    errors.city ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">Select City</option>
                                {
                                    cities.map((city) => (
                                        <option key={city.id} value={city.id}>
                                            {city.name}
                                        </option>
                                    ))
                                }
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>
                        {errors.city && (
                            <p className="text-red-500 text-sm">{errors.city.message}</p>
                        )}
                    </div>
                </div>

                {/* Bio Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-3 mt-6">Tell Other About Your Self</h3>
                    <div className="relative">
                        <textarea
                            {...register("bio", {
                                required: "Bio is required",
                                minLength: {
                                    value: 20,
                                    message: "Bio must be at least 20 characters"
                                },
                                maxLength: {
                                    value: 1000,
                                    message: "Bio cannot exceed 1000 characters"
                                }
                            })}
                            placeholder="Add Bio"
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 ${
                                errors.bio ? 'border-red-500' : 'border-gray-300'
                            }`}
                            maxLength={1000}
                        />
                        <span className="absolute -bottom-3 right-0 text-xs text-gray-500">
                            {watch("bio")?.length || 0}/1000
                        </span>
                    </div>
                    {errors.bio && (
                        <p className="text-red-500 text-sm mt-4">{errors.bio.message}</p>
                    )}
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
                                    </div>
                                    <input
                                        type="text"
                                        placeholder="https://..."
                                        value={watchedSocialLinks[platform] || ''}
                                        onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                                        className="text-[#999] bg-transparent outline-none flex-1"
                                    />
                                    <button
                                        type="button"
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
                                    type="button"
                                    onClick={() => handlePlatformToggle('facebook')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('instagram') && (
                                <button
                                    type="button"
                                    onClick={() => handlePlatformToggle('instagram')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/instagram.svg" alt="Instagram" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('youtube') && (
                                <button
                                    type="button"
                                    onClick={() => handlePlatformToggle('youtube')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/youtube.svg" alt="YouTube" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('linkedin') && (
                                <button
                                    type="button"
                                    onClick={() => handlePlatformToggle('linkedin')}
                                    className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                                >
                                    <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={32} height={32} />
                                </button>
                            )}
                            {!selectedPlatforms.includes('x-social') && (
                                <button
                                    type="button"
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
      </form>
    </FormProvider>
  )

  const renderStep3 = () => (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitStep3)}>
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
                                value={watchedCollaborationCosts.instagram.reel?.toString()}
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
                                value={watchedCollaborationCosts.instagram.story?.toString()}
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
                                value={watchedCollaborationCosts.instagram.post?.toString()}
                                onChange={(e) => handleCollaborationCostChange('instagram', 'post', e.target.value)}
                                className="text-[#999] bg-transparent outline-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Additional Platforms */}
                {collaborationPlatforms.includes('facebook') && (
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
                                    value={watchedCollaborationCosts.facebook.post?.toString()}
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
                                    value={watchedCollaborationCosts.facebook.story?.toString()}
                                    onChange={(e) => handleCollaborationCostChange('facebook', 'story', e.target.value)}
                                    className="text-[#999] bg-transparent outline-none"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Similar sections for other platforms... */}
                
                {/* Add More Platform Section */}
                <div>
                    {collaborationPlatforms.length > 0 && (
                        <div className="flex items-center justify-center gap-x-2.5 mb-4">
                            <div className='w-10 h-0.5 bg-gradient-to-r from-white to-[#222]'/>
                            <span className="text-xs font-bold text-black tracking-wider">ADD FOR MORE PLATFORM</span>
                            <div className='w-10 h-0.5 bg-gradient-to-r from-[#222] to-white'/>
                        </div>
                    )}
                    <div className="flex gap-4 justify-center">
                        {!collaborationPlatforms.includes('facebook') && (
                            <button
                                type="button"
                                onClick={() => handleCollaborationPlatformToggle('facebook')}
                                className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                            >
                                <Image src="/images/icons/facebook.svg" alt="Facebook" width={32} height={32} />
                            </button>
                        )}
                        {!collaborationPlatforms.includes('youtube') && (
                            <button
                                type="button"
                                onClick={() => handleCollaborationPlatformToggle('youtube')}
                                className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                            >
                                <Image src="/images/icons/youtube.svg" alt="YouTube" width={32} height={32} />
                            </button>
                        )}
                        {!collaborationPlatforms.includes('linkedin') && (
                            <button
                                type="button"
                                onClick={() => handleCollaborationPlatformToggle('linkedin')}
                                className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                            >
                                <Image src="/images/icons/linkedin.svg" alt="LinkedIn" width={32} height={32} />
                            </button>
                        )}
                        {!collaborationPlatforms.includes('twitter') && (
                            <button
                                type="button"
                                onClick={() => handleCollaborationPlatformToggle('twitter')}
                                className="h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center transition-colors"
                            >
                                <Image src="/images/icons/x-social.svg" alt="X" width={32} height={32} />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep4} disabled={verifyLoading}/>
        </div>
      </form>
    </FormProvider>
  )

  const renderStep4 = () => (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitStep4)}>
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
                                {...register("countryCode")}
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
                                {...register("whatsappNumber", {
                                    required: "WhatsApp number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Please enter a valid 10-digit phone number"
                                    }
                                })}
                                className={`w-full text-black placeholder-gray-400 bg-transparent outline-none ${
                                    errors.whatsappNumber ? 'border-red-500' : ''
                                }`}
                            />
                        </div>
                    </div>
                    {errors.whatsappNumber && (
                        <p className="text-red-500 text-sm mt-2">{errors.whatsappNumber.message}</p>
                    )}
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep5}/>
        </div>
      </form>
    </FormProvider>
  )

  const renderStep5 = () => (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitStep5)}>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-6">
            <div className="text-center">
                <h2 className="text-xl font-bold text-black">OTP Verification</h2>
                <p className="text-sm text-[#555]">
                    You have received an OTP at {watchedCountryCode}{watchedWhatsappNumber}
                </p>
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div>
                    <div className="flex gap-1.5 justify-center" id="otp-container">
                        {watchedOtp.map((_, index) => (
                            <input
                                key={index}
                                type="text"
                                maxLength={1}
                                value={watchedOtp[index]}
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
                    {/* Hidden input for form validation */}
                    <input
                        type="hidden"
                        {...register("otp", {
                            validate: (value) => {
                                const otpString = value.join("")
                                return otpString.length === 6 || "Please enter complete OTP"
                            }
                        })}
                    />
                    {errors.otp && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errors.otp.message}</p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-sm font-normal text-gray-700">
                        {"Didn't Get OTP"}
                    </p>
                    <div>
                        {canResend ? (
                            <button
                                type="button"
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
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleSubmit(onSubmitStep5)} disabled={verifyOtpLoading}/>
        </div>
      </form>
    </FormProvider>
  )

  const renderStep6 = () => (
    <SendForVerificationScreen onClose={handleCloseVerificationScreen}/>
  )

  const handleCloseVerificationScreen = () => {
    router.push("/influencers/me")
  }

  return (
    <div className='min-h-screen flex flex-col'>
        {currentStep !== 6 && (
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
        )}
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
        {currentStep === 6 && renderStep6()}
    </div>
  )
}

export default VerifyInfluencerPage