"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import BottomSheet from '@/components/bottomsheets/BottomSheet'
import React, { useState, useEffect } from 'react'
import { ArrowLeft, Edit, Mars, Plus, Venus, X } from 'lucide-react'
import { Modal } from '@/components/ui/modal'
import { useModal } from '@/hooks/useModal'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [selectedSuggestion, setSelectedSuggestion] = useState("")
  const [showLoader, setShowLoader] = useState(false)
  const [showApproved, setShowApproved] = useState(false)
  const [showUsernameTaken, setShowUsernameTaken] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [gender, setGender] = useState("")
  const [showGenderBottomSheet, setShowGenderBottomSheet] = useState(false)
  const [selectedAdditionalGender, setSelectedAdditionalGender] = useState("")
  const [showSelectedGenderOnly, setShowSelectedGenderOnly] = useState(false)
  const [profileImage, setProfileImage] = useState("")
  const [bio, setBio] = useState("")
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])
  const [showCustomNicheBottomSheet, setShowCustomNicheBottomSheet] = useState(false)
  const [customNicheInput, setCustomNicheInput] = useState("")
  const modalOpen = useModal();
  const router = useRouter();
  
  const usernameSuggestions = [
    "Dhruv_09",
    "Dhruv_1109", 
    "Dhruv_creator",
    "Dhruv_official",
    "DhruvInfluencer",
    "Dhruv_2024",
    "Creative_Dhruv",
    "Dhruv_pro"
  ]

  const additionalGenderOptions = [
    "Abinary",
    "Trans-Women", 
    "Gay",
    "Binary",
    "Trans-Feminine"
  ]

  const nicheOptions = [
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

  const handleOthersClick = () => {
    setShowGenderBottomSheet(true)
  }

  const handleGenderSelection = (selectedGender: string) => {
    setSelectedAdditionalGender(selectedGender)
    setGender("others")
  }

  const handleGenderContinue = () => {
    setShowGenderBottomSheet(false)
    if (selectedAdditionalGender) {
      setShowSelectedGenderOnly(true)
    }
  }

  const handleNicheToggle = (nicheId: string) => {
    setSelectedNiches(prev =>
      prev.includes(nicheId)
        ? prev.filter(id => id !== nicheId)
        : [...prev, nicheId]
    )
  }

  const handleAddCustomNiche = () => {
    if (customNicheInput.trim()) {
      const customNicheId = customNicheInput.toLowerCase().replace(/\s+/g, '-')
      setSelectedNiches(prev => [...prev, customNicheId])

      // Add to nicheOptions for future display
      nicheOptions.push({
        id: customNicheId,
        name: customNicheInput.trim(),
        icon: "🎯"
      })

      setCustomNicheInput("")
      setShowCustomNicheBottomSheet(false)
    }
  }

  const handleRemoveSelectedGender = () => {
    setShowSelectedGenderOnly(false)
    setGender("")
    setSelectedAdditionalGender("")
  }

  const handleSuggestionClick = (suggestion: string) => {
    setUsername(suggestion)
    setSelectedSuggestion(suggestion)
    setShowApproved(false)
    setShowLoader(true)
    
    // Show loader for 2 seconds then show approved message
    setTimeout(() => {
      setShowLoader(false)
      setShowApproved(true)
    }, 2000)
  }

  // Debounce effect for checking username availability
  useEffect(() => {
    if (username && !selectedSuggestion) {
      setShowApproved(false)
      setShowLoader(true)
      setShowUsernameTaken(false)
      
      const timer = setTimeout(() => {
        setShowLoader(false)
        // Simulate username taken for demo (in real app, this would be an API call)
        setShowUsernameTaken(true)
      }, 1500)
      
      return () => clearTimeout(timer)
    } else {
      setShowUsernameTaken(false)
    }
  }, [username, selectedSuggestion])

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const getProgressWidth = () => {
    return `${(currentStep / 5) * 100}%`
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openFileDialog = () => {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement
    fileInput?.click()
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
            <h1 className="font-bold text-black text-center">
              New To This Platform {'(5/5)'}
            </h1>
            <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
              <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
            </div>
          </div>

          {/* Niche Selection Section */}
          <div className="sm:flex-1 flex flex-col items-center justify-center mt-8">
            <div className="sm:text-center space-y-6 w-full">
              <div className='flex items-center justify-between'>
                <h2 className="text-xl font-bold text-black">
                  {"What's Your Niche?"}
                </h2>
                <button onClick={() => setShowCustomNicheBottomSheet(true)} className='flex items-center gap-x-1 text-theme-primary'>
                  <Plus/>
                  <span>Add Custom</span>
                </button>
              </div>
              
              {/* Niche Options Grid */}
              <div className="w-full pb-4">
                <div className="flex flex-wrap gap-3 sm:justify-center">
                  {nicheOptions.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => handleNicheToggle(niche.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-colors ${
                        selectedNiches.includes(niche.id)
                          ? "bg-theme-blue text-white"
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
          <div className="fixed bottom-2 w-full left-0 px-4">
            <ArrowFilledButton text="Continue" textCenter={true} onClick={() => router.push("/influencers")}/>
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
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
          {/* Header with progress */}
          <div className="">
            <h1 className="font-bold text-black text-center">
              New To This Platform {'(4/5)'}
            </h1>
            <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
              <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="flex-1 flex flex-col items-center mt-8">
            <div className="sm:text-center space-y-6 w-full">
              <h2 className="text-xl font-bold text-black">
                Tell Us About Your Self
              </h2>
              
              {/* Bio Text Area */}
              <div className="w-full">
                <textarea
                  placeholder="Add Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full h-48 p-4 border border-[#E4E4E4] rounded-2xl text-black placeholder:text-[#999] focus:outline-none focus:border-theme-blue resize-none"
                  rows={8}
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <div className="mt-auto" onClick={nextStep}>
            <ArrowFilledButton text="Continue" textCenter={true}/>
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
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
          {/* Header with progress */}
          <div className="">
            <h1 className="font-bold text-black text-center">
              New To This Platform {'(3/5)'}
            </h1>
            <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
              <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
            </div>
          </div>

          {/* Profile Image Section */}
          <div className="flex-1 flex flex-col items-center mt-8">
            <div className="text-center space-y-5">
              <h2 className="text-xl font-bold text-black">
                Add Profile Image
              </h2>
              
              {/* Profile Avatar */}
              <div className="relative">
                <div className="w-32 h-32 relative rounded-full bg-purple-200 flex items-center justify-center overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
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
                  className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border"
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
              </div>
            </div>
          </div>

          {/* Skip and Continue buttons */}
          <div className="mt-auto space-y-4">
            <p className="text-center font-medium text-gray-700">
              Skip This Step
            </p>
            <div onClick={nextStep}>
              <ArrowFilledButton text="Continue" textCenter={true}/>
            </div>
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
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <h1 className="font-bold text-black text-center">
            New To This Platform {'(2/5)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
          {/* Birthday Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">
              When&apos;s your Birthday?
            </h2>
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="DD"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                maxLength={2}
                className="w-16 border border-[#E4E4E4] rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none focus:border-theme-blue"
              />
              <span className="flex items-center text-xl text-gray-400">/</span>
              <input
                type="text"
                placeholder="MM"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                maxLength={2}
                className="w-16 border border-[#E4E4E4] rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none focus:border-theme-blue"
              />
              <span className="flex items-center text-xl text-gray-400">/</span>
              <input
                type="text"
                placeholder="YYYY"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                maxLength={4}
                className="w-20 border border-[#E4E4E4] rounded-full px-3 py-3 text-center text-black placeholder:text-[#999] focus:outline-none focus:border-theme-blue"
              />
            </div>
          </div>

          {/* Gender Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Who Are You?
            </h2>
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
                  onClick={() => setGender("male")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-colors ${
                    gender === "male"
                      ? "bg-theme-blue text-white"
                      : "border border-gray-300 text-black hover:border-gray-400"
                  }`}
                >
                  <Mars size={16}/>
                  Male
                </button>
                <button
                  onClick={() => setGender("female")}
                  className={`flex items-center gap-2 px-4 py-3 rounded-full font-medium transition-colors ${
                    gender === "female"
                      ? "bg-theme-blue text-white"
                      : "border border-gray-300 text-black hover:border-gray-400"
                  }`}
                >
                  <Venus size={16}/>
                  Female
                </button>
                <button
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
                    gender === "others"
                      ? "bg-theme-blue text-white"
                      : "border border-gray-300 text-black hover:border-gray-400"
                  }`}
                >
                  Others
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="mt-auto" onClick={nextStep}>
          <ArrowFilledButton text="Continue" textCenter={true}/>
        </div>

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
            <div onClick={() => {
              setGender("others")
              setShowSelectedGenderOnly(true)
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
      <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <h1 className="font-bold text-black text-center">
            New To This Platform {'(1/5)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
          {/* Full Name Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">
              {"What's your Name?"}
            </h2>
            <input
              type="text"
              placeholder="Enter Your Full Name*"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-full px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Username Section */}
          <div className="space-y-3 mt-8">
              <h2 className="text-xl font-bold text-black">
                  Setup Username
              </h2>
              <div className="relative">
                  <input
                      type="text"
                      placeholder="Enter Your Username*"
                      value={username}
                      onChange={(e) => {
                          setUsername(e.target.value)
                          // Clear selection if user manually types
                          if (e.target.value !== selectedSuggestion) {
                              setSelectedSuggestion("")
                              setShowLoader(false)
                              setShowApproved(false)
                          }
                      }}
                      className="w-full border border-[#E4E4E4] rounded-full px-4 py-4 pr-12 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
                  />
                  {showLoader && (
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
                      </div>
                  )}
              </div>
          </div>

          {/* Status Section */}
          <div className="status mt-3">
              {showLoader ? (
                  <p className="text-sm font-bold text-center text-gray-500">
                      Checking availability...
                  </p>
              ) : showApproved ? (
                  <p className="text-sm font-bold text-center" style={{color: '#27C840'}}>
                      New username approved
                  </p>
              ) : (
                  showUsernameTaken && (
                      <p className="text-sm text-[#FF5F57] font-bold text-center">
                          This username is already taken
                      </p>
                  )
              )}
          </div>

          {/* Show suggestions only when username is taken */}
          {showUsernameTaken && !selectedSuggestion && (
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
        </div>

        {/* Continue Button */}
        <div className="mt-auto" onClick={nextStep}>
          <ArrowFilledButton text="Continue" textCenter={true}/>
        </div>
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

export default ProfilePage