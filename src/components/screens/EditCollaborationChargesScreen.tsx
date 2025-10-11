"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useMutationApi from '@/hooks/useMutationApi'
import { ChevronLeft } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

interface Platform {
  id: string
  name: string
  icon: string
  contentTypes: ContentType[]
}

interface ContentType {
  id: string
  name: string
  amount: string
}

interface PlatformContentCosts {
  post?: number
  story?: number
  reel?: number
  short?: number
  longVideo?: number
  video?: number
  shorts?: number
}

interface CollaborationCostsPayload {
  instagram?: PlatformContentCosts
  youtube?: PlatformContentCosts
  facebook?: PlatformContentCosts
  linkedin?: PlatformContentCosts
  twitter?: PlatformContentCosts
}

// Define platform key type for better type safety
type PlatformKey = 'instagram' | 'youtube' | 'facebook' | 'linkedin' | 'twitter'

const EditCollaborationChargesScreen = () => {
  const { user, refetchUser } = useAuthContext()
  const router = useRouter()
  const [platforms, setPlatforms] = useState<Platform[]>([])
  const {
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    mode: 'onSubmit'
  })

  // Define all available platforms with their default content types
  const availablePlatforms = {
    facebook: {
      id: 'facebook',
      name: 'Facebook',
      icon: '/images/icons/facebook.svg',
      contentTypes: [
        { id: 'post', name: 'Post', amount: '' },
        { id: 'story', name: 'Story', amount: '' },
        { id: 'reel', name: 'Reel', amount: '' },
      ]
    },
    youtube: {
      id: 'youtube',
      name: 'YouTube',
      icon: '/images/icons/youtube.svg',
      contentTypes: [
        { id: 'short', name: 'Short', amount: '' },
        { id: 'long-video', name: 'Long Video', amount: '' },
      ]
    },
    linkedin: {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: '/images/icons/linkedin.svg',
      contentTypes: [
        { id: 'post', name: 'Post', amount: '' },
      ]
    },
    x: {
      id: 'x',
      name: 'X',
      icon: '/images/icons/x-social.svg',
      contentTypes: [
        { id: 'post', name: 'Post', amount: '' },
      ]
    },
  }

  const morePlatforms = [
    { id: 'facebook', name: 'Facebook', icon: '/images/icons/facebook.svg' },
    { id: 'youtube', name: 'YouTube', icon: '/images/icons/youtube.svg' },
    { id: 'linkedin', name: 'LinkedIn', icon: '/images/icons/linkedin.svg' },
    { id: 'x', name: 'X', icon: '/images/icons/x-social.svg' },
  ]

  const {mutateAsync: updateCollaborationCharge, isPending: updateLoading} = useMutationApi({
    endpoint: 'influencer/profile',
    method: 'PUT',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    onSuccess: () => {
      refetchUser();
      router.back();
    }
  })

  // Populate existing collaboration costs from user data
  useEffect(() => {
    if (user?.collaborationCosts) {
      const initialPlatforms: Platform[] = []

      // Instagram
      if (user.collaborationCosts.instagram) {
        initialPlatforms.push({
          id: 'instagram',
          name: 'Instagram',
          icon: '/images/icons/instagram.svg',
          contentTypes: [
            { id: 'reel', name: 'Reel', amount: user.collaborationCosts.instagram.reel?.toString() || '' },
            { id: 'story', name: 'Story', amount: user.collaborationCosts.instagram.story?.toString() || '' },
            { id: 'post', name: 'Post', amount: user.collaborationCosts.instagram.post?.toString() || '' },
          ]
        })
      }

      // YouTube
      if (user.collaborationCosts.youtube) {
        initialPlatforms.push({
          id: 'youtube',
          name: 'YouTube',
          icon: '/images/icons/youtube.svg',
          contentTypes: [
            { id: 'short', name: 'Short', amount: user.collaborationCosts.youtube.short?.toString() || '' },
            { id: 'long-video', name: 'Long Video', amount: user.collaborationCosts.youtube.longVideo?.toString() || '' },
          ]
        })
      }

      // Facebook
      if (user.collaborationCosts.facebook) {
        initialPlatforms.push({
          id: 'facebook',
          name: 'Facebook',
          icon: '/images/icons/facebook.svg',
          contentTypes: [
            { id: 'post', name: 'Post', amount: user.collaborationCosts.facebook.post?.toString() || '' },
            { id: 'story', name: 'Story', amount: user.collaborationCosts.facebook.story?.toString() || '' },
          ]
        })
      }

      // LinkedIn
      if (user.collaborationCosts.linkedin) {
        initialPlatforms.push({
          id: 'linkedin',
          name: 'LinkedIn',
          icon: '/images/icons/linkedin.svg',
          contentTypes: [
            { id: 'post', name: 'Post', amount: user.collaborationCosts.linkedin.post?.toString() || '' },
          ]
        })
      }

      // Twitter/X
      if (user.collaborationCosts.twitter) {
        initialPlatforms.push({
          id: 'x',
          name: 'X',
          icon: '/images/icons/x-social.svg',
          contentTypes: [
            { id: 'post', name: 'Post', amount: user.collaborationCosts.twitter.post?.toString() || '' },
          ]
        })
      }

      // Set platforms only if we have data
      if (initialPlatforms.length > 0) {
        setPlatforms(initialPlatforms)
      } else {
        // Default platforms if no data exists
        setPlatforms([
          {
            id: 'instagram',
            name: 'Instagram',
            icon: '/images/icons/instagram.svg',
            contentTypes: [
              { id: 'reel', name: 'Reel', amount: '' },
              { id: 'story', name: 'Story', amount: '' },
              { id: 'post', name: 'Post', amount: '' },
            ]
          },
        ])
      }
    } else {
      // Default platforms if no data exists
      setPlatforms([
        {
          id: 'instagram',
          name: 'Instagram',
          icon: '/images/icons/instagram.svg',
          contentTypes: [
            { id: 'reel', name: 'Reel', amount: '' },
            { id: 'story', name: 'Story', amount: '' },
            { id: 'post', name: 'Post', amount: '' },
          ]
        },
        {
          id: 'youtube',
          name: 'YouTube',
          icon: '/images/icons/youtube.svg',
          contentTypes: [
            { id: 'short', name: 'Short', amount: '' },
            { id: 'long-video', name: 'Long Video', amount: '' },
          ]
        }
      ])
    }
  }, [user?.collaborationCosts])

  const handleAmountChange = (platformId: string, contentTypeId: string, value: string) => {
    // Clear error for this field when user types
    const fieldName = `${platformId}-${contentTypeId}`
    clearErrors(fieldName)

    setPlatforms(prev => prev.map(platform => {
      if (platform.id === platformId) {
        return {
          ...platform,
          contentTypes: platform.contentTypes.map(ct =>
            ct.id === contentTypeId ? { ...ct, amount: value } : ct
          )
        }
      }
      return platform
    }))
  }

  const handleAddPlatform = (platformId: string) => {
    // Check if platform already exists
    const platformExists = platforms.some(p => p.id === platformId)

    if (platformExists) {
      console.log('Platform already added')
      return
    }

    // Get the platform configuration
    const platformToAdd = availablePlatforms[platformId as keyof typeof availablePlatforms]

    if (platformToAdd) {
      setPlatforms(prev => [...prev, platformToAdd])
    }
  }

  const handleSave = async () => {
    try {
      // Validate all input fields
      let hasErrors = false

      platforms.forEach(platform => {
        platform.contentTypes.forEach(contentType => {
          if (contentType.amount && contentType.amount.trim() !== '') {
            const fieldName = `${platform.id}-${contentType.id}`
            const amount = contentType.amount.trim()

            // Check if it's a valid number
            if (!/^\d+$/.test(amount)) {
              setError(fieldName, {
                type: 'manual',
                message: 'Please enter a valid number'
              })
              hasErrors = true
            } else if (parseInt(amount) <= 0) {
              setError(fieldName, {
                type: 'manual',
                message: 'Amount must be greater than 0'
              })
              hasErrors = true
            }
          }
        })
      })

      // If there are validation errors, stop submission
      if (hasErrors) {
        return
      }

      // Transform platforms data to match the API format
      const collaborationCosts: CollaborationCostsPayload = {}

      platforms.forEach(platform => {
        // Convert 'x' to 'twitter' for API compatibility
        const platformKey: PlatformKey = (platform.id === 'x' ? 'twitter' : platform.id) as PlatformKey

        // Validate platform key
        if (!['instagram', 'youtube', 'facebook', 'linkedin', 'twitter'].includes(platformKey)) {
          console.warn(`Invalid platform key: ${platformKey}`)
          return
        }

        const platformCosts: PlatformContentCosts = {}

        platform.contentTypes.forEach(contentType => {
          // Map content type IDs to match API expectations
          let contentKey = contentType.id

          // Handle special mappings
          if (contentKey === 'long-video') {
            contentKey = 'longVideo' // YouTube long video maps to 'video'
          } else if (contentKey === 'short' && platformKey === 'youtube') {
            contentKey = 'short' // YouTube short maps to 'shorts'
          }

          // Only add if amount is provided and is a valid number
          const amount = parseInt(contentType.amount)
          if (contentType.amount && !isNaN(amount) && amount > 0) {
            // Use type assertion for dynamic key assignment
            platformCosts[contentKey as keyof PlatformContentCosts] = amount
          }
        })

        // Only add platform if it has content types with amounts
        if (Object.keys(platformCosts).length > 0) {
          collaborationCosts[platformKey] = platformCosts
        }
      })
  
      // Create URL-encoded payload
      const params = new URLSearchParams()
  
      // Add each platform's costs as separate form fields
      Object.entries(collaborationCosts).forEach(([platform, costs]) => {
        if (costs) {
          Object.entries(costs).forEach(([contentType, value]) => {
            if (typeof value === 'number') {
              params.append(
                `collaborationCosts[${platform}][${contentType}]`,
                value.toString()
              )
            }
          })
        }
      })
  
      await updateCollaborationCharge(Object.fromEntries(params.entries()))
    } catch (error) {
      console.error('Error saving collaboration charges:', error)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-1">
            <ChevronLeft size={20} className="text-black" />
          </button>
          <h1 className="text-lg font-semibold text-black">Edit Collaboration Charges</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="p-4 pb-32">
        {/* Platform Sections */}
        {platforms.map((platform) => (
          <div key={platform.id} className="mb-6">
            <h2 className="text-base font-semibold text-black mb-3">{platform.name}</h2>

            {/* Content Types */}
            <div className="space-y-3">
              {platform.contentTypes.map((contentType) => {
                const fieldName = `${platform.id}-${contentType.id}`
                const fieldError = errors[fieldName]

                return (
                  <div key={contentType.id}>
                    <div
                      className={`flex items-center justify-between p-4 bg-white border rounded-lg ${
                        fieldError ? 'border-red-500' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 relative">
                          <Image
                            src={platform.icon}
                            alt={platform.name}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                        <span className="font-medium text-black">{contentType.name}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <span className="text-gray-400">|</span>
                        <input
                          type="text"
                          placeholder="Add Amount"
                          inputMode="numeric"
                          pattern="[0-9]*"
                          value={contentType.amount}
                          onChange={(e) => handleAmountChange(platform.id, contentType.id, e.target.value)}
                          className={`w-32 text-right placeholder:text-gray-400 focus:outline-none ${
                            fieldError ? 'text-red-500' : 'text-gray-400 focus:text-black'
                          }`}
                        />
                      </div>
                    </div>
                    {fieldError && (
                      <p className="text-red-500 text-xs mt-1 ml-1">
                        {fieldError.message as string}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {/* Add More Platforms Section */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px bg-gray-300 flex-1"></div>
            <span className="text-sm text-gray-500 font-medium">ADD FOR MORE PLATFORM</span>
            <div className="h-px bg-gray-300 flex-1"></div>
          </div>

          {/* Platform Icons */}
          <div className="flex items-center justify-center gap-4">
            {morePlatforms
              .filter(platform => !platforms.some(p => p.id === platform.id))
              .map((platform) => (
                <button
                  key={platform.id}
                  onClick={() => handleAddPlatform(platform.id)}
                  className="w-12 h-12 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-colors"
                >
                  <Image
                    src={platform.icon}
                    alt={platform.name}
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Fixed Continue Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E4E4E4]">
        <ArrowFilledButton
          text={updateLoading ? 'Saving...' : 'Save Changes'}
          textCenter={true}
          disabled={updateLoading}
          onClick={handleSave}
        />
      </div>
    </div>
  )
}

export default EditCollaborationChargesScreen