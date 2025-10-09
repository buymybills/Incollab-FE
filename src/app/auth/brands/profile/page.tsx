"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import BottomSheet from '@/components/bottomsheets/BottomSheet'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useFetchApi from '@/hooks/useFetchApi'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import { ChevronDown, ChevronLeft, Edit, Plus } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

interface CompanyTypesData{
  id: number,
  name: string,
  description: string,
  isActive: boolean,
}

interface CompleteProfileResponse {
  success: boolean
  message: string
}

interface userNameResponse {
  message: string;
  available: boolean;
  suggestions: string[];
}

export interface NichesData {
  message: string,
  niches: {
    id: string,
    name: string,
    description: string,
  }[]
}

interface BrandFormData {
  brandName: string
  brandUsername: string
  legalEntityName: string
  brandType: string
  brandPocName: string
  brandPocDesignation: string
  brandPocEmail: string
  brandPocContact: string
  brandProfileImage?: string
  brandBio?: string
  selectedBrandNiches: string[]
  // Document uploads
  incorporationDocument?: File
  gstDocument?: File
  panDocument?: File
  // Phone number for API
  phone: string
}

const BrandsProfilePage = () => {
  const [selectedBrandSuggestion, setSelectedBrandSuggestion] = useState<string>("")
  const [showBrandLoader, setShowBrandLoader] = useState(false)
  const [showBrandApproved, setShowBrandApproved] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showCustomNicheBottomSheet, setShowCustomNicheBottomSheet] = useState(false)
  const [customNicheInput, setCustomNicheInput] = useState("")
  const [companyTypes, setCompanyTypes] = useState<CompanyTypesData[]>([])  
  const [brandNiches, setBrandNiches] = useState<{ id: string; name: string; description: string; }[]>([])
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])
  const router = useRouter();
  const {token} = useAuthContext();

  // Form setup
  const {handleSubmit, register, formState: {errors}, trigger, setValue, watch} = useForm<BrandFormData>({
    defaultValues: {
      brandName: "",
      brandUsername: "",
      legalEntityName: "",
      brandType: "",
      brandPocName: "",
      brandPocDesignation: "",
      brandPocEmail: "",
      brandPocContact: "",
      brandProfileImage: "",
      brandBio: "",
      selectedBrandNiches: [],
      incorporationDocument: undefined,
      gstDocument: undefined,
      panDocument: undefined,
      phone: ""
    },
    mode: "onChange"
  })

  // Watch form values
  const watchedBrandUsername = watch("brandUsername")
  const watchedSelectedBrandNiches = watch("selectedBrandNiches")

  const {data: companyTypesData} = useFetchApi<CompanyTypesData[]>({
    endpoint: "brand/company-types",
  })

  const {data: nichesData} = useFetchApi<NichesData>({
    endpoint: "auth/niches",
  })

  useEffect(() => {
    if (nichesData) {
      setBrandNiches(nichesData.niches)
    }
  }, [nichesData])

  useEffect(() => {
    if (companyTypesData) {
      setCompanyTypes(companyTypesData)
    }
  }, [companyTypesData])

  const brandNicheOptions = [
    { id: "fashion", name: "Fashion", icon: "👗" },
    { id: "movies", name: "Movies", icon: "🎬" },
    { id: "food", name: "Food", icon: "☕" },
    { id: "beauty", name: "Beauty", icon: "💄" },
    { id: "electronics", name: "Electronics", icon: "🔌" },
    { id: "pets", name: "Pets", icon: "🐾" },
    { id: "home-decor", name: "Home Décor", icon: "🏠" },
    { id: "automotive", name: "Automotive", icon: "🚗" },
    { id: "sports", name: "Sports", icon: "⚽" },
    { id: "fitness", name: "Fitness", icon: "🏋️" },
    { id: "travel", name: "Travel", icon: "✈️" },
    { id: "lifestyle", name: "Lifestyle", icon: "⭐" },
    { id: "accessories", name: "Accessories", icon: "👜" }
  ]

  const handleBrandNicheToggle = (nicheId: string) => {
    const currentNiches = watchedSelectedBrandNiches
    const newNiches = currentNiches.includes(nicheId) 
      ? currentNiches.filter(id => id !== nicheId)
      : [...currentNiches, nicheId]
    
    setValue("selectedBrandNiches", newNiches)
  }

   const {mutateAsync: checkUsername, isPending: checkUsernameLoading} = useMutationApi<userNameResponse>({
      endpoint: '/auth/check-username',
      method: 'POST',
      onSuccess: () => {
        setShowBrandLoader(false)
      },
    })

  // Brand profile completion API
  const {mutateAsync: completeProfile, isPending: completeProfileLoading} = useMutationApi<CompleteProfileResponse>({
    endpoint: 'auth/brand/complete-profile',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    onSuccess: () => {
      router.push('/brands')
    },
    onError: () => {
      console.error('Failed to complete brand profile')
    }
  })

  const handleBrandSuggestionClick = async (suggestion: string) => {
    setValue("brandUsername", suggestion)
    setSelectedBrandSuggestion(suggestion)
    setShowBrandApproved(false)
    setShowBrandLoader(true)
    
    // Clear any existing errors
    await trigger("brandUsername")
    
    // Show loader for 2 seconds then show approved message
    setTimeout(() => {
      setShowBrandLoader(false)
      setShowBrandApproved(true)
    }, 2000)
  }

  // Debounce effect for checking brand username availability
  useEffect(() => {
      if (watchedBrandUsername && !selectedBrandSuggestion) {
        const timer = setTimeout(async () => {
          const response = await checkUsername({ username: watchedBrandUsername })
          if(response?.available === true){
            setShowBrandApproved(true)
            setUsernameSuggestions([])
          } else {
            setShowBrandApproved(false)
            // Set suggestions from API response
            if(response?.suggestions && response.suggestions.length > 0) {
              setUsernameSuggestions(response.suggestions)
            }
          }
        }, 700)
        return () => clearTimeout(timer)
      }
    }, [watchedBrandUsername, selectedBrandSuggestion, checkUsername])

  const getProgressWidth = () => {
    return `${(currentStep / 7) * 100}%`
  }

  const handleBrandImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        setValue("brandProfileImage", imageData)
        // Trigger validation to clear errors
        await trigger("brandProfileImage")
      }
      reader.readAsDataURL(file)
    }
  }

  const openBrandFileDialog = () => {
    const fileInput = document.getElementById('brand-profile-image-input') as HTMLInputElement
    fileInput?.click()
  }

  // Document upload handlers
  const handleDocumentUpload = (documentType: 'incorporationDocument' | 'gstDocument' | 'panDocument') => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) {
        setValue(documentType, file)
        trigger(documentType)
      }
    }
  }

  const openDocumentDialog = (documentType: string) => {
    const fileInput = document.getElementById(`${documentType}-input`) as HTMLInputElement
    fileInput?.click()
  }

  const handleAddCustomNiche = () => {
    if (customNicheInput.trim()) {
      const customNicheId = customNicheInput.toLowerCase().replace(/\s+/g, '-')
      const currentNiches = watchedSelectedBrandNiches
      setValue("selectedBrandNiches", [...currentNiches, customNicheId])

      // Add to brandNicheOptions for future display
      brandNicheOptions.push({
        id: customNicheId,
        name: customNicheInput.trim(),
        icon: "🎯"
      })

      setCustomNicheInput("")
      setShowCustomNicheBottomSheet(false)
    }
  }

  // Form submission handlers for each step
  const onSubmitStep1 = async (data: BrandFormData) => {
    console.log("Step 1 form is valid, moving to next step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep2 = async (data: BrandFormData) => {
    console.log("Step 2 form is valid, moving to next step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep3 = async (data: BrandFormData) => {
    console.log("Step 3 form is valid, moving to next step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep4 = async (data: BrandFormData) => {
    console.log("Step 4 form is valid, moving to next step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSkipStep4 = () => {
    console.log("Skipping step 4, moving to next step without image")
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep5 = async (data: BrandFormData) => {
    console.log("Step 5 form is valid, moving to next step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep6Documents = async (data: BrandFormData) => {
    console.log("Step 6 documents valid, moving to final step:", data)
    setCurrentStep(prev => prev + 1)
  }

  const onSkipStep6Documents = () => {
    console.log("Skipping step 6 documents, moving to final step")
    setCurrentStep(prev => prev + 1)
  }

  const onSkipStep5 = () => {
    console.log("Skipping step 5, moving to next step without bio")
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep6 = async (data: BrandFormData) => {
    console.log("Final step - Brand signup data:", data)

    try {
      // Create FormData object for file uploads
      const formData = new FormData()

      // Add profile image if available
      if (data.brandProfileImage) {
        try {
          // Convert base64 to blob for profile image
          const profileImageBlob = await fetch(data.brandProfileImage).then(r => r.blob())
          formData.append('profileImage', profileImageBlob)
        } catch (error) {
          console.error('Error processing profile image:', error)
        }
      }

      // Add documents
      if (data.incorporationDocument) {
        formData.append('incorporationDocument', data.incorporationDocument)
      }
      if (data.gstDocument) {
        formData.append('gstDocument', data.gstDocument)
      }
      if (data.panDocument) {
        formData.append('panDocument', data.panDocument)
      }

      // Add required form fields according to API specification
      formData.append('phone', data.brandPocContact) // Using POC contact as phone (Indian mobile number)
      formData.append('brandName', data.brandName)
      formData.append('username', data.brandUsername)
      formData.append('legalEntityName', data.legalEntityName)
      formData.append('companyType', data.brandType)
      formData.append('pocName', data.brandPocName)
      formData.append('pocDesignation', data.brandPocDesignation)
      formData.append('pocEmailId', data.brandPocEmail)
      formData.append('pocContactNumber', data.brandPocContact)

      // Optional fields
      if (data.brandBio) {
        formData.append('brandBio', data.brandBio)
      }

      // Convert selected niches to JSON string format as specified in API
      if (data.selectedBrandNiches && data.selectedBrandNiches.length > 0) {
        formData.append('nicheIds', JSON.stringify(data.selectedBrandNiches))
      }

      const response = await completeProfile(formData as unknown as DynamicMutationPayload)
      if(response.success){
        router.push('/brands')
      }
      console.log('Brand profile completed successfully:', response)

      // You can add navigation to success page or dashboard here
      // window.location.href = '/brands/dashboard' or use Next.js router

    } catch (error) {
      console.error('Error completing profile:', error)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  if (currentStep === 7) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
       <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(7/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Niche Selection Section */}
        <form className="flex-1 flex flex-col mt-8" onSubmit={handleSubmit(onSubmitStep6)}>
        <div className='flex items-center justify-between mb-6'>
          <h2 className="font-bold text-black">
            What&apos;s Your Brand Niche?
          </h2>
          <button
            type="button"
            onClick={() => setShowCustomNicheBottomSheet(true)}
            className='text-theme-primary flex items-center gap-x-1'
          >
            <Plus size={14}/>
            <span className='text-sm font-bold'>Add custom</span>
          </button>
        </div>
          
          {/* Hidden input for validation */}
          <input
            type="hidden"
            {...register("selectedBrandNiches", {
              validate: (value) => value.length > 0 || "Please select at least one niche"
            })}
          />
          
          {/* Niche Options Grid */}
          <div className="flex-1 pb-40">
            <div className="flex flex-wrap gap-3">
              {brandNiches?.map((niche) => (
                <button
                  key={niche.id}
                  type="button"
                  onClick={() => handleBrandNicheToggle(niche.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-colors ${
                    watchedSelectedBrandNiches.includes(niche.id)
                      ? "bg-theme-blue text-white"
                      : watchedSelectedBrandNiches.length >= 5
                      ? "border border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                      : "border border-gray-300 text-black hover:border-gray-400"
                  }`}
                  disabled={watchedSelectedBrandNiches.length >= 5}
                >
                  {/* <span className="text-lg">{niche.icon}</span> */}
                  <span className='font-bold'>{niche.name}</span>
                </button>
              ))}
            </div>
            
            {errors.selectedBrandNiches && (
              <p className="text-red-500 text-sm mt-4">{errors.selectedBrandNiches.message}</p>
            )}
          </div>

          {/* Selection Counter and Continue Button */}
          <div className="fixed bottom-6 bg-white w-full left-0 px-4 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className={`font-semibold ${
                watchedSelectedBrandNiches.length >= 5 ? 'text-red-600' : 'text-gray-600'
              }`}>
              Selected {`(${watchedSelectedBrandNiches.length}/5)`}
              </span>
            </div>
            <ArrowFilledButton
              text={completeProfileLoading ? "Setting Up Profile..." : "Set Up Your Brand Profile"}
              textCenter={true}
              onClick={handleSubmit(onSubmitStep6)}
              disabled={completeProfileLoading || watchedSelectedBrandNiches.length < 1}
            />
          </div>
        </form>
        </div>

        {/* Custom Niche Bottom Sheet */}
        <BottomSheet
          isOpen={showCustomNicheBottomSheet}
          onClose={() => setShowCustomNicheBottomSheet(false)}
          bottomSheetMaximumHeight={400}
        >
          <div className="px-6 pb-6">
            <h2 className="text-xl font-bold text-black mb-6">
              Add Custom Niche
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Political"
                value={customNicheInput}
                onChange={(e) => setCustomNicheInput(e.target.value)}
                className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
              />

              <button
                onClick={handleAddCustomNiche}
                className="w-full bg-theme-blue text-white py-4 rounded-2xl font-bold text-center"
              >
                Add
              </button>
            </div>
          </div>
        </BottomSheet>
      </div>
    )
  }

  if (currentStep === 6) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(6/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Document Upload Section */}
        <form className="flex-1 flex flex-col mt-8" onSubmit={handleSubmit(onSubmitStep6Documents)}>
          <div className="flex-1 space-y-6">
            {/* Incorporation Document */}
            <div className="space-y-3">
              <h3 className="font-bold text-black">
                Company Incorporation Number Document
              </h3>
              <div className="border-2 border-[#E4E4E4] rounded-full py-5">
                <button
                  type="button"
                  onClick={() => openDocumentDialog('incorporationDocument')}
                  className="w-full flex items-center gap-x-3 px-6"
                >
                  <Image src="/images/icons/upload-icon.svg" alt="upload-icon" height={24} width={24}/>
                  <p className="text-[#999] text-start">
                    {watch("incorporationDocument")?.name || "Upload Documents"}
                  </p>
                </button>
                <input
                  id="incorporationDocument-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload('incorporationDocument')}
                  className="hidden"
                />
              </div>
            </div>

            {/* GST Document */}
            <div className="space-y-3">
              <h3 className="font-bold text-black">
                Company GST Document
              </h3>
              <div className="border-2 border-[#E4E4E4] rounded-full py-5">
                <button
                  type="button"
                  onClick={() => openDocumentDialog('gstDocument')}
                  className="w-full flex items-center gap-x-3 px-6"
                >
                  <Image src="/images/icons/upload-icon.svg" alt="upload-icon" height={24} width={24}/>
                  <p className="text-[#999] text-start">
                    {watch("gstDocument")?.name || "Click to upload GST document"}
                  </p>
                </button>
                <input
                  id="gstDocument-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload('gstDocument')}
                  className="hidden"
                />
              </div>
            </div>

            {/* PAN Document */}
            <div className="space-y-3">
              <h3 className="font-bold text-black">
                PAN Detail
              </h3>
              <div className="border-2 border-[#E4E4E4] rounded-full py-5">
                <button
                  type="button"
                  onClick={() => openDocumentDialog('panDocument')}
                  className="w-full flex items-center gap-x-3 px-6"
                >
                  <Image src="/images/icons/upload-icon.svg" alt="upload-icon" height={24} width={24}/>
                  <p className="text-[#999] text-start">
                    {watch("panDocument")?.name || "Click to upload PAN document"}
                  </p>
                </button>
                <input
                  id="panDocument-input"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleDocumentUpload('panDocument')}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Skip and Continue buttons */}
          <div className="fixed left-0 w-full px-4 bottom-6 space-y-4">
            <button
              type="button"
              onClick={onSkipStep6Documents}
              className="text-center font-semibold text-black w-full"
            >
              Skip This Step
            </button>
            <ArrowFilledButton
              text="Continue"
              textCenter={true}
              onClick={handleSubmit(onSubmitStep6Documents)}
            />
          </div>
        </form>
        </div>
      </div>
    )
  }

  if (currentStep === 5) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(5/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Bio Section */}
        <form className="flex-1 flex flex-col mt-8" onSubmit={handleSubmit(onSubmitStep5)}>
          <h2 className="font-bold text-black mb-3">
            Tell Us About The Brand
          </h2>

          {/* Bio Text Area */}
          <div className="flex-1">
            <textarea
              placeholder="Add Bio"
              {...register("brandBio", {
                required: "Please add a bio to continue"
              })}
              onChange={async (e) => {
                const value = e.target.value
                setValue("brandBio", value)
                // Trigger validation to clear errors
                if (value) {
                  await trigger("brandBio")
                }
              }}
              className={`w-full h-48 p-4 border rounded-2xl text-black placeholder:text-[#999] focus:outline-none resize-none ${
                errors.brandBio ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
              rows={8}
            />
            {errors.brandBio && (
              <p className="text-red-500 text-sm mt-3">{errors.brandBio.message}</p>
            )}
          </div>

          {/* Skip and Continue buttons */}
          <div className="fixed bottom-6 w-full px-4 left-0 space-y-4">
            <button
              type="button"
              onClick={onSkipStep5}
              className="text-center font-medium text-gray-700 w-full"
            >
              Skip This Step
            </button>
            <ArrowFilledButton
              text="Continue"
              textCenter={true}
              onClick={handleSubmit(onSubmitStep5)}
            />
          </div>
        </form>
        </div>
      </div>
    )
  }

  if (currentStep === 4) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(4/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Profile Image Section */}
        <form className="flex-1 flex flex-col items-center justify-start mt-9" onSubmit={handleSubmit(onSubmitStep4)}>
          <h2 className="font-bold text-black mb-5 text-center">
            Add Brand&apos;s Profile Image
          </h2>

          {/* Profile Avatar */}
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden relative">
              {watch("brandProfileImage") ? (
                <Image src={watch("brandProfileImage") || ""} alt="Brand Profile" fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-gradient-to-b from-purple-300 to-purple-400 flex items-center justify-center">
                  {/* Default avatar illustration */}
                  <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center">
                    <div className="text-4xl">👤</div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Edit button */}
            <button 
              type="button"
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border"
              onClick={openBrandFileDialog}
            >
              <Edit size={20}/>
            </button>
            
            {/* Hidden file input */}
            <input
              id="brand-profile-image-input"
              type="file"
              accept="image/*"
              onChange={handleBrandImageUpload}
              className="hidden"
            />

            {/* Hidden input for validation */}
            <input
              type="hidden"
              {...register("brandProfileImage", {
                required: "Please select a brand profile image"
              })}
            />
            
            {errors.brandProfileImage && (
              <p className="text-red-500 text-sm mt-3 text-center">{errors.brandProfileImage.message}</p>
            )}
          </div>

          {/* Skip and Continue buttons */}
          <div className="fixed bottom-6 space-y-4 w-full px-4">
            <button
              type="button"
              onClick={onSkipStep4}
              className="text-center font-medium text-gray-700 w-full"
            >
              Skip This Step
            </button>
            <ArrowFilledButton 
              text="Continue" 
              textCenter={true}
              onClick={handleSubmit(onSubmitStep4)}
            />
          </div>
        </form>
        </div>
      </div>
    )
  }

  if (currentStep === 3) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(3/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <form className="flex-1 flex-col mt-8 pb-28" onSubmit={handleSubmit(onSubmitStep3)}>
          {/* Brand POC Name Section */}
          <div className="">
            <h2 className="font-bold text-black">
              Brand POC Name
            </h2>
            <input
              type="text"
              placeholder="Enter Full Name"
              {...register("brandPocName", {
                required: "POC name is required",
                minLength: {
                  value: 2,
                  message: "POC name must be at least 2 characters"
                }
              })}
              className={`w-full border mt-3 rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none ${
                errors.brandPocName ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.brandPocName && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandPocName.message}</p>
            )}
          </div>

          {/* Brand POC Designation Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black">
              Brand POC Designation
            </h2>
            <input
              type="text"
              placeholder="e.g. Marketing Manager"
              {...register("brandPocDesignation", {
                required: "POC designation is required"
              })}
              className={`w-full border mt-3 rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none ${
                errors.brandPocDesignation ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.brandPocDesignation && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandPocDesignation.message}</p>
            )}
          </div>

          {/* Brand POC Email Id Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black">
              Brand POC Email Id
            </h2>
            <input
              type="email"
              placeholder="poc@company.com"
              {...register("brandPocEmail", {
                required: "POC email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address"
                }
              })}
              className={`w-full border mt-3 rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none ${
                errors.brandPocEmail ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.brandPocEmail && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandPocEmail.message}</p>
            )}
          </div>

          {/* Brand POC Contact Number Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black">
              Brand POC Contact Number
            </h2>
            <input
              type="tel"
              placeholder="Enter phone number"
              {...register("brandPocContact", {
                required: "POC contact number is required",
                pattern: {
                  value: /^[+]?[1-9][\d]{0,15}$/,
                  message: "Invalid phone number"
                }
              })}
              className={`w-full border mt-3 rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none ${
                errors.brandPocContact ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.brandPocContact && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandPocContact.message}</p>
            )}
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-6 w-full left-0 px-4 pt-8">
            <ArrowFilledButton 
              text="Continue" 
              textCenter={true}
              onClick={handleSubmit(onSubmitStep3)}
            />
          </div>
        </form>
        </div>
      </div>
    )
  }

  if (currentStep === 2) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
          {/* Header with progress */}
          <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer">
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(2/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <form className="flex-1 flex-col mt-8" onSubmit={handleSubmit(onSubmitStep2)}>
          {/* Legal Entity Name Section */}
          <div className="">
            <h2 className="font-bold text-black">
              What&apos;s your Legal Entity Name?
            </h2>
            <input
              type="text"
              placeholder="Enter Legal Entity Name*"
              {...register("legalEntityName", {
                required: "Legal entity name is required",
                minLength: {
                  value: 2,
                  message: "Legal entity name must be at least 2 characters"
                }
              })}
              className={`w-full border rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none mt-3 ${
                errors.legalEntityName ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.legalEntityName && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.legalEntityName.message}</p>
            )}
          </div>

          {/* Brand Type Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black">
              What Type of Brand is this?
            </h2>
            <div className="relative">
              <select
                {...register("brandType", {
                  required: "Please select a brand type"
                })}
                className={`w-full border rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none mt-3 bg-transparent appearance-none ${
                  errors.brandType ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
                }`}
              >
                <option value="" disabled className="text-[#999]">
                  Eg. Private Limited Company (Pvt. Ltd.)*
                </option>
                {companyTypes.map((option, index) => (
                  <option key={index} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown 
                size={20} 
                className="absolute right-4 top-1/2 transform -translate-y-1/4 text-black pointer-events-none"
              />
            </div>
            {errors.brandType && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandType.message}</p>
            )}
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-6 w-full left-0 px-4 pt-8">
            <ArrowFilledButton 
              text="Continue" 
              textCenter={true}
              onClick={handleSubmit(onSubmitStep2)}
            />
          </div>
        </form>
        </div>
      </div>
    )
  }

  // Step 1 - Default step
  return (
    <div className="sm:flex h-screen items-center justify-center flex-col pb-4">
      <div className="logo md:block hidden">
        <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
      </div>
      <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={handleBack} className="cursor-pointer" disabled={currentStep === 1}>
                <ChevronLeft className={currentStep === 1 ? 'opacity-50' : ''}/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(1/7)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <form className="flex-1 flex-col mt-8" onSubmit={handleSubmit(onSubmitStep1)}>
          {/* Brand Name Section */}
          <div className="">
            <h2 className="font-bold text-black">
              What&apos;s your Brand Name?
            </h2>
            <input
              type="text"
              placeholder="Enter Brand Name*"
              {...register("brandName", {
                required: "Brand name is required",
                minLength: {
                  value: 2,
                  message: "Brand name must be at least 2 characters"
                }
              })}
              className={`w-full border rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none mt-3 ${
                errors.brandName ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:ring-theme-primary'
              }`}
            />
            {errors.brandName && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandName.message}</p>
            )}
          </div>

          {/* Brand Username Section */}
          <div className="mt-8">
            <h2 className="font-bold text-black">
              Setup Brand Username
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Brand Username*"
                {...register("brandUsername", {
                  required: "Brand username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters"
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_]+$/,
                    message: "Username can only contain letters, numbers, and underscores"
                  }
                })}
                onChange={(e) => {
                  const value = e.target.value
                  setValue("brandUsername", value)
                  // Clear selection if user manually types
                  if (value !== selectedBrandSuggestion) {
                    setSelectedBrandSuggestion("")
                    setShowBrandLoader(false)
                    setShowBrandApproved(false)
                  }
                }}
                className={`w-full border rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none mt-3 ${
                  errors.brandUsername ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:ring-theme-primary'
                }`}
              />
              {checkUsernameLoading && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-theme-primary"></div>
                </div>
              )}
            </div>
            {errors.brandUsername && (
              <p className="text-red-500 mt-0.5 text-sm">{errors.brandUsername.message}</p>
            )}
          </div>

          {/* Status Section */}
          <div className="status mt-3">
            {checkUsernameLoading ? (
              <p className="text-sm font-bold text-center text-gray-500">
                Checking availability...
              </p>
            ) : showBrandApproved ? (
              <p className="text-sm font-bold text-center" style={{color: '#27C840'}}>
                New username approved
              </p>
            ) : (
              usernameSuggestions.length > 0 && watchedBrandUsername && (
                <p className="text-sm text-[#FF5F57] font-bold text-center">
                  This Username Already taken
                </p>
              )
            )}
          </div>

          {/* Show suggestions only when username is taken */}
          {usernameSuggestions.length > 0 && !showBrandLoader && !showBrandApproved && (
            <>
              <div className='flex items-center gap-x-4 justify-center mt-8'>
                <hr className='border border-[#999] w-8'/>
                <p className='font-bold text-[#999]'>You can choose from these too</p>
                <hr className='border border-[#999] w-8'/>
              </div>

              <div className='flex items-center flex-wrap gap-2 mt-4 mb-4'>
                {usernameSuggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    onClick={() => handleBrandSuggestionClick(suggestion)}
                    className={`border rounded-full px-4 py-2 cursor-pointer transition-all ${
                      selectedBrandSuggestion === suggestion
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-black/20 hover:border-black/40'
                    }`}
                  >
                    <span className='font-bold'>{suggestion}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Continue Button */}
          <div className="fixed bottom-6 w-full left-0 px-4">
            <ArrowFilledButton 
              text="Continue" 
              textCenter={true}
              onClick={handleSubmit(onSubmitStep1)}
              disabled={!showBrandApproved}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BrandsProfilePage