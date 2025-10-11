"use client"
import { ChevronLeft, Edit2, ImageIcon, X, Upload } from 'lucide-react'
import Image from 'next/image'
import React, { useRef, useState, useEffect } from 'react'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import { useForm, FormProvider } from "react-hook-form"
import SendForVerificationScreen from '@/components/screens/SendForVerificationScreen'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/auth/context/auth-provider'
import useFetchApi from '@/hooks/useFetchApi'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'

// Form data interface
interface VerifyBrandFormData {
  bannerImage: string
  profileImage: string
  profileHeadline: string
  bio: string
  socialLinks: {[key: string]: string}
  brandHeadquarterCountry: CountryDataType
  brandHeadquarterCity: CityDataType
  foundedYear: string
  brandWebsite: string
  activeRegions: string | string[]
  incorporationDocument: string
  gstDocument: string
  panDocument: string
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

const VerifyBrandPage = () => {
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const incorporationInputRef = useRef<HTMLInputElement>(null)
  const gstInputRef = useRef<HTMLInputElement>(null)
  const panInputRef = useRef<HTMLInputElement>(null)
  const {user} = useAuthContext();

  // Determine initial step based on verification status
  const getInitialStep = (): 1 | 2 | 3 | 4 | 5 => {
    if (user?.verificationStatus?.status === 'pending') {
      return 5 // Show SendForVerificationScreen if status is pending
    }
    return 1 // Show step 1 if status is null or any other value
  }

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(getInitialStep())
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([])
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)
  const [incorporationFile, setIncorporationFile] = useState<File | null>(null)
  const [gstFile, setGstFile] = useState<File | null>(null)
  const [panFile, setPanFile] = useState<File | null>(null)
  const router = useRouter();
  const [countries, setCountries] = useState<CountryDataType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [cities, setCities] = useState<CityDataType[]>([])

  console.log({user})

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

  const {mutateAsync: verifyBrand, isPending: verifyLoading} = useMutationApi({
      endpoint: 'brand/profile',
      method: 'PUT',
      headers:{
          'contn-type': 'multipart/form-data'
      }
    })  

  // Initialize react-hook-form
  const methods = useForm<VerifyBrandFormData>({
    defaultValues: {
      bannerImage: user?.profileMedia?.profileBanner || "",
      profileImage: user?.profileMedia?.profileImage || "",
      profileHeadline: user?.profileHeadline || "",
      bio: user?.brandBio || "",
      socialLinks: user?.socialLinks || {},
      brandHeadquarterCountry: user?.companyInfo?.headquarterCountry 
        ? {
            id: user.companyInfo.headquarterCountry.id?.toString() || '',
            name: user.companyInfo.headquarterCountry.name || '',
            code: user.companyInfo.headquarterCountry.code || ''
          } 
        : { id: '', name: '', code: '' },
      brandHeadquarterCity: user?.companyInfo?.headquarterCity 
        ? {
            id: user.companyInfo.headquarterCity.id?.toString() || '',
            name: user.companyInfo.headquarterCity.name || '',
            state: user.companyInfo.headquarterCity.state || ''
          }
        : { id: '', name: '', state: '' },
      foundedYear: user?.companyInfo?.foundedYear?.toString() || "",
      brandWebsite: user?.companyInfo?.websiteUrl || "",
      activeRegions: user?.companyInfo?.activeRegions || "",
      incorporationDocument: "",
      gstDocument: "",
      panDocument: ""
    },
    mode: "onChange"
  })

  const { register, formState: { errors }, trigger, setValue, watch, getValues } = methods

  // Watch form values
  const watchedBannerImage = watch("bannerImage")
  const watchedProfileImage = watch("profileImage")
  const watchedSocialLinks = watch("socialLinks")
  const watchedIncorporationDocument = watch("incorporationDocument")
  const watchedGstDocument = watch("gstDocument")
  const watchedPanDocument = watch("panDocument")

  // Update current step based on verification status changes
  useEffect(() => {
    if (user?.verificationStatus?.status === 'pending') {
      setCurrentStep(5)
    }
  }, [user?.verificationStatus?.status])

