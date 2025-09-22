"use client"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import InviteInfluencersScreen from '@/components/screens/InviteInfluencersScreen'
import SearchScreen from '@/components/screens/SearchScreen'
import SuccessfulScreen from '@/components/screens/SuccessfulScreen'
import { Influencer } from '@/types/influencer.interface'
import { ChevronDown, Clapperboard, Mars, MonitorSmartphone, PawPrint, Search, Shirt, Soup, Venus, Wallet, X } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

const CreateCampaignPage = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10>(1)
  const [campaignName, setCampaignName] = useState<string>('Glow Like Never Before')
  const [campaignCategory, setCampaignCategory] = useState<string>('Skincare + Makeup')
  const brandName:string ='L\'Oréal Paris'
  const [deliverableText, setDeliverableText] = useState<string>('')
  const [campaignDescription, setCampaignDescription] = useState<string>('')
  const [customInfluencerRequirement, setCustomInfluencerRequirement] = useState<string>('')
  const deliverableDisplay:string = '2 Instagram reels, 3 story posts'
  const [showSuccessscreen, setShowSuccessscreen] = useState<boolean>(false)
  const [showSearchScreen, setShowSearchScreen] = useState<boolean>(false)
  const [showInviteScreen, setShowInviteScreen] = useState<boolean>(false)
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([])

  // Influencer Preference States
  const [minAge, setMinAge] = useState<string>('18')
  const [maxAge, setMaxAge] = useState<string>('24')
  const [openToAllAges, setOpenToAllAges] = useState<boolean>(false)
  const [selectedGender, setSelectedGender] = useState<string>('Male')
  const [openToAllGenders, setOpenToAllGenders] = useState<boolean>(false)
  const [selectedNiches, setSelectedNiches] = useState<string[]>(['Fashion', 'Finance'])

  // Step 5 - Location Selection States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedCities, setSelectedCities] = useState<string[]>([])
  const [panIndiaSelected, setPanIndiaSelected] = useState<boolean>(false)

  // Step 6 - Collaboration Cost States
  const [collaborationCosts, setCollaborationCosts] = useState({
    instagram: { reel: '', story: '', post: '' },
    facebook: { post: '', story: '' },
    youtube: { video: '', shorts: '' },
    linkedin: { post: '', article: '' },
    twitter: { post: '', thread: '' }
  })

  // Performance Expectations States
  const [performanceExpectations, setPerformanceExpectations] = useState<string>('')

  // Brand Support States
  const [brandSupport, setBrandSupport] = useState<string>('')

  // Campaign Posting States
  const [campaignPostingOption, setCampaignPostingOption] = useState<'open' | 'invite' | null>(null)

  // Step 7 - Platform Selection States
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['instagram'])

  const handleContinueStep1 = () => {
    setCurrentStep(2)
  }

  const handleContinueStep2 = () => {
    setCurrentStep(3)
  }

  const handleContinueStep3 = () => {
    setCurrentStep(4)
  }

  const handleContinueStep4 = () => {
    setCurrentStep(5)
  }

  const handleContinueStep5 = () => {
    setCurrentStep(6)
  }

  const handleContinueStep6 = () => {
    setCurrentStep(7)
  }

  const handleContinueStep7 = () => {
    setCurrentStep(8)
  }

  const handleContinueStep8 = () => {
    setCurrentStep(9)
  }

  const handleContinueStep9 = () => {
    setCurrentStep(10)
  }

  const handleBackToStep1 = () => {
    setCurrentStep(1)
  }

  const handleBackToStep2 = () => {
    setCurrentStep(2)
  }

  const handleBackToStep3 = () => {
    setCurrentStep(3)
  }

  const handleBackToStep4 = () => {
    setCurrentStep(4)
  }

  const handleBackToStep5 = () => {
    setCurrentStep(5)
  }

  const handleBackToStep6 = () => {
    setCurrentStep(6)
  }

  const handleBackToStep7 = () => {
    setCurrentStep(7)
  }

  const handleBackToStep8 = () => {
    setCurrentStep(8)
  }

  const categories = [
    'Skincare + Makeup',
    'Fashion + Lifestyle',
    'Tech + Gaming',
    'Food + Beverage',
    'Travel + Tourism',
    'Health + Fitness',
    'Home + Decor',
    'Education + Books',
    'Entertainment + Music',
    'Business + Finance'
  ]

  // Age and Niche options
  const ageOptions = Array.from({ length: 48 }, (_, i) => (18 + i).toString())
  const genderOptions = ['Male', 'Female', 'Others']
  const nicheOptions = ['Fashion', 'Movies', 'Food', 'Finance', 'Electronics', 'Pets']

  // Popular Cities for location selection
  const popularCities = [
    'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Surat',
    'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Chandigarh', 'Gurugram'
  ]

  // All cities list for search functionality
  const allCities = [
    'Mumbai', 'Delhi NCR', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Surat',
    'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Lucknow', 'Chandigarh', 'Gurugram',
    'Agra', 'Amritsar', 'Aurangabad', 'Bhopal', 'Bhubaneswar', 'Coimbatore',
    'Dehradun', 'Faridabad', 'Ghaziabad', 'Goa', 'Guwahati', 'Indore',
    'Jabalpur', 'Kanpur', 'Kochi', 'Madurai', 'Meerut', 'Nagpur', 'Nashik',
    'Patna', 'Rajkot', 'Ranchi', 'Shimla', 'Thiruvananthapuram', 'Udaipur',
    'Vadodara', 'Varanasi', 'Vijayawada', 'Visakhapatnam'
  ]

  // Filter cities based on search query
  const filteredCities = searchQuery.length > 0
    ? allCities.filter(city =>
        city.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !selectedCities.includes(city)
      )
    : []

  // Handler functions for preferences
  const handleNicheToggle = (niche: string) => {
    setSelectedNiches(prev =>
      prev.includes(niche)
        ? prev.filter(n => n !== niche)
        : [...prev, niche]
    )
  }

  // Handler functions for location selection
  const handleCityToggle = (city: string) => {
    if (panIndiaSelected) {
      setPanIndiaSelected(false)
    }
    setSelectedCities(prev =>
      prev.includes(city)
        ? prev.filter(c => c !== city)
        : [...prev, city]
    )
  }

  const handlePanIndiaToggle = () => {
    setPanIndiaSelected(!panIndiaSelected)
    if (!panIndiaSelected) {
      setSelectedCities([])
    }
  }

  const handleRemoveCity = (cityToRemove: string) => {
    setSelectedCities(prev => prev.filter(city => city !== cityToRemove))
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

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const ProgressIndicator = () => (
    <div className="w-full max-w-sm mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <span className={`text-sm font-extrabold mt-1 ${currentStep === 9 ? 'text-[#999]' : 'text-blue-500'}`}>Create</span>
          <span className={`text-sm font-extrabold ${currentStep === 9 ? 'text-[#999]' : 'text-blue-500'}`}>Campaign</span>
        </div>

        <div className={`flex-1 h-0.5 mx-2 ${currentStep === 9 ? 'bg-blue-500' : 'bg-gray-300'}`}></div>

        <div className="flex flex-col items-center">
          <span className={`text-sm font-extrabold mt-1 ${currentStep === 9 ? 'text-blue-500' : 'text-[#999]'}`}>Review & Post</span>
          <span className={`text-sm font-extrabold ${currentStep === 9 ? 'text-blue-500' : 'text-[#999]'}`}>Campaign</span>
        </div>

        <div className="flex-1 h-0.5 bg-gray-300 mx-2"></div>

        <div className="flex flex-col items-center">
          <span className="text-[#999] text-sm font-extrabold mt-1">Find</span>
          <span className="text-[#999] text-sm font-extrabold">Influencers</span>
        </div>
      </div>
    </div>
  )

  const CampaignSummary = ({ showDeliverable = false }: { showDeliverable?: boolean }) => (
    <div className="w-full max-w-sm mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">{"L'ORÉAL"}</span>
        </div>
        <div className="flex-1">
          <h2 className="font-extrabold text-black">{campaignName}</h2>
          <p className="font-medium text-black">{brandName}</p>
          <p className="text-[#555] font-medium text-sm">Category: <span className="text-black font-bold">{campaignCategory}</span></p>
          {showDeliverable && (
            <p className="text-[#555] font-medium text-sm">Deliverable - <span className="text-black font-bold">{deliverableDisplay}</span></p>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      <div className="flex flex-col justify-start flex-1 px-4 py-8">
        {/* Progress Indicator */}
        {showSuccessscreen ? (
          <SuccessfulScreen onBack={() => setShowSuccessscreen(false)}/>
        ) : showInviteScreen ? (
          <InviteInfluencersScreen
            selectedInfluencers={selectedInfluencers}
            onRemoveInfluencer={(influencerId) => {
              setSelectedInfluencers(prev => prev.filter(inf => inf.id !== influencerId));
            }}
            onUploadCampaign={() => setShowSuccessscreen(true)}
            onInviteMore={() => {
              setShowInviteScreen(false);
              setShowSearchScreen(true);
            }}
            campaignData={{
              name: campaignName,
              brandName: brandName,
              category: campaignCategory,
              deliverable: deliverableDisplay
            }}
          />
        ) : showSearchScreen ? (
          <SearchScreen
            onBack={() => setShowSearchScreen(false)}
            searchQuery="Search for Influencers"
            onInfluencersSelected={(influencers) => {
              setSelectedInfluencers(influencers);
              setShowSearchScreen(false);
              setShowInviteScreen(true);
            }}
          />
        ) : (
          <>
          {
            currentStep !== 1 &&
            <ProgressIndicator />
          }

        {currentStep === 1 ? (
          /* Step 1: Campaign Basic Info */
          <>
            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-[40px] font-bold text-black leading-tight">
                Find Your Next<br />
                Great Influencers
              </h1>
            </div>

            {/* Form Fields */}
            <div className="w-full max-w-sm space-y-6">
              {/* Campaign Name Field */}
              <div>
                <label className="font-bold text-black">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name*"
                  value={campaignName}
                  onChange={(e) => setCampaignName(e.target.value)}
                  className="mt-2 w-full py-4 px-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-gray-400"
                />
              </div>

              {/* Campaign Category Field */}
              <div>
                <label className="font-bold text-black">
                  Campaign Category
                </label>
                <div className="relative">
                  <select
                    value={campaignCategory}
                    onChange={(e) => setCampaignCategory(e.target.value)}
                    className="mt-2 w-full py-4 px-6 border border-gray-300 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white text-black"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <ArrowFilledButton
                text="Continue"
                textCenter={true}
                onClick={handleContinueStep1}
              />
            </div>
          </>
        ) : currentStep === 2 ? (
          /* Step 2: Deliverable Format */
          <>
            {/* Campaign Summary */}
            <CampaignSummary />

            {/* Deliverable Format Section */}
            <div className="w-full max-w-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-black mb-4">Deliverable Format</h2>
                <div className="relative">
                  <textarea
                    placeholder="Add Deliverable*"
                    value={deliverableText}
                    onChange={(e) => setDeliverableText(e.target.value)}
                    maxLength={1000}
                    className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#999] bg-white placeholder-[#999] resize-none"
                  />
                  <div className="absolute -bottom-4 right-3 text-xs text-black">
                    {deliverableText?.length}/1,000
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep1}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep2}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 3 ? (
          /* Step 3: Campaign Description */
          <>
            {/* Campaign Summary with Deliverable */}
            <CampaignSummary showDeliverable={true} />

            {/* Campaign Description Section */}
            <div className="w-full max-w-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-black mb-4">Campaign Description</h2>
                <div className="relative">
                  <textarea
                    placeholder="Add Campaign Detail*"
                    value={campaignDescription}
                    onChange={(e) => setCampaignDescription(e.target.value)}
                    maxLength={10000}
                    className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[#999] bg-white placeholder-[#999] resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-black">
                    {campaignDescription?.length}/10,000
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep2}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep3}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 4 ? (
          /* Step 4: Set Influencers Preference */
          <>
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="font-bold text-black">
                Set Influencers Preference
              </h1>
            </div>

            {/* Preferences Form */}
            <div className="w-full max-w-sm space-y-8">
              {/* Age Preference Section */}
              <div>
                <h3 className="font-bold text-black mb-4">Have Any Age preference?</h3>
                <div className="flex items-center gap-4 mb-8">
                  {/* Min Age Dropdown */}
                  <div className="flex-1">
                    <div className="relative">
                      <select
                        value={minAge}
                        onChange={(e) => setMinAge(e.target.value)}
                        className="w-full py-4 px-6 border border-[#E4E4E4] rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none bg-white text-black"
                      >
                        {ageOptions.map((age) => (
                          <option key={age} value={age}>{age} yr Old</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <ChevronDown/>
                      </div>
                    </div>
                    <p className="text-xs text-black font-bold mt-1 text-center">Minimum Age</p>
                  </div>
                  
                  <hr className='w-7 border border-black relative mb-4'/>
                  
                  {/* Max Age Dropdown */}
                  <div className="flex-1">
                  <div className="relative">
                      <select
                        value={maxAge}
                        onChange={(e) => setMaxAge(e.target.value)}
                        className="w-full py-4 px-6 border border-[#E4E4E4] rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none bg-white text-black"
                      >
                        {ageOptions.map((age) => (
                          <option key={age} value={age}>{age} yr Old</option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-6 pointer-events-none">
                        <ChevronDown/>
                      </div>
                    </div>
                    <p className="text-xs text-black font-bold mt-1 text-center">Maximum Age</p>
                  </div>
                </div>

                {/* Open to All Ages Checkbox */}
                <div className="flex items-center gap-3 justify-center">
                  <label htmlFor="openToAllAges" className="text-sm font-bold text-black">
                    I am open with all Age type.
                  </label>
                  <input
                    type="checkbox"
                    id="openToAllAges"
                    checked={openToAllAges}
                    onChange={(e) => setOpenToAllAges(e.target.checked)}
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Gender Preference Section */}
              <div>
                <h3 className="font-bold text-black mb-4">Have Any Gender preference?</h3>
                <div className="flex gap-3 mb-8">
                  {genderOptions.map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setSelectedGender(gender)}
                      className={`flex items-center gap-2 px-5 py-3 rounded-full border font-medium text-sm transition-colors ${
                        selectedGender === gender
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {gender === 'Male' && <Mars/>}
                      {gender === 'Female' && <Venus/>}
                      {gender === 'Others'}
                      <span>{gender}</span>
                    </button>
                  ))}
                </div>

                {/* Open to All Genders Checkbox */}
                <div className="flex items-center gap-3 justify-center">
                  <label htmlFor="openToAllGenders" className="text-sm font-bold text-black">
                    I am open with all Gender type.
                  </label>
                  <input
                    type="checkbox"
                    id="openToAllGenders"
                    checked={openToAllGenders}
                    onChange={(e) => setOpenToAllGenders(e.target.checked)}
                    className="w-6 h-6 text-blue-600 border-gray-300 rounded-md focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Niche Preference Section */}
              <div className=''>
                <h3 className="font-bold text-black mb-4">Any Specific influencer Niche?</h3>
                <div className="flex flex-wrap gap-3">
                  {nicheOptions.map((niche) => (
                    <button
                      key={niche}
                      onClick={() => handleNicheToggle(niche)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-full border font-medium text-sm transition-colors ${
                        selectedNiches.includes(niche)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {niche === 'Fashion' && <Shirt size={18}/>}
                      {niche === 'Movies' && <Clapperboard size={18}/>}
                      {niche === 'Food' && <Soup size={18}/>}
                      {niche === 'Finance' && <Wallet size={18}/>}
                      {niche === 'Electronics' && <MonitorSmartphone size={18}/>}
                      {niche === 'Pets' && <PawPrint size={18}/>}
                      <span>{niche}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* custom influencer requirements */}
              <div className="w-full max-w-sm space-y-6 pb-24">
                <div>
                  <h2 className="text-lg font-bold text-black mb-4">Add Custom Influencer Requirements</h2>
                  <div className="relative">
                    <textarea
                      placeholder="Add Custom Requirements*"
                      value={customInfluencerRequirement}
                      onChange={(e) => setCustomInfluencerRequirement(e.target.value)}
                      maxLength={10000}
                      className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-[#999] bg-white placeholder-[#999] resize-none"
                    />
                    <div className="absolute -bottom-4 right-3 text-xs text-black">
                      {customInfluencerRequirement?.length}/1,000
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep3}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep4}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 5 ? (
          /* Step 5: Campaign Location Selection */
          <>
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="font-bold text-black">
                Where Do you want to run this Campaign
              </h1>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-sm mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for the city"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-4 pl-12 pr-6 border border-gray-300 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 placeholder-gray-400"
                />
              </div>

              {/* Search Results */}
              {filteredCities.length > 0 && (
                <div className="mt-3 max-h-48 overflow-y-auto border border-gray-200 rounded-2xl bg-white shadow-sm">
                  {filteredCities.slice(0, 10).map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        handleCityToggle(city)
                        setSearchQuery('')
                      }}
                      disabled={panIndiaSelected}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        panIndiaSelected ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Cities Section */}
            {selectedCities.length > 0 && !panIndiaSelected && (
              <div className="w-full max-w-sm mb-6">
                <h3 className="text-lg font-bold text-black mb-4">Selected Cities</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedCities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleRemoveCity(city)}
                      className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-full text-sm font-medium transition-colors"
                    >
                      <span>{city}</span>
                      <div className="flex-shrink-0 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                        <X size={12} className='text-theme-primary'/>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Cities Section */}
            <div className="w-full max-w-sm mb-8">
              <h3 className="text-lg font-bold text-black mb-4">Popular Cities</h3>
              <div className="flex flex-wrap gap-3">
                {popularCities
                  .filter(city => !selectedCities.includes(city))
                  .map((city) => (
                  <button
                    key={city}
                    onClick={() => handleCityToggle(city)}
                    disabled={panIndiaSelected}
                    className={`px-6 py-3 rounded-full border font-medium text-sm transition-colors ${
                      panIndiaSelected
                        ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>

            {/* Pan-India Option */}
            <div className="w-full max-w-sm mb-16">
              <div className="flex items-center justify-center gap-3">
                <label htmlFor="panIndia" className="text-sm font-bold text-black">
                  I want to run this campaign Pan-India
                </label>
                <input
                  type="checkbox"
                  id="panIndia"
                  checked={panIndiaSelected}
                  onChange={handlePanIndiaToggle}
                  className="w-6 h-6 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep4}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep5}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 6 ? (
          /* Step 6: Collaboration Costs */
          <>
            {/* Title */}
            <div className="text-center mb-6">
              <h1 className="font-bold text-black">
                Campaign Budget per Deliverables
              </h1>
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


                {/* Add spacing for fixed bottom navigation */}
                <div className="pb-24"></div>
              </div>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep5}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep6}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 7 ? (
          /* Step 7: Performance Expectations */
          <>
            {/* Title */}
            <div className="text-left mb-3">
              <h1 className="font-bold text-black">
                Performance Expectations
              </h1>
            </div>

            {/* Performance Expectations Form */}
            <div className="w-full max-w-sm space-y-6">
              <div className="relative">
                <textarea
                  placeholder="Add Deliverable"
                  value={performanceExpectations}
                  onChange={(e) => setPerformanceExpectations(e.target.value)}
                  maxLength={1000}
                  className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-[#999] bg-white placeholder-[#999] resize-none"
                />
                <div className="absolute -bottom-3 right-3 text-xs text-black">
                  {performanceExpectations?.length}/1,000
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep6}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep7}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 8 ? (
          /* Step 8: Brand Support */
          <>
            {/* Title */}
            <div className="text-left mb-3">
              <h1 className="font-bold text-black">
                Brand Support
              </h1>
            </div>

            {/* Brand Support Form */}
            <div className="w-full max-w-sm space-y-6">
              <div className="relative">
                <textarea
                  placeholder="Add Deliverable"
                  value={brandSupport}
                  onChange={(e) => setBrandSupport(e.target.value)}
                  maxLength={500}
                  className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-[#999] bg-white placeholder-[#999] resize-none"
                />
                <div className="absolute -bottom-3 right-3 text-xs text-black">
                  {brandSupport?.length}/500
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep7}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep8}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 9 ? (
          /* Step 9: Review Campaign */
          <>
            {/* Review Campaign Content */}
            <div className="w-full max-w-sm space-y-6">
              {/* Title */}
              <div className="text-left mb-6">
                <h1 className="font-extrabold text-black">
                  Review Campaign
                </h1>
              </div>

              {/* Campaign Overview Card */}
              <div className="flex items-start gap-4 mb-8">
                <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Image src={"/images/brand/loreal.svg"} alt="Brand Logo" fill className='object-cover'/>
                </div>
                <div className="flex-1">
                  <h2 className="font-extrabold text-black">{campaignName}</h2>
                  <p className="font-medium text-black">{brandName}</p>
                  <p className="text-[#555] font-medium text-sm">Category: <span className="text-black font-bold">{campaignCategory}</span></p>
                  <p className="text-[#555] font-medium text-sm">Deliverable - <span className="text-black font-bold">{deliverableDisplay}</span></p>
                </div>
              </div>

              {/* About Campaign Section */}
              <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">About Campaign</h3>
                <p className="text-sm text-black font-medium leading-relaxed">
                  {campaignDescription || "L'Oréal Paris invites beauty creators to be part of our flagship campaign 'Glow Like Never Before', celebrating skincare and makeup products designed to enhance natural radiance. This campaign focuses on creating engaging, authentic and relatable content that inspires confidence and highlights the science-backed innovation behind our products. Influencers are encouraged to demonstrate real transformations, daily-use beauty routines, and tips that resonate with diverse audiences. Our goal is to drive awareness, showcase product versatility, and build strong engagement with communities who trust their creators for beauty recommendations."}
                </p>
              </div>

              {/* Deliverable Section */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Deliverable</h3>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Instagram Reels: 2</span>
                      <span className="text-black"> (Product tutorial + Glow transformation)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Instagram Stories: 3</span>
                      <span className="text-black"> (Unboxing, Q&A polls, live usage)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Optional Bonus: 1</span>
                      <span className="text-black"> Carousel Post (before/after look)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Tone & Style:</span>
                      <span className="text-black"> Relatable, empowering, natural beauty showcase</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* influencer requirements */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Influencer Requirements</h3>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Niche</span>
                      <span className="text-black"> Beauty, Skincare, Lifestyle</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Influencer Demographic</span>
                      <span className="text-black"> Women, 18–35 years old</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Platform</span>
                      <span className="text-black"> Instagram (mandatory), TikTok (bonus if available)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Follower Range:</span>
                      <span className="text-black"> {"10K – 200K (micro & mid-tier influencers preferred)"}</span>
                    </div>
                  </div>
                </div>
              </div>

               {/* Active Regions */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Active Regions</h3>
                <p className='font-bold text-sm'>Mumbai, Delhi NCR, Banglore</p>
              </div>

               {/* rewards compensation */}
               <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Rewards/Compensation</h3>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Fixed collaboration fee (₹20,000 – ₹50,000 depending on reach)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Product PR kit included (delivered before campaign start)</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Performance-based bonus for top 10% performing creators</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Follower Range:</span>
                      <span className="text-black"> {"10K – 200K (micro & mid-tier influencers preferred)"}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* performance expectorations */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Performance Expectorations</h3>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Target Avg. Reach per influencer:</span>
                      <span className="text-black"> 100K+</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Expected Engagement Rate:</span>
                      <span className="text-black"> {">4%"}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Tracking via UTM links + platform insights</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* brand support */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Brand Support</h3>
                <div className="space-y-1">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Content brief + brand guidlines provided</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Dedicated campaign manager for smooth coordination</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Access to brand assets (logos, product images, music snippets)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep8}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep9}
                  className='bg-theme-primary py-5 px-[60px] text-white font-bold text-sm rounded-full'
                >
                  Continue
                </button>
              </div>
            </div>
          </>
        ) : currentStep === 10 ? (
          /* Step 10: Post Campaign */
          <>
            {/* Campaign Summary */}
            <div className="w-full max-w-sm mb-8">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Image src={"/images/brand/loreal.svg"} alt="Brand Logo" fill className='object-cover'/>
                </div>
                <div className="flex-1">
                  <h2 className="font-extrabold text-black">{campaignName}</h2>
                  <p className="font-medium text-black">{brandName}</p>
                  <p className="text-[#555] font-medium text-sm">Category: <span className="text-black font-bold">{campaignCategory}</span></p>
                  <p className="text-[#555] font-medium text-sm">Deliverable - <span className="text-black font-bold">{deliverableDisplay}</span></p>
                </div>
              </div>
            </div>

            {/* Post Campaign Options */}
            <div className="w-full max-w-sm space-y-3 mb-12">
              <div className="text-center mb-8">
                <h2 className="font-extrabold text-black">Post this campaign as</h2>
              </div>

              {/* Open for All Campaign Option */}
              <div
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-colors border-dashed ${
                  campaignPostingOption === 'open'
                    ? 'border-theme-primary'
                    : 'border-dashed border-[#E4E4E4]'
                }`}
                onClick={() => setCampaignPostingOption('open')}
              >
                <h3 className={`font-bold text-xl ${campaignPostingOption === 'open' ? 'text-theme-primary' : 'text-black'} mb-2`}>Open for All Campaign</h3>
                <p className="text-sm font-medium text-[#999] leading-relaxed">
                  Make this campaign visible to the entire influencer community. Any eligible creator can view details and apply to collaborate.
                </p>
              </div>

              {/* Invite Only Campaign Option */}
              <div
                className={`p-6 border-2 rounded-2xl cursor-pointer transition-colors border-dashed ${
                  campaignPostingOption === 'invite'
                    ? 'border-theme-primary'
                    : 'border-[#E4E4E4]'
                }`}
                onClick={() => setCampaignPostingOption('invite')}
              >
                <h3 className={`font-bold text-xl ${campaignPostingOption === 'invite' ? 'text-theme-primary' : 'text-black'} mb-2`}>Invite Only Campaign</h3>
                <p className="text-sm font-medium text-[#999] leading-relaxed">
                  Keep this campaign exclusive and share it only with selected influencers. Handpick talent that fits your campaign vision.
                </p>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p- bg-white border-t border-gray-200">
              {/* Upload Button */}
            {campaignPostingOption === 'open' && (
              <ArrowFilledButton text='Upload As open for all' onClick={() => setShowSuccessscreen(true)} textCenter={true}/>
            )}

            {campaignPostingOption === 'invite' && (
              <ArrowFilledButton text='Invite Influencers' onClick={() => setShowSearchScreen(true)} textCenter={true}/>
            )}
            </div>
          </> 
        ) : (
          /* Default case - should not reach here */
          <div>Invalid step</div>
        )}
          </>
        )}
      </div>
    </div>
  )
}

export default CreateCampaignPage