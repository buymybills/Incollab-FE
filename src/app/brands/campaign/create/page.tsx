"use client"
import { NichesData } from '@/app/auth/brands/profile/page'
import { useAuthContext } from '@/auth/context/auth-provider'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import InviteInfluencersScreen from '@/components/screens/InviteInfluencersScreen'
import SearchScreen from '@/components/screens/SearchScreen'
import SuccessfulScreen from '@/components/screens/SuccessfulScreen'
import useFetchApi from '@/hooks/useFetchApi'
import useMutationApi from '@/hooks/useMutationApi'
import { Influencer } from '@/types/influencer.interface'
import { ChevronDown, Mars, Search, Venus, X } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Deliverable {
  platform: 'instagram' | 'facebook' | 'youtube' | 'linkedin' | 'twitter'
  type: 'instagram_reel' | 'instagram_story' | 'instagram_post' | 
        'facebook_post' | 'facebook_story' | 
        'youtube_long_video' | 'youtube_short' | 
        'linkedin_post' | 'linkedin_article' | 
        'twitter_post' | 'twitter_thread'
  budget: number
  quantity: number
  specifications: string
}

interface CityData {
  id: number;
  name: string;
  state: string;
  countryId: number;
  tier: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PostCampaignResponse {
  id: number;
  message: string;
}

interface SearchedCityData{
  id: number;
  name: string;
  state: string;
  tier: number;
}

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
  const [campaignId, setCampaignId] = useState<number | undefined>(undefined)
  const [brandNiches, setBrandNiches] = useState<{ id: string; name: string; description: string; }[]>([])
  const router = useRouter();

  const {user} = useAuthContext();

  console.log(user?.profileMedia?.profileImage)

  const {data: nichesData} = useFetchApi<NichesData>({
      endpoint: "auth/niches",
    })
  
    useEffect(() => {
      if (nichesData) {
        setBrandNiches(nichesData.niches)
      }
    }, [nichesData])

  // Influencer Preference States
  const [minAge, setMinAge] = useState<string>('18')
  const [maxAge, setMaxAge] = useState<string>('24')
  const [openToAllAges, setOpenToAllAges] = useState<boolean>(false)
  const [selectedGender, setSelectedGender] = useState<string>('Male')
  const [openToAllGenders, setOpenToAllGenders] = useState<boolean>(false)
  const [selectedNiches, setSelectedNiches] = useState<string[]>([])

  // Step 5 - Location Selection States
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<string>('')
  const [selectedCities, setSelectedCities] = useState<number[]>([]) // Store city IDs
  const [panIndiaSelected, setPanIndiaSelected] = useState<boolean>(false)

  // Debounce effect for city search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 700);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

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

  // Validation Error States
  const [errors, setErrors] = useState({
    campaignName: '',
    deliverableText: '',
    campaignDescription: '',
    minAge: '',
    maxAge: '',
    selectedCities: '',
    collaborationCosts: '',
    performanceExpectations: '',
    brandSupport: '',
    campaignPostingOption: ''
  })

