"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import { ChevronLeft, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from "react-hook-form"

interface EditSocialLinksFormData {
  instagram?: string
  youtube?: string
  facebook?: string
  linkedin?: string
  twitter?: string
}

interface SocialLinksPayload {
  instagramUrl?: string
  youtubeUrl?: string
  facebookUrl?: string
  linkedinUrl?: string
  twitterUrl?: string
}

interface SocialPlatform {
  key: keyof EditSocialLinksFormData
  name: string
  icon: string
  placeholder: string
  color: string
}

const socialPlatforms: SocialPlatform[] = [
  {
    key: 'instagram',
    name: 'Instagram',
    icon: '/images/icons/instagram.svg',
    placeholder: 'https://instagram.com/yourusername',
    color: 'bg-gradient-to-r from-purple-500 to-pink-500'
  },
  {
    key: 'youtube',
    name: 'YouTube',
    icon: '/images/icons/youtube.svg',
    placeholder: 'https://youtube.com/@yourchannel',
    color: 'bg-red-500'
  },
  {
    key: 'facebook',
    name: 'Facebook',
    icon: '/images/icons/facebook.svg',
    placeholder: 'https://facebook.com/yourpage',
    color: 'bg-blue-600'
  },
  {
    key: 'linkedin',
    name: 'LinkedIn',
    icon: '/images/icons/linkedin.svg',
    placeholder: 'https://linkedin.com/in/yourprofile',
    color: 'bg-blue-700'
  },
  {
    key: 'twitter',
    name: 'X (Twitter)',
    icon: '/images/icons/x-social.svg',
    placeholder: 'https://x.com/yourusername',
    color: 'bg-black'
  }
]

const EditSocialLinksScreen = () => {
  const { user, refetchUser } = useAuthContext()
  const router = useRouter()
  const [activePlatforms, setActivePlatforms] = useState<Set<string>>(new Set([]))

  const {mutateAsync: updateSocialLinks, isPending: updateLoading} = useMutationApi({
    endpoint: 'influencer/profile',
    method: 'PUT',
    onSuccess: () => {
      refetchUser()
    }
  })

  // Initialize react-hook-form
  const { handleSubmit, register, formState: { errors }, setValue } = useForm<EditSocialLinksFormData>({
    defaultValues: {
      instagram: "",
      youtube: "",
      facebook: "",
      linkedin: "",
      twitter: "",
    },
    mode: "onChange"
  })

  // Populate form with existing user social links
  useEffect(() => {
    if (user?.socialLinks) {
      const platforms = new Set() // Always show Instagram and YouTube

      if (user.socialLinks.instagram) {
        setValue("instagram", user.socialLinks.instagram)
        platforms.add('instagram') 
      }
      if (user.socialLinks.youtube) {
        setValue("youtube", user.socialLinks.youtube)
        platforms.add('youtube')
      }
      if (user.socialLinks.facebook) {
        setValue("facebook", user.socialLinks.facebook)
        platforms.add('facebook')
      }
      if (user.socialLinks.linkedin) {
        setValue("linkedin", user.socialLinks.linkedin)
        platforms.add('linkedin')
      }
      if (user.socialLinks.twitter) {
        setValue("twitter", user.socialLinks.twitter)
        platforms.add('twitter')
      }

      setActivePlatforms(platforms as Set<string>)
    }
  }, [user, setValue])

  const addPlatform = (platform: string) => {
    setActivePlatforms(prev => new Set([...prev, platform]))
  }

  const removePlatform = (platform: string) => {
    if (platform === 'instagram' || platform === 'youtube') return // Don't allow removing these

    setActivePlatforms(prev => {
      const newSet = new Set(prev)
      newSet.delete(platform)
      return newSet
    })
    setValue(platform as keyof EditSocialLinksFormData, "")
  }

  const onSubmit = async (data: EditSocialLinksFormData) => {
    try {
      // Filter out empty values and create individual URL fields
      const payload = Object.entries(data).reduce((acc, [key, value]) => {
        if (value && value.trim()) {
          // Convert platform keys to URL field names (e.g., instagram -> instagramUrl)
          const urlFieldName = `${key}Url` as keyof SocialLinksPayload
          acc[urlFieldName] = value.trim()
        }
        return acc
      }, {} as SocialLinksPayload)

      console.log(payload);

      await updateSocialLinks(payload as unknown as DynamicMutationPayload)

      // Refetch user data to ensure we have the latest
      refetchUser()
    } catch (error) {
      console.error('Error updating social links:', error)
    }
  }

  const availablePlatforms = socialPlatforms.filter(platform => !activePlatforms.has(platform.key))

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1"
          >
            <ChevronLeft size={20} className="text-black" />
          </button>
          <h1 className="font-bold text-black">Edit Social Links</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <div className="flex-1 p-4">
          <div className="space-y-6">
            <h2 className="font-bold text-black">Add Social Link</h2>

            {/* Active Social Platforms */}
            <div className="space-y-4">
              {socialPlatforms
                .filter(platform => activePlatforms.has(platform.key))
                .map((platform) => (
                  <div key={platform.key} className="relative">
                    <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg">
                      <div className={`w-8 h-8 rounded flex items-center justify-center`}>
                        <Image
                          src={platform.icon}
                          alt={platform.name}
                          width={32}
                          height={32}
                          className=""
                        />
                      </div>
                      <input
                        {...register(platform.key, {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Please enter a valid URL starting with http:// or https://"
                          }
                        })}
                        type="url"
                        placeholder={platform.placeholder}
                        className="flex-1 bg-transparent outline-none text-sm text-gray-600"
                      />
                        <button
                          type="button"
                          onClick={() => removePlatform(platform.key)}
                          className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                        >
                          <X size={12} className="text-gray-600" />
                        </button>
                    </div>
                    {errors[platform.key] && (
                      <p className="text-red-500 text-sm mt-1">{errors[platform.key]?.message}</p>
                    )}
                  </div>
                ))}
            </div>

            {/* Add More Links */}
            {availablePlatforms.length > 0 && (
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-x-2.5 mb-4">
                    <div className='w-10 h-0.5 bg-gradient-to-r from-white to-[#222]'/>
                    <span className="text-xs font-bold text-black tracking-wider">ADD MORE LINKS</span>
                    <div className='w-10 h-0.5 bg-gradient-to-r from-[#222] to-white'/>
                </div>

                <div className="flex justify-center gap-4">
                  {availablePlatforms.map((platform) => (
                    <button
                      key={platform.key}
                      type="button"
                      onClick={() => addPlatform(platform.key)}
                      className={`w-12 h-12 rounded-xl flex items-center justify-center hover:opacity-80 transition-opacity border border-[#E4E4E4]`}
                    >
                      <Image
                        src={platform.icon}
                        alt={platform.name}
                        width={32}
                        height={32}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="p-4 bg-white border-t border-[#E4E4E4] fixed bottom-0 w-full">
          <ArrowFilledButton
            text={updateLoading ? "Saving..." : "Save Changes"}
            textCenter={true}
            onClick={handleSubmit(onSubmit)}
            disabled={updateLoading}
          />
        </div>
      </form>
    </div>
  )
}

export default EditSocialLinksScreen