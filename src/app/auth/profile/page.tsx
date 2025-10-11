"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import BottomSheet from '@/components/bottomsheets/BottomSheet'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import { Modal } from '@/components/ui/modal'
import useFetchApi from '@/hooks/useFetchApi'
import { useModal } from '@/hooks/useModal'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import { ArrowLeft, ChevronLeft, Edit, Mars, Plus, Venus, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

interface usernameResponse {
  message: string,
  available: boolean,
  suggestions: string[]
}

interface SignupResponse {
  success: boolean
  message: string
  accessToken: string
  user?: {
    id: number
    name: string
    username: string
  }
}

interface GenderOptionsData {
  message: string;
  othersGenderOptions: string[];
}

interface InfluencerFormData {
  fullName: string
  username: string
  birthdate: {
    year: string
    month: string
    day: string
  }
  gender: string
  profileImage?: string
  bio?: string
  niche?: number[]
}

interface Niche {
  id: number
  name: string
  icon: string
  description: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

interface NicheApiResponse {
  message: string
  niches: Niche[]
}

const ProfilePage = () => {
  const [formData, setformData] = useState({
    fullName: "",
    username: "",
    birthdate: {
      day: "",
      month: "",
      year: ""
    },
    gender: "",
    profileImage: "",
    bio: "",
    niche: [] as number[]
  })

  const {data: genderData} = useFetchApi<GenderOptionsData>({
    endpoint: 'auth/gender-options',
  })

  const {data: nicheData} = useFetchApi<NicheApiResponse>({
    endpoint: 'auth/niches',
  })

  const [selectedSuggestion, setSelectedSuggestion] = useState("")
  const [showLoader, setShowLoader] = useState(false)
  const [showApproved, setShowApproved] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showGenderBottomSheet, setShowGenderBottomSheet] = useState(false)
  const [selectedAdditionalGender, setSelectedAdditionalGender] = useState("")
  const [showSelectedGenderOnly, setShowSelectedGenderOnly] = useState(false)
  const [showCustomNicheBottomSheet, setShowCustomNicheBottomSheet] = useState(false)
  const [customNicheInput, setCustomNicheInput] = useState("")
  const [otherGenderOptions, setOtherGenderOptions] = useState<string[]>([])
  const modalOpen = useModal();
  const router = useRouter();
  const [nicheOptions, setNicheOptions] = useState<Niche[]>([])
  const {verificationKey, setVerificationKey, setAccessToken} = useAuthContext();
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])

  const additionalGenderOptions = [
    "Abinary",
    "Trans-Women", 
    "Gay",
    "Binary",
    "Trans-Feminine"
  ]

  const {mutateAsync: signup, isPending: signupLoading} = useMutationApi<SignupResponse>({
    endpoint: 'auth/influencer/signup',
    method: 'POST',
    options: {
      headers: {
        "x-verification-key": verificationKey
      }
    },
    onSuccess: () => {
      setVerificationKey("")
    }
  })

  // handling the formData
  const {handleSubmit, register, formState: {errors}, trigger, setValue, watch} = useForm<InfluencerFormData>({
    defaultValues: {
      fullName: "",
      username: "",
      birthdate: {
        day: "",
        month: "",
        year: ""
      },
      gender: "",
      profileImage: "",
      bio: "",
      niche: []
    },
    mode: "onChange"
  })

  // Watch form values to sync with formData
  const watchedFullName = watch("fullName")
  const watchedUsername = watch("username")
  const watchedBirthdate = watch("birthdate")
  const watchedGender = watch("gender")
  const watchedProfileImage = watch("profileImage")
  const watchedBio = watch("bio")

  useEffect(() => {
    if (genderData) {
      setOtherGenderOptions(genderData?.othersGenderOptions)
    }
  }, [genderData])

  useEffect(() => {
    if(nicheData){
      setNicheOptions(nicheData?.niches || [])
    }
  }, [nicheData])

  console.log(nicheData);

  // Sync watched values with formData
  useEffect(() => {
    setformData(prev => ({ ...prev, fullName: watchedFullName || "" }))
  }, [watchedFullName])

  useEffect(() => {
    setformData(prev => ({ ...prev, username: watchedUsername || "" }))
  }, [watchedUsername])

  useEffect(() => {
    setformData(prev => ({ ...prev, birthdate: watchedBirthdate || "" }))
  }, [watchedBirthdate])

  useEffect(() => {
    setformData(prev => ({ ...prev, gender: watchedGender || "" }))
  }, [watchedGender])

  useEffect(() => {
    setformData(prev => ({ ...prev, profileImage: watchedProfileImage || "" }))
  }, [watchedProfileImage])

  useEffect(() => {
    setformData(prev => ({ ...prev, bio: watchedBio || "" }))
  }, [watchedBio])

  // check username
  const {mutateAsync: checkUsername, isPending: checkUsernameLoading} = useMutationApi<usernameResponse>({
    endpoint: '/auth/check-username',
    method: 'POST',
    onSuccess: () => {
      setShowLoader(false)
    },
  })


  const handleOthersClick = () => {
    setShowGenderBottomSheet(true)
  }

  const handleGenderSelection = async (selectedGender: string) => {
    setSelectedAdditionalGender(selectedGender)
    setformData(prev => ({ ...prev, gender: "others" }))
    setValue("gender", "others")
    // Trigger validation to clear errors
    await trigger("gender")
  }

  const handleGenderContinue = () => {
    setShowGenderBottomSheet(false)
    if (selectedAdditionalGender) {
      setShowSelectedGenderOnly(true)
    }
  }

  const handleNicheToggle = (nicheId: number) => {
    setformData(prev => ({
      ...prev,
      niche: prev.niche.includes(nicheId)
        ? prev.niche.filter(id => id !== nicheId)
        : [...prev.niche, nicheId]
    }))
  }

  const handleAddCustomNiche = () => {
    if (customNicheInput.trim()) {
      // Generate a temporary negative ID for custom niches to avoid conflicts with API IDs
      const customNicheId = -(Date.now())
      setformData(prev => ({ ...prev, niche: [...prev.niche, customNicheId] }))

      // Add to nicheOptions for future display
      const customNiche: Niche = {
        id: customNicheId,
        name: customNicheInput.trim(),
        icon: "🎯", // Default icon for custom niches
        description: `Custom niche: ${customNicheInput.trim()}`,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      setNicheOptions(prev => [...prev, customNiche])

      setCustomNicheInput("")
      setShowCustomNicheBottomSheet(false)
    }
  }

  const handleRemoveSelectedGender = () => {
    setShowSelectedGenderOnly(false)
    setformData(prev => ({ ...prev, gender: "" }))
    setValue("gender", "")
    setSelectedAdditionalGender("")
  }

  const handleSuggestionClick = async (suggestion: string) => {
    setValue("username", suggestion)
    setSelectedSuggestion(suggestion)
    setShowApproved(false)
    setShowLoader(true)
    
    // Clear any existing errors
    await trigger("username")
    
    // Show loader for 2 seconds then show approved message
    setTimeout(() => {
      setShowLoader(false)
      setShowApproved(true)
    }, 2000)
  }

  // Debounce effect for checking username availability
  useEffect(() => {
        if (formData.username && !selectedSuggestion) {
          const timer = setTimeout(async () => {
            const response = await checkUsername({ username: formData.username })
            if(response?.available === true){
              setShowApproved(true)
              setUsernameSuggestions([])
            } else {
              setShowApproved(false)
              // Set suggestions from API response
              if(response?.suggestions && response.suggestions.length > 0) {
                setUsernameSuggestions(response.suggestions)
              }
            }
          }, 700)
          return () => clearTimeout(timer)
        }
      }, [formData.username, selectedSuggestion, checkUsername])

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const onSubmitStep1 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep2 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep3 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onSkipStep3 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onSubmitStep4 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const onSkipStep4 = () => {
    setCurrentStep(prev => prev + 1)
  }

  const handleSignup = async () => {
    try {
      // Format the birthdate as YYYY-MM-DD
      const formattedDateOfBirth = `${formData.birthdate.year}-${formData.birthdate.month.padStart(2, '0')}-${formData.birthdate.day.padStart(2, '0')}`

      const formDataPayload = new FormData()
      formDataPayload.append('name', formData.fullName)
      formDataPayload.append('username', formData.username)
      formDataPayload.append('dateOfBirth', formattedDateOfBirth)
      formDataPayload.append('gender', formData.gender)

      // Add profile image if available
      if (formData.profileImage) {
        try {
          // Convert base64 to blob for profile image
          const profileImageBlob = await fetch(formData.profileImage).then(r => r.blob())
          formDataPayload.append('profileImage', profileImageBlob)
        } catch (error) {
          console.error('Error processing profile image:', error)
        }
      }

      // Add bio if available
      if (formData.bio) {
        formDataPayload.append('bio', formData.bio)
      }

      // Add nicheIds as JSON string
      formDataPayload.append('nicheIds', JSON.stringify(formData.niche.filter(id => id > 0)))

      console.log("Submitting signup data...")
      const response = await signup(formDataPayload as unknown as DynamicMutationPayload)
      setAccessToken(response?.accessToken, 'influencer');

      // Navigate to influencers page after successful signup
      router.push("/influencers")
    } catch (error) {
      console.error("Signup failed:", error)
      // Handle error - you might want to show an error message to the user
    }
  }

  const getProgressWidth = () => {
    return `${(currentStep / 5) * 100}%`
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (e) => {
        const imageData = e.target?.result as string
        setformData(prev => ({ ...prev, profileImage: imageData }))
        setValue("profileImage", imageData)
        // Trigger validation to clear errors
        await trigger("profileImage")
      }
      reader.readAsDataURL(file)
    }
  }

  const openFileDialog = () => {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement
    fileInput?.click()
  }

  const renderMainContent = () => {
    if (currentStep === 5) {
      return (
      <div className="sm:flex items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4 pb-24">
          {/* Header with progress */}
          <div className="">
        <div className='text-[#090A0A] flex items-center justify-between'>
            <div className='flex items-center gap-x-3 font-bold'>
              <button type="button" onClick={goBack}>
                <ChevronLeft/>
              </button>
              <span>Setup Profile</span>
            </div>
            <span className='font-bold'>{"(5/5)"}</span>
          </div>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

          {/* Niche Selection Section */}
          <div className="sm:flex-1 flex flex-col mt-8">
            <div className="sm:text-center space-y-6 w-full">
              <div className='flex items-center justify-between'>
                <h2 className="text-xl font-bold text-black">
                  {"What's Your Niche?"}
                </h2>
                <button 
                  onClick={() => setShowCustomNicheBottomSheet(true)} 
                  className='flex items-center gap-x-1 text-theme-primary'
                >
                  <Plus/>
                  <span>Add Custom</span>
                </button>
              </div>
              
              {/* Niche Options Grid */}
              <div className="w-full pb-20">
                <div className="flex flex-wrap gap-3 sm:justify-center">
                  {nicheOptions?.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => handleNicheToggle(niche.id)}
                      disabled={
                        !formData.niche.includes(niche.id) && 
                        formData.niche.length >= 5
                      }
                      className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-colors ${
                        formData.niche.includes(niche.id)
                          ? "bg-theme-blue text-white"
                          : formData.niche.length >= 5
                          ? "border border-gray-200 text-gray-400 cursor-not-allowed opacity-50"
                          : "border border-gray-300 text-black hover:border-gray-400"
                      }`}
                    >
                      <span className="text-lg">{niche.icon}</span>
                      <span className='font-bold'>{niche.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>


          {/* Continue Button */}
          <div className="fixed bottom-6 w-full left-0 px-4">
            {/* Selection Counter */}
            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className={`font-semibold ${
                formData.niche.length >= 5 ? 'text-red-600' : 'text-gray-600'
              }`}>
              Selected {`(${formData.niche.length}/5)`}
              </span>
            </div>
            <ArrowFilledButton
              text={signupLoading ? "Setting Up..." : "Set Up Your Profile"}
              textCenter={true}
              onClick={handleSignup}
              disabled={signupLoading || formData.niche.length < 1}
            />
          </div>
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
        <div className="w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4 pb-24">
          {/* Header with progress */}
          <div className="">
            <div className='text-[#090A0A] flex items-center justify-between'>
              <div className='flex items-center gap-x-3 font-bold'>
                <button type="button" onClick={goBack}>
                  <ChevronLeft/>
                </button>
                <span>Setup Profile</span>
              </div>
              <span className='font-bold'>{"(4/5)"}</span>
            </div>
            <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
              <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
            </div>
          </div>

          {/* Bio Section */}
          <form className="flex-1 flex flex-col items-center mt-8" onSubmit={handleSubmit(onSubmitStep4)}>
            <div className="sm:text-center space-y-6 w-full">
              <h2 className="text-xl font-bold text-black">
                Tell Us About Your Self
              </h2>

              {/* Bio Text Area */}
              <div className="w-full">
                <textarea
                  placeholder="Add Bio"
                  {...register("bio", {
                    required: "Please add a bio to continue"
                  })}
                  onChange={async (e) => {
                    const value = e.target.value
                    setformData(prev => ({ ...prev, bio: value }))
                    setValue("bio", value)
                    // Trigger validation to clear errors
                    if (value) {
                      await trigger("bio")
                    }
                  }}
                  className={`w-full h-48 p-4 border rounded-2xl text-black placeholder:text-[#999] focus:outline-none resize-none ${
                    errors.bio ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-theme-blue'
                  }`}
                  rows={8}
                />
                {errors.bio && (
                  <p className="text-red-500 text-sm mt-3">{errors.bio.message}</p>
                )}
              </div>
            </div>
          </form>

          {/* Skip and Continue buttons */}
          <div className="fixed bottom-6 w-full left-0 px-4">
            <button
              type="button"
              onClick={onSkipStep4}
              className="text-center font-medium text-gray-700 mb-5 w-full"
            >
              Skip This Step
            </button>
            <ArrowFilledButton
              text="Continue"
              textCenter={true}
              onClick={handleSubmit(onSubmitStep4)}
            />
          </div>
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
        <div className="w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4 pb-24">
          {/* Header with progress */}
          <div className="">
                    <div className='text-[#090A0A] flex items-center justify-between'>
                      <div className='flex items-center gap-x-3 font-bold'>
                        <button type="button" onClick={goBack}>
                          <ChevronLeft/>
                        </button>
                        <span>Setup Profile</span>
                      </div>
                      <span className='font-bold'>{"(3/5)"}</span>
                    </div>
                    <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
                      <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
                    </div>
                  </div>

          {/* Profile Image Section */}
          <form className="flex-1 flex flex-col items-center mt-8" onSubmit={handleSubmit(onSubmitStep3)}>
            <div className="text-center space-y-5">
              <h2 className="font-bold text-black">
                Add Profile Image
              </h2>
              
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 relative rounded-full border border-[#E4E4E4] flex items-center justify-center overflow-hidden">
                  {formData.profileImage ? (
                    <Image src={formData.profileImage} alt="Profile" fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Image src="/images/user/influencer.svg" alt="Profile" fill className="object-cover" />
                    </div>
                  )}
                </div>
                
                {/* Edit button */}
                <button
                  type="button"
                  className="absolute bottom-0 right-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border"
                  onClick={openFileDialog}
                >
                  <Edit size={20}/>
                </button>
                
                {/* Hidden file input */}
                <input
                  id="profile-image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Hidden input for validation */}
                <input
                  type="hidden"
                  {...register("profileImage", {
                    required: "Please select a profile image"
                  })}
                />
                {errors.profileImage && (
                  <p className="text-red-500 text-sm mt-3 absolute text-nowrap w-full right-5">{errors.profileImage.message}</p>
                )}
              </div>
            </div>
          </form>

          {/* Skip and Continue buttons */}
          <div className="fixed bottom-6 w-full left-0 px-4">
            <button
              type="button"
              onClick={onSkipStep3}
              className="text-center font-medium text-gray-700 mb-5 w-full"
            >
              Skip This Step
            </button>
            <ArrowFilledButton
              text="Continue"
              textCenter={true}
              onClick={handleSubmit(onSubmitStep3)}
            />
          </div>
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
        <div className="border w-full md:border md:border-[#E4E4E4] rounded-3xl h-full flex flex-col px-4 py-8 mt-4 pb-24">
        {/* Header with progress */}
        <div className="">
                  <div className='text-[#090A0A] flex items-center justify-between'>
                    <div className='flex items-center gap-x-3 font-bold'>
                      <button type="button" onClick={goBack}>
                        <ChevronLeft/>
                      </button>
                      <span>Setup Profile</span>
                    </div>
                    <span className='font-bold'>{"(2/5)"}</span>
                  </div>
                  <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
                    <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
                  </div>
                </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit(onSubmitStep2)}>
          <div className="flex-1 flex-col mt-8">
            {/* Birthday Section */}
            <div className="space-y-3">
              <h2 className="font-bold text-black">
                When&apos;s your Birthday?
              </h2>
              <div className="flex gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="DD"
                    {...register("birthdate.day", {
                      required: "Day is required",
                      pattern: {
                        value: /^(0?[1-9]|[12][0-9]|3[01])$/,
                        message: "Enter valid day (1-31)"
                      },
                      maxLength: {
                        value: 2,
                        message: "Day should be max 2 digits"
                      }
                    })}
                    onChange={async (e) => {
                      const value = e.target.value
                      setValue("birthdate.day", value)
                      // Trigger validation to clear errors
                      if (value) {
                        await trigger("birthdate.day")
                      }
                    }}
                    maxLength={2}
                    className={`w-16 border rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none ${
                      errors.birthdate?.day ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-theme-blue'
                    }`}
                  />
                  {errors.birthdate?.day && (
                    <p className="text-red-500 text-xs mt-1 text-center">{errors.birthdate?.day.message}</p>
                  )}
                </div>
                <span className="flex items-center text-xl text-gray-400">/</span>
                <div>
                  <input
                    type="text"
                    placeholder="MM"
                    {...register("birthdate.month", {
                      required: "Month is required",
                      pattern: {
                        value: /^(0?[1-9]|1[0-2])$/,
                        message: "Enter valid month (1-12)"
                      },
                      maxLength: {
                        value: 2,
                        message: "Month should be max 2 digits"
                      }
                    })}
                    onChange={async (e) => {
                      const value = e.target.value
                      setValue("birthdate.month", value)
                      // Trigger validation to clear errors
                      if (value) {
                        await trigger("birthdate.month")
                      }
                    }}
                    maxLength={2}
                    className={`w-16 border rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none ${
                      errors.birthdate?.month ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-theme-blue'
                    }`}
                  />
                  {errors.birthdate?.month && (
                    <p className="text-red-500 text-xs mt-1 text-center">{errors.birthdate?.month.message}</p>
                  )}
                </div>
                <span className="flex items-center text-xl text-gray-400">/</span>
                <div>
                  <input
                    type="text"
                    placeholder="YYYY"
                    {...register("birthdate.year", {
                      required: "Year is required",
                      pattern: {
                        value: /^(19|20)\d{2}$/,
                        message: "Enter valid year (1900-2099)"
                      },
                      validate: {
                        notFuture: (value) => {
                          const currentYear = new Date().getFullYear()
                          const year = parseInt(value)
                          return year <= currentYear || "Year cannot be in the future"
                        },
                        minimumAge: (value) => {
                          const currentYear = new Date().getFullYear()
                          const year = parseInt(value)
                          return (currentYear - year) >= 13 || "Must be at least 13 years old"
                        }
                      }
                    })}
                    onChange={async (e) => {
                      const value = e.target.value
                      setValue("birthdate.year", value)
                      // Trigger validation to clear errors
                      if (value) {
                        await trigger("birthdate.year")
                      }
                    }}
                    maxLength={4}
                    className={`w-20 border rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none ${
                      errors.birthdate?.year ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-theme-blue'
                    }`}
                  />
                  {errors.birthdate?.year && (
                    <p className="text-red-500 text-xs mt-1 text-center">{errors.birthdate?.year.message}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Gender Section */}
            <div className="space-y-3 mt-8">
              <h2 className="font-bold text-black">
                Who Are You?
              </h2>
              {/* Hidden input for gender validation */}
              <input
                type="hidden"
                {...register("gender", {
                  required: "Please select your gender"
                })}
              />
              {showSelectedGenderOnly && selectedAdditionalGender ? (
                /* Selected Gender Only */
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-4 py-3 rounded-full font-medium bg-theme-blue text-white">
                    <span>{selectedAdditionalGender}</span>
                    <button
                      onClick={handleRemoveSelectedGender}
                      className="ml-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
                    >
                      <X className='text-theme-blue' size={16}/>
                    </button>
                  </div>
                </div>
              ) : (
                /* All Gender Options */
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={async () => {
                      setformData(prev => ({ ...prev, gender: "Male" }))
                      setValue("gender", "Male")
                      // Trigger validation to clear errors
                      await trigger("gender")
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-colors ${
                      formData.gender === "Male"
                        ? "bg-theme-blue text-white"
                        : "border border-gray-300 text-black hover:border-gray-400"
                    }`}
                  >
                    <Mars size={16}/>
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      setformData(prev => ({ ...prev, gender: "Female" }))
                      setValue("gender", "Female")
                      // Trigger validation to clear errors
                      await trigger("gender")
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-colors ${
                      formData.gender === "Female"
                        ? "bg-theme-blue text-white"
                        : "border border-gray-300 text-black hover:border-gray-400"
                    }`}
                  >
                    <Venus size={16}/>
                    Female
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      // For mobile, use bottom sheet
                      if (window.innerWidth < 768) {
                        handleOthersClick()
                      } else {
                        // For desktop, use modal
                        modalOpen.openModal()
                      }
                    }}
                    className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-colors ${
                      formData.gender === "others"
                        ? "bg-theme-blue text-white"
                        : "border border-gray-300 text-black hover:border-gray-400"
                    }`}
                  >
                    Others
                  </button>
                </div>
              )}
              {errors.gender && (
                <p className="text-red-500 text-sm ml-4">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <div className="fixed bottom-6 w-full left-0 px-4">
            <ArrowFilledButton
              text="Continue"
              textCenter={true}
              onClick={handleSubmit(onSubmitStep2)}
            />
          </div>
        </form>

        {/* Gender Selection Bottom Sheet */}
        <BottomSheet
          isOpen={showGenderBottomSheet}
          onClose={() => setShowGenderBottomSheet(false)}
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center gap-1 mb-6">
              <button 
                onClick={() => setShowGenderBottomSheet(false)}
              >
                <ArrowLeft size={24}/>
              </button>
              <h2 className="text-lg font-bold text-black">
                Add More About Your gender
              </h2>
            </div>

            {/* Gender Options */}
            <div className="space-y-4 mb-8">
              {otherGenderOptions?.map((option, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => handleGenderSelection(option)}
                >
                  <span className="text-black font-medium">{option}</span>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedAdditionalGender === option 
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAdditionalGender === option && (
                      <div className="w-full h-full rounded-full bg-white border-2 border-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div onClick={handleGenderContinue}>
              <ArrowFilledButton text="Continue" textCenter={true} />
            </div>
          </div>
        </BottomSheet>

        {/* Desktop Modal for Gender Selection */}
        <Modal
          isFullscreen={false}
          isOpen={modalOpen.isOpen}
          onClose={modalOpen.closeModal}
        >
          <div className="p-6">
            {/* Gender Options */}
            <div className="space-y-4 mb-8">
              {additionalGenderOptions.map((option, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between py-3 cursor-pointer"
                  onClick={() => handleGenderSelection(option)}
                >
                  <span className="text-black font-medium">{option}</span>
                  <div className={`w-5 h-5 rounded-full border-2 ${
                    selectedAdditionalGender === option 
                      ? 'border-blue-600 bg-blue-600' 
                      : 'border-gray-300'
                  }`}>
                    {selectedAdditionalGender === option && (
                      <div className="w-full h-full rounded-full bg-white border-2 border-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Button */}
            <div onClick={async () => {
              setformData(prev => ({ ...prev, gender: "others" }))
              setValue("gender", "others")
              setShowSelectedGenderOnly(true)
              // Trigger validation to clear errors
              await trigger("gender")
              modalOpen.closeModal()
            }}>
              <ArrowFilledButton text="Continue" textCenter={true} />
            </div>
          </div>
        </Modal>
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
      <div className="w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
                  <div className='text-[#090A0A] flex items-center justify-between'>
                    <div className='flex items-center gap-x-3 font-bold'>
                      <button type="button" onClick={goBack}>
                        <ChevronLeft/>
                      </button>
                      <span>Setup Profile</span>
                    </div>
                    <span className='font-bold'>{"(1/5)"}</span>
                  </div>
                  <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
                    <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
                  </div>
                </div>

        {/* Form Content */}
        <form className="flex-1 flex-col mt-8" onSubmit={handleSubmit(onSubmitStep1)}>
          {/* Full Name Section */}
          <div className="space-y-1">
            <h2 className="font-bold text-black">
              {"What's your Name?"}
            </h2>
            <input
              type="text"
              placeholder="Enter Your Full Name*"
              {...register("fullName", {
                required: "Full name is required",
                minLength: {
                  value: 2,
                  message: "Full name must be at least 2 characters"
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: "Full name should only contain letters and spaces"
                }
              })}
              className={`w-full border mt-1 rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none ${
                errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm ml-4">{errors.fullName.message}</p>
            )}
          </div>

          {/* Username Section */}
          <div className="space-y-1 mt-8">
              <h2 className="font-bold text-black">
                  Setup Username
              </h2>
              <div className="relative">
                  <input
                      type="text"
                      placeholder="Enter Your Username*"
                      {...register("username", {
                        required: "Username is required",
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
                          setValue("username", value)
                          // Clear selection if user manually types
                          if (value !== selectedSuggestion) {
                              setSelectedSuggestion("")
                              setShowLoader(false)
                              setShowApproved(false)
                          }
                      }}
                      className={`w-full mt-1 border rounded-full px-4 py-4 pr-12 text-black placeholder:text-[#999] focus:outline-none ${
                        errors.username ? 'border-red-500 focus:border-red-500' : 'border-[#E4E4E4] focus:border-blue-500'
                      }`}
                  />
                  {(checkUsernameLoading || showLoader) && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
                      </div>
                  )}
              </div>
              {errors.username && (
                <p className="text-red-500 text-sm mt-1 ml-4">{errors.username.message}</p>
              )}
          </div>

          {/* Status Section */}
          <div className="status mt-3">
              {(checkUsernameLoading || showLoader) ? (
                  <p className="text-sm font-bold text-center text-gray-500">
                      Checking availability...
                  </p>
              ) : showApproved ? (
                  <p className="text-sm font-bold text-center" style={{color: '#27C840'}}>
                      New username approved
                  </p>
              ) : (
                  usernameSuggestions.length > 0 && formData.username && (
                      <p className="text-sm text-[#FF5F57] font-bold text-center">
                          This Username Already taken
                      </p>
                  )
              )}
          </div>

          {/* Show suggestions only when username is taken */}
          {usernameSuggestions.length > 0 && !selectedSuggestion && (
              <>
                  {/* choose section */}
                  <div className='flex items-center gap-x-4 justify-center mt-8'>
                      <hr className='border border-[#999] w-8'/>
                      <p className='font-bold text-[#999]'>You can choose from these too</p>
                      <hr className='border border-[#999] w-8'/>
                  </div>

                  {/* suggestions to choose from */}
                  <div className='flex items-center flex-wrap gap-2 mt-4 mb-4'>
                      {usernameSuggestions.map((suggestion, index) => (
                          <div
                              key={index}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className={`border rounded-full px-4 py-2 cursor-pointer transition-all ${
                                  selectedSuggestion === suggestion
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
        </form>

        {/* Continue Button */}
        <div className="fixed bottom-6 w-full left-0 px-4">
          <ArrowFilledButton
            text="Continue"
            textCenter={true}
            onClick={handleSubmit(onSubmitStep1)}
          />
        </div>
      </div>
    </div>
    )
  }

  // Main render with all bottom sheets
  return (
    <>
      {renderMainContent()}

      {/* Custom Niche Bottom Sheet - Always rendered */}
      <BottomSheet
        isOpen={showCustomNicheBottomSheet}
        onClose={() => setShowCustomNicheBottomSheet(false)}
        bottomSheetMaximumHeight={250}
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
    </>
  )
}

export default ProfilePage