  const handleContinueStep1 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!campaignName.trim()) {
      newErrors.campaignName = 'Campaign name is required'
      hasError = true
    } else {
      newErrors.campaignName = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(2)
    }
  }

  const {mutateAsync: postCampaign, isPending: isPostingCampaign} = useMutationApi <PostCampaignResponse>({
    endpoint: 'campaign',
    method: 'POST',
  })

  const {data: citiesResponse} = useFetchApi<CityData[]>({
    endpoint: 'campaign/cities/popular',
  })

  const {data: searchedCity, retrieve: fetchSearchedCities} = useFetchApi<SearchedCityData[]>({
    endpoint: 'campaign/cities/search',
    options:{
      params:{
        searchQuery: debouncedSearchQuery
      }
    },
    retrieveOnMount: false,
    cacheEnabled: false
  })

  // Trigger search API when debounced query changes
  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      fetchSearchedCities();
    }
  }, [debouncedSearchQuery]);

  const cities = citiesResponse || [];

  const prepareCampaignData = () => {
    // Build deliverables array from collaboration costs
    const deliverables: Deliverable[] = [];

    // Instagram deliverables
    if (collaborationCosts.instagram.reel) {
      deliverables.push({
        platform: "instagram",
        type: "instagram_reel",
        budget: parseFloat(collaborationCosts.instagram.reel),
        quantity: 1,
        specifications: ""
      });
    }
    if (collaborationCosts.instagram.story) {
      deliverables.push({
        platform: "instagram",
        type: "instagram_story",
        budget: parseFloat(collaborationCosts.instagram.story),
        quantity: 1,
        specifications: ""
      });
    }
    if (collaborationCosts.instagram.post) {
      deliverables.push({
        platform: "instagram",
        type: "instagram_post",
        budget: parseFloat(collaborationCosts.instagram.post),
        quantity: 1,
        specifications: ""
      });
    }

    // Facebook deliverables
    if (selectedPlatforms.includes('facebook')) {
      if (collaborationCosts.facebook.post) {
        deliverables.push({
          platform: "facebook",
          type: "facebook_post",
          budget: parseFloat(collaborationCosts.facebook.post),
          quantity: 1,
          specifications: ""
        });
      }
      if (collaborationCosts.facebook.story) {
        deliverables.push({
          platform: "facebook",
          type: "facebook_story",
          budget: parseFloat(collaborationCosts.facebook.story),
          quantity: 1,
          specifications: ""
        });
      }
    }

    // YouTube deliverables
    if (selectedPlatforms.includes('youtube')) {
      if (collaborationCosts.youtube.video) {
        deliverables.push({
          platform: "youtube",
          type: "youtube_long_video",
          budget: parseFloat(collaborationCosts.youtube.video),
          quantity: 1,
          specifications: ""
        });
      }
      if (collaborationCosts.youtube.shorts) {
        deliverables.push({
          platform: "youtube",
          type: "youtube_short",
          budget: parseFloat(collaborationCosts.youtube.shorts),
          quantity: 1,
          specifications: ""
        });
      }
    }

    // LinkedIn deliverables
    if (selectedPlatforms.includes('linkedin')) {
      if (collaborationCosts.linkedin.post) {
        deliverables.push({
          platform: "linkedin",
          type: "linkedin_post",
          budget: parseFloat(collaborationCosts.linkedin.post),
          quantity: 1,
          specifications: ""
        });
      }
      if (collaborationCosts.linkedin.article) {
        deliverables.push({
          platform: "linkedin",
          type: "linkedin_article",
          budget: parseFloat(collaborationCosts.linkedin.article),
          quantity: 1,
          specifications: ""
        });
      }
    }

    // Twitter deliverables
    if (selectedPlatforms.includes('twitter')) {
      if (collaborationCosts.twitter.post) {
        deliverables.push({
          platform: "twitter",
          type: "twitter_post",
          budget: parseFloat(collaborationCosts.twitter.post),
          quantity: 1,
          specifications: ""
        });
      }
      if (collaborationCosts.twitter.thread) {
        deliverables.push({
          platform: "twitter",
          type: "twitter_thread",
          budget: parseFloat(collaborationCosts.twitter.thread),
          quantity: 1,
          specifications: ""
        });
      }
    }

    // Prepare gender preferences
    const genderPreferences = openToAllGenders ? [] : [selectedGender];

    return {
      name: campaignName,
      description: campaignDescription,
      category: campaignCategory,
      deliverableFormat: deliverableText,
      isPanIndia: panIndiaSelected,
      cityIds: selectedCities,
      minAge: parseInt(minAge),
      maxAge: parseInt(maxAge),
      isOpenToAllAges: openToAllAges,
      genderPreferences,
      isOpenToAllGenders: openToAllGenders,
      nicheIds: selectedNiches,
      customInfluencerRequirements: customInfluencerRequirement,
      performanceExpectations,
      brandSupport,
      deliverables
    };
  };

  const handleCreateCampaign = async (isInviteOnly: boolean) => {
    try {
      const campaignData = prepareCampaignData();
      const response = await postCampaign(campaignData);

      // Assuming the response contains the campaign ID
      if (response?.id) {
        setCampaignId(response.id);
      }

      // Navigate based on campaign type
      if (isInviteOnly) {
        setShowSearchScreen(true);
      } else {
        setShowSuccessscreen(true);
      }
    } catch (error) {
      console.error('Failed to create campaign:', error);
    }
  };

  const handleContinueStep2 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!deliverableText.trim()) {
      newErrors.deliverableText = 'Deliverable format is required'
      hasError = true
    } else {
      newErrors.deliverableText = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(3)
    }
  }

  const handleContinueStep3 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!campaignDescription.trim()) {
      newErrors.campaignDescription = 'Campaign description is required'
      hasError = true
    } else {
      newErrors.campaignDescription = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(4)
    }
  }

  const handleContinueStep4 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!openToAllAges) {
      const minAgeNum = parseInt(minAge)
      const maxAgeNum = parseInt(maxAge)

      if (minAgeNum > maxAgeNum) {
        newErrors.maxAge = 'Maximum age must be greater than minimum age'
        hasError = true
      } else {
        newErrors.minAge = ''
        newErrors.maxAge = ''
      }
    } else {
      newErrors.minAge = ''
      newErrors.maxAge = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(5)
    }
  }

  const handleContinueStep5 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!panIndiaSelected && selectedCities.length === 0) {
      newErrors.selectedCities = 'Please select at least one city or choose Pan-India'
      hasError = true
    } else {
      newErrors.selectedCities = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(6)
    }
  }

  const handleContinueStep6 = () => {
    let hasError = false
    const newErrors = { ...errors }

    // Check if at least one Instagram cost is filled
    const hasInstagramCost = collaborationCosts.instagram.reel ||
                            collaborationCosts.instagram.story ||
                            collaborationCosts.instagram.post

    if (!hasInstagramCost) {
      newErrors.collaborationCosts = 'Please add at least one Instagram collaboration cost'
      hasError = true
    } else {
      newErrors.collaborationCosts = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(7)
    }
  }

  const handleContinueStep7 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!performanceExpectations.trim()) {
      newErrors.performanceExpectations = 'Performance expectations are required'
      hasError = true
    } else {
      newErrors.performanceExpectations = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(8)
    }
  }

  const handleContinueStep8 = () => {
    let hasError = false
    const newErrors = { ...errors }

    if (!brandSupport.trim()) {
      newErrors.brandSupport = 'Brand support information is required'
      hasError = true
    } else {
      newErrors.brandSupport = ''
    }

    setErrors(newErrors)
    if (!hasError) {
      setCurrentStep(9)
    }
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

  // Age and Gender options
  const ageOptions = Array.from({ length: 48 }, (_, i) => (18 + i).toString())
  const genderOptions = ['Male', 'Female', 'Others']

  // Filter cities based on search query - use API results
  const filteredCities = searchQuery.length > 0 && searchedCity
    ? searchedCity.filter(city => !selectedCities.includes(city.id))
    : []

  // Handler functions for preferences
  const handleNicheToggle = (nicheId: string) => {
    setSelectedNiches(prev =>
      prev.includes(nicheId)
        ? prev.filter(n => n !== nicheId)
        : [...prev, nicheId]
    )
  }

  console.log({selectedNiches});

  // Handler functions for location selection
  const handleCityToggle = (cityId: number) => {
    if (panIndiaSelected) {
      setPanIndiaSelected(false)
    }
    setSelectedCities(prev =>
      prev.includes(cityId)
        ? prev.filter(c => c !== cityId)
        : [...prev, cityId]
    )
    if (errors.selectedCities) {
      setErrors({ ...errors, selectedCities: '' })
    }
  }

  const handlePanIndiaToggle = () => {
    setPanIndiaSelected(!panIndiaSelected)
    if (!panIndiaSelected) {
      setSelectedCities([])
    }
    if (errors.selectedCities) {
      setErrors({ ...errors, selectedCities: '' })
    }
  }

  const handleRemoveCity = (cityId: number) => {
    setSelectedCities(prev => prev.filter(id => id !== cityId))
  }

  const handleCollaborationCostChange = (platform: string, type: string, value: string) => {
    setCollaborationCosts(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform as keyof typeof prev],
        [type]: value
      }
    }))
    if (errors.collaborationCosts) {
      setErrors({ ...errors, collaborationCosts: '' })
    }
  }

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  const ProgressIndicator = () => (
    <div className="w-full mb-8">
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
    <div className="w-full mb-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-black rounded-full flex items-center overflow-hidden justify-center relative">
          <Image src={user?.profileMedia?.profileImage ?? "/default.png"} alt="Brand Logo" fill className='object-cover'/>
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
          <SuccessfulScreen heading="Campaign Created" subHeading="Your campaign has been created successfully" onBack={() => router.push("/brands/me")}/>
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
            campaignId={campaignId}
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
            <div className="w-full space-y-6">
              {/* Campaign Name Field */}
              <div>
                <label className="font-bold text-black">
                  Campaign Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Full Name*"
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value)
                    if (errors.campaignName) {
                      setErrors({ ...errors, campaignName: '' })
                    }
                  }}
                  className={`mt-2 w-full py-4 px-6 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white placeholder-gray-400 ${errors.campaignName ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.campaignName && (
                  <p className="text-red-500 text-xs mt-1">{errors.campaignName}</p>
                )}
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
            <div className="w-full space-y-6">
              <div>
                <h2 className="text-lg font-bold text-black mb-4">Deliverable Format</h2>
                <div className="relative">
                  <textarea
                    placeholder="Add Deliverable*"
                    value={deliverableText}
                    onChange={(e) => {
                      setDeliverableText(e.target.value)
                      if (errors.deliverableText) {
                        setErrors({ ...errors, deliverableText: '' })
                      }
                    }}
                    maxLength={1000}
                    className={`w-full h-64 p-4 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white placeholder-[#999] resize-none ${errors.deliverableText ? 'border-red-500' : 'border-[#E4E4E4]'}`}
                  />
                  <div className="absolute -bottom-4 right-3 text-xs text-black">
                    {deliverableText?.length}/1,000
                  </div>
                </div>
                {errors.deliverableText && (
                  <p className="text-red-500 text-xs mt-1">{errors.deliverableText}</p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep1}
                  className='bg-white py-5 flex-1 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep2}
                  className='bg-theme-primary flex-1 py-5 px-[60px] text-white font-bold text-sm rounded-full'
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
            <div className="w-full space-y-6">
              <div>
                <h2 className="text-lg font-bold text-black mb-4">Campaign Description</h2>
                <div className="relative">
                  <textarea
                    placeholder="Add Campaign Detail*"
                    value={campaignDescription}
                    onChange={(e) => {
                      setCampaignDescription(e.target.value)
                      if (errors.campaignDescription) {
                        setErrors({ ...errors, campaignDescription: '' })
                      }
                    }}
                    maxLength={10000}
                    className={`w-full h-64 p-4 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black bg-white placeholder-[#999] resize-none ${errors.campaignDescription ? 'border-red-500' : 'border-[#E4E4E4]'}`}
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-black">
                    {campaignDescription?.length}/10,000
                  </div>
                </div>
                {errors.campaignDescription && (
                  <p className="text-red-500 text-xs mt-1">{errors.campaignDescription}</p>
                )}
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep2}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full flex-1'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep3}
                  className='bg-theme-primary flex-1 py-5 px-[60px] text-white font-bold text-sm rounded-full'
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
            <div className="w-full space-y-8">
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
                        onChange={(e) => {
                          setMaxAge(e.target.value)
                          if (errors.maxAge) {
                            setErrors({ ...errors, maxAge: '' })
                          }
                        }}
                        className={`w-full py-4 px-6 border rounded-full font-bold text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent appearance-none bg-white text-black ${errors.maxAge ? 'border-red-500' : 'border-[#E4E4E4]'}`}
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

                {errors.maxAge && (
                  <p className="text-red-500 text-xs mt-1">{errors.maxAge}</p>
                )}

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
                  {brandNiches.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => handleNicheToggle(niche.id)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-full border font-medium text-sm transition-colors ${
                        selectedNiches.includes(niche.id)
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <span>{niche.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* custom influencer requirements */}
              <div className="w-full space-y-6 pb-24">
                <div>
                  <h2 className="text-lg font-bold text-black mb-4">Add Custom Influencer Requirements</h2>
                  <div className="relative">
                    <textarea
                      placeholder="Add Custom Requirements*"
                      value={customInfluencerRequirement}
                      onChange={(e) => setCustomInfluencerRequirement(e.target.value)}
                      maxLength={10000}
                      className="w-full h-64 p-4 border border-[#E4E4E4] rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-black bg-white placeholder-[#999] resize-none"
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
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full flex-1'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep4}
                  className='bg-theme-primary flex-1 py-5 px-[60px] text-white font-bold text-sm rounded-full'
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
            <div className="w-full mb-6">
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
                      key={city.id}
                      onClick={() => {
                        handleCityToggle(city.id)
                        setSearchQuery('')
                      }}
                      disabled={panIndiaSelected}
                      className={`w-full px-4 py-3 text-left text-sm hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors ${
                        panIndiaSelected ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'
                      }`}
                    >
                      {city.name}, {city.state}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Cities Section */}
            {selectedCities.length > 0 && !panIndiaSelected && (
              <div className="w-full mb-6">
                <h3 className="text-lg font-bold text-black mb-4">Selected Cities</h3>
                <div className="flex flex-wrap gap-3">
                  {selectedCities.map((cityId) => {
                    const city = cities.find(c => c.id === cityId);
                    if (!city) return null;
                    return (
                      <button
                        key={cityId}
                        onClick={() => handleRemoveCity(cityId)}
                        className="flex items-center gap-2 px-4 py-2 bg-theme-primary text-white rounded-full text-sm font-medium transition-colors"
                      >
                        <span>{city.name}</span>
                        <div className="flex-shrink-0 bg-white rounded-full w-4 h-4 flex items-center justify-center">
                          <X size={12} className='text-theme-primary'/>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Popular Cities Section */}
            <div className="w-full mb-8">
              <h3 className="text-lg font-bold text-black mb-4">Popular Cities</h3>
              <div className="flex flex-wrap gap-3">
                {cities
                  .filter(city => !selectedCities.includes(city.id))
                  .slice(0, 20) // Show first 20 cities from API
                  .map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCityToggle(city.id)}
                    disabled={panIndiaSelected}
                    className={`px-6 py-3 rounded-full border font-medium text-sm transition-colors ${
                      panIndiaSelected
                        ? 'bg-gray-200 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {city.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Pan-India Option */}
            <div className="w-full mb-8">
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
              {errors.selectedCities && (
                <p className="text-red-500 text-xs mt-2 text-center">{errors.selectedCities}</p>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <button
                  onClick={handleBackToStep4}
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full flex-1'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep5}
                  className='bg-theme-primary flex-1 py-5 px-[60px] text-white font-bold text-sm rounded-full'
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

            <div className="w-full space-y-6">
                {errors.collaborationCosts && (
                  <p className="text-red-500 text-xs">{errors.collaborationCosts}</p>
                )}
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
                        className="text-black bg-transparent outline-none"
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
                        className="text-black bg-transparent outline-none"
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
                        className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                          className="text-black bg-transparent outline-none"
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
                  className='bg-white py-5 px-[60px] text-theme-primary border border-theme-primary font-bold text-sm rounded-full flex-1'
                >
                  Back
                </button>
                <button
                  onClick={handleContinueStep6}
                  className='bg-theme-primary flex-1 py-5 px-[60px] text-white font-bold text-sm rounded-full'
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
            <div className="w-full space-y-6">
              <div className="relative">
                <textarea
                  placeholder="Add Deliverable"
                  value={performanceExpectations}
                  onChange={(e) => {
                    setPerformanceExpectations(e.target.value)
                    if (errors.performanceExpectations) {
                      setErrors({ ...errors, performanceExpectations: '' })
                    }
                  }}
                  maxLength={1000}
                  className={`w-full h-64 p-4 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-black bg-white placeholder-[#999] resize-none ${errors.performanceExpectations ? 'border-red-500' : 'border-[#E4E4E4]'}`}
                />
                <div className="absolute -bottom-3 right-3 text-xs text-black">
                  {performanceExpectations?.length}/1,000
                </div>
              </div>
              {errors.performanceExpectations && (
                <p className="text-red-500 text-xs mt-1">{errors.performanceExpectations}</p>
              )}
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
            <div className="w-full space-y-6">
              <div className="relative">
                <textarea
                  placeholder="Add Deliverable"
                  value={brandSupport}
                  onChange={(e) => {
                    setBrandSupport(e.target.value)
                    if (errors.brandSupport) {
                      setErrors({ ...errors, brandSupport: '' })
                    }
                  }}
                  maxLength={500}
                  className={`w-full h-64 p-4 border rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent text-black bg-white placeholder-[#999] resize-none ${errors.brandSupport ? 'border-red-500' : 'border-[#E4E4E4]'}`}
                />
                <div className="absolute -bottom-3 right-3 text-xs text-black">
                  {brandSupport?.length}/500
                </div>
              </div>
              {errors.brandSupport && (
                <p className="text-red-500 text-xs mt-1">{errors.brandSupport}</p>
              )}
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
            <div className="w-full space-y-6">
              {/* Title */}
              <div className="text-left mb-6">
                <h1 className="font-extrabold text-black">
                  Review Campaign
                </h1>
              </div>

              {/* Campaign Overview Card */}
              <div className="flex items-start gap-4 mb-8">
                <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Image src={user?.profileMedia?.profileImage ?? '/default-avatar.png'} alt="Brand Logo" fill className='object-cover'/>
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
                  {campaignDescription}
                </p>
              </div>

              {/* Deliverable Section */}
              <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">Deliverable</h3>
                <p className="text-sm text-black font-medium leading-relaxed whitespace-pre-wrap">
                  {deliverableText}
                </p>
              </div>

              {/* influencer requirements */}
              <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">Influencer Requirements</h3>
                <div className="space-y-2">
                  {selectedNiches.length > 0 && (
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                      <div className='text-sm font-bold'>
                        <span className="text-black">Niche: </span>
                        <span className="text-black">
                          {selectedNiches
                            .map(nicheId => brandNiches.find(n => n.id === nicheId)?.name)
                            .filter(Boolean)
                            .join(', ')}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Age Range: </span>
                      <span className="text-black">
                        {openToAllAges ? 'Open to all ages' : `${minAge} - ${maxAge} years old`}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                    <div className='text-sm font-bold'>
                      <span className="text-black">Gender: </span>
                      <span className="text-black">
                        {openToAllGenders ? 'Open to all genders' : selectedGender}
                      </span>
                    </div>
                  </div>
                  {selectedPlatforms.length > 0 && (
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                      <div className='text-sm font-bold'>
                        <span className="text-black">Platforms: </span>
                        <span className="text-black capitalize">{selectedPlatforms.join(', ')}</span>
                      </div>
                    </div>
                  )}
                  {customInfluencerRequirement && (
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                      <div className='text-sm font-bold'>
                        <span className="text-black">Custom Requirements: </span>
                        <span className="text-black">{customInfluencerRequirement}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

               {/* Active Regions */}
              <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">Active Regions</h3>
                <p className='font-bold text-sm'>
                  {panIndiaSelected
                    ? 'Pan-India'
                    : selectedCities
                        .map(cityId => cities.find(c => c.id === cityId)?.name)
                        .filter(Boolean)
                        .join(', ')
                  }
                </p>
              </div>

               {/* rewards compensation */}
               <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">Rewards/Compensation</h3>
                <div className="space-y-2">
                  {/* Instagram Costs */}
                  {(collaborationCosts.instagram.reel || collaborationCosts.instagram.story || collaborationCosts.instagram.post) && (
                    <div>
                      <p className='text-sm font-bold text-black mb-1'>Instagram:</p>
                      <div className="ml-4 space-y-1">
                        {collaborationCosts.instagram.reel && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Reel: ₹{collaborationCosts.instagram.reel}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.instagram.story && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Story: ₹{collaborationCosts.instagram.story}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.instagram.post && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Post: ₹{collaborationCosts.instagram.post}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Facebook Costs */}
                  {selectedPlatforms.includes('facebook') && (collaborationCosts.facebook.post || collaborationCosts.facebook.story) && (
                    <div>
                      <p className='text-sm font-bold text-black mb-1'>Facebook:</p>
                      <div className="ml-4 space-y-1">
                        {collaborationCosts.facebook.post && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Post: ₹{collaborationCosts.facebook.post}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.facebook.story && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Story: ₹{collaborationCosts.facebook.story}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* YouTube Costs */}
                  {selectedPlatforms.includes('youtube') && (collaborationCosts.youtube.video || collaborationCosts.youtube.shorts) && (
                    <div>
                      <p className='text-sm font-bold text-black mb-1'>YouTube:</p>
                      <div className="ml-4 space-y-1">
                        {collaborationCosts.youtube.video && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Video: ₹{collaborationCosts.youtube.video}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.youtube.shorts && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Shorts: ₹{collaborationCosts.youtube.shorts}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* LinkedIn Costs */}
                  {selectedPlatforms.includes('linkedin') && (collaborationCosts.linkedin.post || collaborationCosts.linkedin.article) && (
                    <div>
                      <p className='text-sm font-bold text-black mb-1'>LinkedIn:</p>
                      <div className="ml-4 space-y-1">
                        {collaborationCosts.linkedin.post && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Post: ₹{collaborationCosts.linkedin.post}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.linkedin.article && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Article: ₹{collaborationCosts.linkedin.article}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Twitter Costs */}
                  {selectedPlatforms.includes('twitter') && (collaborationCosts.twitter.post || collaborationCosts.twitter.thread) && (
                    <div>
                      <p className='text-sm font-bold text-black mb-1'>X (Twitter):</p>
                      <div className="ml-4 space-y-1">
                        {collaborationCosts.twitter.post && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Post: ₹{collaborationCosts.twitter.post}</span>
                            </div>
                          </div>
                        )}
                        {collaborationCosts.twitter.thread && (
                          <div className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-black rounded-full mt-2"></div>
                            <div className='text-sm font-bold'>
                              <span className="text-black">Thread: ₹{collaborationCosts.twitter.thread}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* performance expectorations */}
              <div className="mb-8">
                <h3 className="font-extrabold text-black mb-3">Performance Expectations</h3>
                <p className="text-sm text-black font-medium leading-relaxed whitespace-pre-wrap">
                  {performanceExpectations}
                </p>
              </div>

              {/* brand support */}
              <div className="mb-16">
                <h3 className="font-extrabold text-black mb-3">Brand Support</h3>
                <p className="text-sm text-black font-medium leading-relaxed whitespace-pre-wrap">
                  {brandSupport}
                </p>
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
            <div className="w-full mb-8">
              <div className="flex items-start gap-4">
                <div className="relative w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Image src={user?.profileMedia?.profileImage ?? '/default-avatar.png'} alt="Brand Logo" fill className='object-cover'/>
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
            <div className="w-full space-y-3 mb-12">
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
            <div className="fixed bottom-4 px-4 left-0 right-0 bg-white">
              {/* Upload Button */}
            {campaignPostingOption === 'open' && (
              <ArrowFilledButton
                text={isPostingCampaign ? 'Creating Campaign...' : 'Upload As open for all'}
                onClick={() => handleCreateCampaign(false)}
                textCenter={true}
                disabled={isPostingCampaign}
              />
            )}

            {campaignPostingOption === 'invite' && (
              <ArrowFilledButton
                text={isPostingCampaign ? 'Creating Campaign...' : 'Invite Influencers'}
                onClick={() => handleCreateCampaign(true)}
                textCenter={true}
                disabled={isPostingCampaign}
              />
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