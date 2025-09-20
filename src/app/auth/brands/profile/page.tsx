"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import BottomSheet from '@/components/bottomsheets/BottomSheet'
import { ChevronDown, Edit, Eye, EyeOff, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'

const BrandsProfilePage = () => {
  const [brandEmail, setBrandEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [brandName, setBrandName] = useState("")
  const [brandUsername, setBrandUsername] = useState("")
  const [selectedBrandSuggestion, setSelectedBrandSuggestion] = useState("")
  const [showBrandLoader, setShowBrandLoader] = useState(false)
  const [showBrandApproved, setShowBrandApproved] = useState(false)
  const [legalEntityName, setLegalEntityName] = useState("")
  const [brandType, setBrandType] = useState("")
  const [brandEmailId, setBrandEmailId] = useState("")
  const [brandPocName, setBrandPocName] = useState("")
  const [brandPocDesignation, setBrandPocDesignation] = useState("")
  const [brandPocEmail, setBrandPocEmail] = useState("")
  const [brandPocContact, setBrandPocContact] = useState("")
  const [brandProfileImage, setBrandProfileImage] = useState("")
  const [brandBio, setBrandBio] = useState("")
  const [selectedBrandNiches, setSelectedBrandNiches] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [showCustomNicheBottomSheet, setShowCustomNicheBottomSheet] = useState(false)
  const [customNicheInput, setCustomNicheInput] = useState("")

  const brandUsernameSuggestions = [
    "Dhruv_09",
    "Dhruv_1109", 
    "DB_1109",
    "DhruvbHATIA_09",
    "Dhruv_B@1109"
  ]

  const brandTypeOptions = [
    "Private Limited Company (Pvt. Ltd.)",
    "Public Limited Company",
    "Limited Liability Partnership (LLP)",
    "Partnership Firm",
    "Sole Proprietorship",
    "One Person Company (OPC)",
    "Section 8 Company (Non-Profit)",
    "Trust",
    "Society"
  ]

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
    setSelectedBrandNiches(prev => 
      prev.includes(nicheId) 
        ? prev.filter(id => id !== nicheId)
        : [...prev, nicheId]
    )
  }

  const handleBrandSuggestionClick = (suggestion: string) => {
    setBrandUsername(suggestion)
    setSelectedBrandSuggestion(suggestion)
    setShowBrandApproved(false)
    setShowBrandLoader(true)
    
    // Show loader for 2 seconds then show approved message
    setTimeout(() => {
      setShowBrandLoader(false)
      setShowBrandApproved(true)
    }, 2000)
  }

  // Debounce effect for checking brand username availability
  useEffect(() => {
    if (brandUsername && !selectedBrandSuggestion) {
      setShowBrandApproved(false)
      setShowBrandLoader(true)
      
      const timer = setTimeout(() => {
        setShowBrandLoader(false)
      }, 1500)
      
      return () => clearTimeout(timer)
    }
  }, [brandUsername, selectedBrandSuggestion])

  const nextStep = () => {
    setCurrentStep(prev => prev + 1)
  }

  const getProgressWidth = () => {
    return `${(currentStep / 7) * 100}%`
  }

  const handleBrandImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setBrandProfileImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const openBrandFileDialog = () => {
    const fileInput = document.getElementById('brand-profile-image-input') as HTMLInputElement
    fileInput?.click()
  }

  const handleAddCustomNiche = () => {
    if (customNicheInput.trim()) {
      const customNicheId = customNicheInput.toLowerCase().replace(/\s+/g, '-')
      setSelectedBrandNiches(prev => [...prev, customNicheId])

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

  if (currentStep === 7) {
    return (
      <div className="sm:flex h-screen items-center flex-col pb-4">
        <div className="logo md:block hidden">
          <p className='text-4xl font-black text-theme-blue'>Cloutsy</p>
        </div>
        <div className="max-w-md w-full md:border border-[#E4E4E4] rounded-3xl h-full flex flex-col justify-between px-4 py-8 mt-4">
        {/* Header with progress */}
        <div className="">
          <h1 className="font-bold text-black text-center">
            New To This Platform {'(7/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Niche Selection Section */}
        <div className="flex-1 flex flex-col mt-8">
          <h2 className="text-xl font-bold text-black mb-6">
            What&apos;s Your Brand Niche?
          </h2>
          
          {/* Niche Options Grid */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-3">
              {brandNicheOptions.map((niche) => (
                <button
                  key={niche.id}
                  onClick={() => handleBrandNicheToggle(niche.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-colors ${
                    selectedBrandNiches.includes(niche.id)
                      ? "bg-theme-blue text-white"
                      : "border border-gray-300 text-black hover:border-gray-400"
                  }`}
                >
                  <span className="text-lg">{niche.icon}</span>
                  <span className='font-bold'>{niche.name}</span>
                </button>
              ))}

              {/* Add Custom Button */}
              <button
                onClick={() => setShowCustomNicheBottomSheet(true)}
                className="flex items-center gap-3 px-4 py-3 rounded-full font-medium transition-colors border border-dashed border-gray-400 text-gray-600 hover:border-gray-600 hover:text-gray-800"
              >
                <Plus size={20} />
                <span className='font-bold'>Add Custom</span>
              </button>
            </div>
          </div>
        </div>

        {/* Selection Counter and Continue Button */}
        <div className="mt-auto space-y-4">
          <p className="text-center font-medium text-gray-700">
            Selected ({selectedBrandNiches.length}/5)
          </p>
          <div>
            <ArrowFilledButton text="Continue" textCenter={true}/>
          </div>
        </div>
        </div>
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
          <h1 className="font-bold text-black text-center">
            New To This Platform {'(6/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Bio Section */}
        <div className="flex-1 flex flex-col mt-8">
          <h2 className="text-xl font-bold text-black mb-6">
            Tell Us About The Brand
          </h2>
          
          {/* Bio Text Area */}
          <div className="flex-1">
            <textarea
              placeholder="Add Bio"
              value={brandBio}
              onChange={(e) => setBrandBio(e.target.value)}
              className="w-full h-48 p-4 border border-[#E4E4E4] rounded-2xl text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500 resize-none"
              rows={8}
            />
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
            New To This Platform {'(5/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Brand Profile Image Section */}
        <div className="flex-1 flex flex-col items-center justify-start mt-9">
          <h2 className="text-xl font-bold text-black mb-5 text-center">
            Add Brand&apos;s Profile Image
          </h2>
          
          {/* Profile Avatar */}
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-purple-200 flex items-center justify-center overflow-hidden">
              {brandProfileImage ? (
                <img src={brandProfileImage} alt="Brand Profile" className="w-full h-full object-cover" />
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
            New To This Platform {'(4/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
          {/* Brand POC Name Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">
              Brand POC Name
            </h2>
            <input
              type="text"
              placeholder="Enter Full Name"
              value={brandPocName}
              onChange={(e) => setBrandPocName(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Brand POC Designation Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Brand POC Designation
            </h2>
            <input
              type="text"
              placeholder="Depshanta Marketing Solutions Pvt.Ltd"
              value={brandPocDesignation}
              onChange={(e) => setBrandPocDesignation(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Brand POC Email Id Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Brand POC Email Id
            </h2>
            <input
              type="email"
              placeholder="Depshanta Marketing Solutions Pvt.Ltd"
              value={brandPocEmail}
              onChange={(e) => setBrandPocEmail(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Brand POC Contact Number Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Brand POC Contact Number
            </h2>
            <input
              type="tel"
              placeholder="Depshanta Marketing Solutions Pvt.Ltd"
              value={brandPocContact}
              onChange={(e) => setBrandPocContact(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
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
              New To This Platform {'(3/7)'}
            </h1>
            <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
              <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
            </div>
          </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
          {/* Legal Entity Name Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">
              What&apos;s your Legal Entity Name?
            </h2>
            <input
              type="text"
              placeholder="Enter Full Name*"
              value={legalEntityName}
              onChange={(e) => setLegalEntityName(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Brand Type Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              What Type of Brand is this?
            </h2>
            <div className="relative">
              <select
                value={brandType}
                onChange={(e) => setBrandType(e.target.value)}
                className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none bg-transparent focus:border-blue-500 appearance-none"
              >
                <option value="" disabled className="text-[#999]">
                  Eg. Private Limited Company (Pvt. Ltd.)*
                </option>
                {brandTypeOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown 
                size={20} 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
              />
            </div>
          </div>

          {/* Brand Email Id Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Brand Email Id.
            </h2>
            <input
              type="email"
              placeholder="Enter Full Name*"
              value={brandEmailId}
              onChange={(e) => setBrandEmailId(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
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
            New To This Platform {'(2/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
          {/* Brand Name Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-black">
              What&apos;s your Brand Name?
            </h2>
            <input
              type="text"
              placeholder="Enter Full Name*"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Brand Username Section */}
          <div className="space-y-3 mt-8">
            <h2 className="text-xl font-bold text-black">
              Setup Brand Username
            </h2>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter Your Full Name*"
                value={brandUsername}
                onChange={(e) => {
                  setBrandUsername(e.target.value)
                  // Clear selection if user manually types
                  if (e.target.value !== selectedBrandSuggestion) {
                    setSelectedBrandSuggestion("")
                    setShowBrandLoader(false)
                    setShowBrandApproved(false)
                  }
                }}
                className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 pr-12 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
              />
              {showBrandLoader && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-blue-600"></div>
                </div>
              )}
            </div>
          </div>

          {/* Status Section */}
          <div className="status mt-3">
            {showBrandLoader ? (
              <p className="text-sm font-bold text-center text-gray-500">
                Checking availability...
              </p>
            ) : showBrandApproved ? (
              <p className="text-sm font-bold text-center" style={{color: '#27C840'}}>
                New username approved
              </p>
            ) : (
              brandUsername && !selectedBrandSuggestion && (
                <p className="text-sm text-[#FF5F57] font-bold text-center">
                  This Username Already taken
                </p>
              )
            )}
          </div>

          {/* Show suggestions only when username is taken */}
          {brandUsername && !selectedBrandSuggestion && !showBrandLoader && !showBrandApproved && (
            <>
              {/* choose section */}
              <div className='flex items-center gap-x-4 justify-center mt-8'>
                <hr className='border border-[#999] w-8'/>
                <p className='font-bold text-[#999]'>You can choose from these too</p>
                <hr className='border border-[#999] w-8'/>
              </div>

              {/* suggestions to choose from */}
              <div className='flex items-center flex-wrap gap-2 mt-4 mb-4'>
                {brandUsernameSuggestions.map((suggestion, index) => (
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
        </div>

        {/* Continue Button */}
        <div className="mt-auto" onClick={nextStep}>
          <ArrowFilledButton text="Continue" textCenter={true}/>
        </div>
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
            New To This Platform {'(1/7)'}
          </h1>
          <div className="w-full bg-[#E4E4E4] rounded-full h-3 mt-8">
            <div className="bg-theme-blue h-3 rounded-full" style={{width: getProgressWidth()}}></div>
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 flex-col mt-8">
        {/* Brand Email Section */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-black">
            Brand Email Id.
          </h2>
          <input
            type="email"
            placeholder="Enter Full Name*"
            value={brandEmail}
            onChange={(e) => setBrandEmail(e.target.value)}
            className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Password Section */}
        <div className="space-y-3 mt-8">
          <h2 className="text-xl font-bold text-black">
            Add Password
          </h2>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Full Name"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 pr-12 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password Section */}
        <div className="space-y-3 mt-8">
          <h2 className="text-xl font-bold text-black">
            Confirm Password
          </h2>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Enter Full Name"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-[#E4E4E4] rounded-2xl px-4 py-4 pr-12 text-black placeholder:text-[#999] focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? (
                <EyeOff size={20} className="text-gray-500" />
              ) : (
                <Eye size={20} className="text-gray-500" />
              )}
            </button>
          </div>
        </div>
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

export default BrandsProfilePage