  // Initialize selected platforms based on user's social links
  useEffect(() => {
    if (user?.socialLinks) {
      const platforms = Object.entries(user.socialLinks)
        .filter(([value]) => value !== null && value !== '')
        .map(([key]) => {
          // Map twitter to x-social
          if (key === 'twitter') return 'x-social';
          return key;
        });
      setSelectedPlatforms(platforms);
    }
  }, [user?.socialLinks]);

  useEffect(() => {
    return () => {
      if (watchedIncorporationDocument) {
        URL.revokeObjectURL(watchedIncorporationDocument)
      }
      if (watchedGstDocument) {
        URL.revokeObjectURL(watchedGstDocument)
      }
      if (watchedPanDocument) {
        URL.revokeObjectURL(watchedPanDocument)
      }
    }
  }, [watchedIncorporationDocument, watchedGstDocument, watchedPanDocument]);

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

  const handleContinueToStep3 = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    const isValid = await trigger(["bannerImage", "profileImage", "profileHeadline", "bio"])
    if (isValid) {
      setCurrentStep(3)
    }
  }

  const handleBackToStep2 = () => {
    setCurrentStep(2)
  }

  const handleContinueToStep4 = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    const isValid = await trigger(["brandHeadquarterCountry", "brandHeadquarterCity", "foundedYear", "brandWebsite", "activeRegions"])
    if (isValid) {
      setCurrentStep(4)
    }
  }

  const handleBackToStep3 = () => {
    setCurrentStep(3)
  }

  const handleContinueToStep5 = async (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault()
    const isValid = await trigger(["incorporationDocument", "gstDocument", "panDocument"])
    if (isValid) {
      try {
        const formData = getValues()
        const payload = new FormData()

        // Add text fields
        if (formData.bio) payload.append('brandBio', formData.bio)
        if (formData.profileHeadline) payload.append('profileHeadline', formData.profileHeadline)
        if (formData.brandWebsite) payload.append('websiteUrl', formData.brandWebsite)
        if (formData.foundedYear) payload.append('foundedYear', formData.foundedYear)
        if (formData.brandHeadquarterCountry) payload.append('headquarterCountryId', formData.brandHeadquarterCountry.id)
        if (formData.brandHeadquarterCity) payload.append('headquarterCityId', formData.brandHeadquarterCity.id)
        if (formData.activeRegions) payload.append('activeRegions', JSON.stringify([formData.activeRegions]))

        // Add social links
        if (formData.socialLinks.facebook) payload.append('facebookUrl', formData.socialLinks.facebook)
        if (formData.socialLinks.instagram) payload.append('instagramUrl', formData.socialLinks.instagram)
        if (formData.socialLinks.youtube) payload.append('youtubeUrl', formData.socialLinks.youtube)
        if (formData.socialLinks.linkedin) payload.append('linkedinUrl', formData.socialLinks.linkedin)
        if (formData.socialLinks['x-social']) payload.append('twitterUrl', formData.socialLinks['x-social'])

        // Add files
        if (bannerFile) payload.append('profileBanner', bannerFile)
        if (profileFile) payload.append('profileImage', profileFile)
        if (incorporationFile) payload.append('incorporationDocument', incorporationFile)
        if (gstFile) payload.append('gstDocument', gstFile)
        if (panFile) payload.append('panDocument', panFile)

        // Add niches if available from user data
        if (user?.niches && user.niches.length > 0) {
          const nicheIds = user.niches.map((niche) => niche.id)
          payload.append('nicheIds', JSON.stringify(nicheIds))
        }

        if (user?.customNiches && user.customNiches.length > 0) {
          payload.append('customNiches', JSON.stringify(user.customNiches))
        }

        await verifyBrand(payload as unknown as DynamicMutationPayload)
        setCurrentStep(5)
      } catch (error) {
        console.error('Error submitting verification:', error)
      }
    }
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
      <form onSubmit={(e) => { e.preventDefault(); handleContinueToStep3(); }}>
        <div className="flex flex-col items-center py-16 px-4 pb-32 space-y-12">
            <div className="w-full space-y-8">
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

                            {/* Remove Button */}
                            <button
                                type="button"
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
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile Image*</h3>
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
                    <h3 className="text-lg font-semibold text-black mb-4">Add Profile headline</h3>
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
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-28 ${
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

                {/* Bio Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Tell Other About Your Self</h3>
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
      <form onSubmit={(e) => { e.preventDefault(); handleContinueToStep4(); }}>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-6">
            <div className="w-full space-y-6">
                {/* Brand Headquarter Location Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Brand Headquarter Location?<span className="text-red-500">*</span></h3>
                    <div className="space-y-3">
                        <div className="relative">
                            <select
                                {...register("brandHeadquarterCountry", {
                                    required: "Please select your brand headquarter country"
                                })}
                                className={`w-full py-4 ps-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500 ${
                                    errors.brandHeadquarterCountry ? 'border-red-500' : 'border-gray-300'
                                }`}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                            >
                                <option value="">Country</option>
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
                        {errors.brandHeadquarterCountry && (
                            <p className="text-red-500 text-sm">{errors.brandHeadquarterCountry.message}</p>
                        )}
                        <div className="relative">
                            <select
                                {...register("brandHeadquarterCity", {
                                    required: "Please select your brand headquarter city"
                                })}
                                className={`w-full py-4 ps-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500 ${
                                    errors.brandHeadquarterCity ? 'border-red-500' : 'border-gray-300'
                                }`}
                            >
                                <option value="">City</option>
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
                        {errors.brandHeadquarterCity && (
                            <p className="text-red-500 text-sm">{errors.brandHeadquarterCity.message}</p>
                        )}
                    </div>
                </div>

                {/* Founded In Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Founded In<span className="text-red-500">*</span></h3>
                    <div className="relative">
                        <select
                            {...register("foundedYear", {
                                required: "Please select founded year"
                            })}
                            className={`w-full py-4 ps-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-gray-500 ${
                                errors.foundedYear ? 'border-red-500' : 'border-gray-300'
                            }`}
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
                    {errors.foundedYear && (
                        <p className="text-red-500 text-sm mt-2">{errors.foundedYear.message}</p>
                    )}
                </div>

                {/* Brand Website Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Brand Website<span className="text-red-500">*</span></h3>
                    <div>
                        <input
                            type="url"
                            placeholder="Http.."
                            {...register("brandWebsite", {
                                required: "Brand website is required",
                                pattern: {
                                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                                    message: "Please enter a valid website URL"
                                }
                            })}
                            className={`w-full py-4 ps-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 ${
                                errors.brandWebsite ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    </div>
                    {errors.brandWebsite && (
                        <p className="text-red-500 text-sm mt-2">{errors.brandWebsite.message}</p>
                    )}
                </div>

                {/* Active Regions Section */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">Active Regions (Campaigns)<span className="text-red-500">*</span></h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Eg. Asia, Europe etc."
                            {...register("activeRegions", {
                                required: "Active regions is required"
                            })}
                            className={`w-full py-4 ps-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-500 ${
                                errors.activeRegions ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                    </div>
                    {errors.activeRegions && (
                        <p className="text-red-500 text-sm mt-2">{errors.activeRegions.message}</p>
                    )}
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={handleContinueToStep4}/>
        </div>
      </form>
    </FormProvider>
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
  
  const handleIncorporationFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setIncorporationFile(file)

      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file)
        setValue("incorporationDocument", imageUrl)
      } else {
        setValue("incorporationDocument", file.name)
      }
      await trigger("incorporationDocument")
      console.log('Incorporation document selected:', file.name)
    }
  }

  const handleGstFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setGstFile(file)

      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file)
        setValue("gstDocument", imageUrl)
      } else {
        setValue("gstDocument", file.name)
      }
      await trigger("gstDocument")
      console.log('GST document selected:', file.name)
    }
  }

  const handlePanFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setPanFile(file)

      if (file.type.startsWith('image/')) {
        const imageUrl = URL.createObjectURL(file)
        setValue("panDocument", imageUrl)
      } else {
        setValue("panDocument", file.name)
      }
      await trigger("panDocument")
      console.log('PAN document selected:', file.name)
    }
  }

  const handleRemoveIncorporation = async () => {
    setIncorporationFile(null)
    setValue("incorporationDocument", "")
    if (incorporationInputRef.current) {
      incorporationInputRef.current.value = ''
    }
    await trigger("incorporationDocument")
  }

  const handleRemoveGst = async () => {
    setGstFile(null)
    setValue("gstDocument", "")
    if (gstInputRef.current) {
      gstInputRef.current.value = ''
    }
    await trigger("gstDocument")
  }

  const handleRemovePan = async () => {
    setPanFile(null)
    setValue("panDocument", "")
    if (panInputRef.current) {
      panInputRef.current.value = ''
    }
    await trigger("panDocument")
  }

  const renderStep4 = () => (
    <FormProvider {...methods}>
      <form onSubmit={(e) => { e.preventDefault(); handleContinueToStep5(); }}>
        <div className="flex flex-col py-5 px-4 pb-32 space-y-8">
            <div className="w-full space-y-8">
                {/* Company Incorporation Number Document */}
                <div>
                    <h3 className="text-lg font-semibold text-black mb-4">
                        Company Incorporation Number Document<span className="text-red-500">*</span>
                    </h3>

                    {watchedIncorporationDocument && incorporationFile ? (
                        <div className="space-y-3">
                            {watchedIncorporationDocument.startsWith('blob:') ? (
                                <div className="relative border rounded-lg overflow-hidden">
                                    <Image
                                        src={watchedIncorporationDocument}
                                        alt="Incorporation document preview"
                                        width={300}
                                        height={200}
                                        className="w-full h-48 object-cover"
                                    />
                                    <button
                                        type="button"
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
                                        <span className="text-sm font-medium text-gray-700">{incorporationFile.name}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleRemoveIncorporation}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            )}
                            <button
                                type="button"
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
                <input
                    type="hidden"
                    {...register("incorporationDocument", {
                        required: "Incorporation document is required"
                    })}
                />
                {errors.incorporationDocument && (
                    <p className="text-red-500 text-sm mt-2">{errors.incorporationDocument.message}</p>
                )}
            </div>

            {/* Company GST Document */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                    Company GST Document<span className="text-red-500">*</span>
                </h3>

                {watchedGstDocument && gstFile ? (
                    <div className="space-y-3">
                        {watchedGstDocument.startsWith('blob:') ? (
                            <div className="relative border rounded-lg overflow-hidden">
                                <Image
                                    src={watchedGstDocument}
                                    alt="GST document preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    type="button"
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
                                    <span className="text-sm font-medium text-gray-700">{gstFile.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemoveGst}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
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
                <input
                    type="hidden"
                    {...register("gstDocument", {
                        required: "GST document is required"
                    })}
                />
                {errors.gstDocument && (
                    <p className="text-red-500 text-sm mt-2">{errors.gstDocument.message}</p>
                )}
            </div>

            {/* Pan Detail */}
            <div>
                <h3 className="text-lg font-semibold text-black mb-4">
                    Pan Detail<span className="text-red-500">*</span>
                </h3>

                {watchedPanDocument && panFile ? (
                    <div className="space-y-3">
                        {watchedPanDocument.startsWith('blob:') ? (
                            <div className="relative border rounded-lg overflow-hidden">
                                <Image
                                    src={watchedPanDocument}
                                    alt="PAN document preview"
                                    width={300}
                                    height={200}
                                    className="w-full h-48 object-cover"
                                />
                                <button
                                    type="button"
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
                                    <span className="text-sm font-medium text-gray-700">{panFile.name}</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={handleRemovePan}
                                    className="text-red-500 hover:text-red-700 p-1"
                                >
                                    <X size={16} />
                                </button>
                            </div>
                        )}
                        <button
                            type="button"
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
                <input
                    type="hidden"
                    {...register("panDocument", {
                        required: "PAN document is required"
                    })}
                />
                {errors.panDocument && (
                    <p className="text-red-500 text-sm mt-2">{errors.panDocument.message}</p>
                )}
            </div>
        </div>
    </div>

    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
        <ArrowFilledButton text="Send Profile for Verification" textCenter={true} onClick={handleContinueToStep5} disabled={verifyLoading}/>
    </div>
      </form>
    </FormProvider>
  )

  const renderStep5 = () => (
    <SendForVerificationScreen onClose={handleCloseVerificationScreen}/>
  )

  const handleCloseVerificationScreen = () => {
    router.push("/brands/me")
  }

  return (
    <div className='min-h-screen flex flex-col'>
        <div className='border-b border-[#E4E4E4]'>
            {
                currentStep < 5 &&
                <div className="back flex items-center gap-x-3 px-4 py-3">
                    <button onClick={
                        currentStep === 1 ? () => router.push('/brands/me') :
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
            }
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