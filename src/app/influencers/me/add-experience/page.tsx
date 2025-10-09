"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import useMutationApi from '@/hooks/useMutationApi'
import { ChevronLeft, CirclePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Form data interface
interface SocialLink {
  platform: string
  url: string
  icon: string
  contentType: string
}

interface AddExperienceFormData {
  campaignName: string
  brandCompany: string
  campaignCategory: string
  deliverableFormat: string
  isCompleted: boolean
  roleDescription: string
  keyResults: string
  socialLinks: SocialLink[]
}

const AddExperiencePage = () => {
  const router = useRouter()
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([])
  const {refetchUser} = useAuthContext();

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<AddExperienceFormData>({
    defaultValues: {
      campaignName: '',
      brandCompany: '',
      campaignCategory: '',
      deliverableFormat: '',
      isCompleted: false,
      roleDescription: '',
      keyResults: '',
      socialLinks: []
    },
    mode: 'onChange'
  })

  // Watch form values
  const watchedDeliverableFormat = watch('deliverableFormat')
  const watchedRoleDescription = watch('roleDescription')
  const watchedKeyResults = watch('keyResults')
  const watchedIsCompleted = watch('isCompleted')

  const handleSocialLinkAdd = (platform: string, icon: string) => {
    const newLinks = [...socialLinks, { platform, url: '', icon, contentType: 'post' }]
    setSocialLinks(newLinks)
    setValue('socialLinks', newLinks)
  }

  const handleSocialLinkChange = (index: number, url: string) => {
    const newLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, url } : link
    )
    setSocialLinks(newLinks)
    setValue('socialLinks', newLinks)
  }

  const handleContentTypeChange = (index: number, contentType: string) => {
    const newLinks = socialLinks.map((link, i) =>
      i === index ? { ...link, contentType } : link
    )
    setSocialLinks(newLinks)
    setValue('socialLinks', newLinks)
  }

  const handleSocialLinkRemove = (index: number) => {
    const newLinks = socialLinks.filter((_, i) => i !== index)
    setSocialLinks(newLinks)
    setValue('socialLinks', newLinks)
  }

  const getAvailablePlatforms = () => {
    const allPlatforms = [
      { name: 'facebook', icon: '/images/icons/facebook.svg'},
      { name: 'instagram', icon: '/images/icons/instagram.svg'},
      { name: 'youtube', icon: '/images/icons/youtube.svg'},
      { name: 'linkedin', icon: '/images/icons/linkedin.svg'},
      { name: 'twitter', icon: '/images/icons/x-social.svg' }
    ]
    return allPlatforms.filter(platform =>
      !socialLinks.some(link => link.platform === platform.name)
    )
  }

  const handleBack = () => {
    router.back()
  }

  const { mutateAsync: addExperience } = useMutationApi({
    endpoint: 'influencer/experiences',
    method: 'POST',
    onSuccess: () => {
      refetchUser();
    }
  })

  // Form submission handler
  const onSubmit = async (data: AddExperienceFormData) => {
    // Transform data to match API format
    const payload = {
      campaignName: data.campaignName,
      brandName: data.brandCompany,
      campaignCategory: data.campaignCategory,
      deliverableFormat: data.deliverableFormat,
      successfullyCompleted: data.isCompleted,
      roleDescription: data.isCompleted ? data.roleDescription : undefined,
      keyResultAchieved: data.isCompleted ? data.keyResults : undefined,
      socialLinks: data.isCompleted ? socialLinks.map(link => ({
        platform: link.platform,
        contentType: link.contentType,
        url: link.url
      })) : undefined
    }

    console.log('Payload:', payload)

    try {
      await addExperience(payload)
      // Navigate back on success
      router.back()
    } catch (error) {
      console.error('Error adding experience:', error)
    }
  }

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Header */}
      <div className="flex items-center gap-3 py-3 px-4 border-b border-dashed border-[#E4E4E4]">
        <button onClick={handleBack} className="p-1">
          <ChevronLeft size={24} className="text-gray-700" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900">Add Experience</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Campaign Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Campaign Name*
          </label>
          <input
            type="text"
            placeholder="Enter campaign Name*"
            {...register('campaignName', {
              required: 'Campaign name is required',
              minLength: {
                value: 3,
                message: 'Campaign name must be at least 3 characters'
              }
            })}
            className={`w-full px-4 py-3 border rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent ${
              errors.campaignName ? 'border-red-500' : 'border-[#E4E4E4]'
            }`}
          />
          {errors.campaignName && (
            <p className="text-red-500 text-sm mt-2">{errors.campaignName.message}</p>
          )}
        </div>

        {/* Brand / Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Brand / Company*
          </label>
          <input
            type="text"
            placeholder="Eg. Nykaa"
            {...register('brandCompany', {
              required: 'Brand/Company name is required',
              minLength: {
                value: 2,
                message: 'Brand/Company name must be at least 2 characters'
              }
            })}
            className={`w-full px-4 py-3 border rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent ${
              errors.brandCompany ? 'border-red-500' : 'border-[#E4E4E4]'
            }`}
          />
          {errors.brandCompany && (
            <p className="text-red-500 text-sm mt-2">{errors.brandCompany.message}</p>
          )}
        </div>

        {/* Campaign Category */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Campaign Category*
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Skincare + Makeup"
              {...register('campaignCategory', {
                required: 'Campaign category is required'
              })}
              className={`w-full px-4 py-3 border rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent ${
                errors.campaignCategory ? 'border-red-500' : 'border-[#E4E4E4]'
              }`}
            />
          </div>
          {errors.campaignCategory && (
            <p className="text-red-500 text-sm mt-2">{errors.campaignCategory.message}</p>
          )}
        </div>

        {/* Deliverable Format */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Deliverable Format*
          </label>
          <div className="relative">
            <textarea
              placeholder="Add Deliverable*"
              {...register('deliverableFormat', {
                required: 'Deliverable format is required',
                minLength: {
                  value: 10,
                  message: 'Deliverable format must be at least 10 characters'
                },
                maxLength: {
                  value: 100,
                  message: 'Deliverable format cannot exceed 100 characters'
                }
              })}
              maxLength={100}
              rows={4}
              className={`w-full px-4 py-3 border rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none ${
                errors.deliverableFormat ? 'border-red-500' : 'border-[#E4E4E4]'
              }`}
            />
            <div className='flex items-center justify-between'>
              {errors.deliverableFormat && (
                <p className="text-red-500 flex-1 text-sm mt-2">{errors.deliverableFormat.message}</p>
              )}
              <div className="flex-1 text-end text-xs text-gray-500 mt-2">
                {watchedDeliverableFormat?.length || 0}/100
              </div>
            </div>
          </div>
        </div>

        {/* Successfully Completed Checkbox */}
        <div className={`flex items-center justify-center gap-3 ${socialLinks.length > 0 ? '' : 'pb-4'}`}>
          <label className="flex items-center gap-3 cursor-pointer">
            <span className="text-sm font-bold text-black">
              Successfully Completed this Campaign
            </span>
            <div className="relative">
              <input
                type="checkbox"
                {...register('isCompleted')}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors ${
                watchedIsCompleted
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 bg-white'
              }`}>
                {watchedIsCompleted && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </label>
        </div>

        {/* Additional fields when campaign is completed */}
        {watchedIsCompleted && (
          <>
            {/* Tell Us About your Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Tell Us About your Role In the Campaign*
              </label>
              <div className="relative">
                <textarea
                  placeholder="Add Detail*"
                  {...register('roleDescription', {
                    required: watchedIsCompleted ? 'Role description is required' : false,
                    minLength: watchedIsCompleted ? {
                      value: 20,
                      message: 'Role description must be at least 20 characters'
                    } : undefined,
                    maxLength: {
                      value: 100,
                      message: 'Role description cannot exceed 100 characters'
                    }
                  })}
                  maxLength={100}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none ${
                    errors.roleDescription ? 'border-red-500' : 'border-[#E4E4E4]'
                  }`}
                />
                <div className="text-right text-xs text-gray-500 mt-2">
                  {watchedRoleDescription?.length || 0}/100
                </div>
              </div>
              {errors.roleDescription && (
                <p className="text-red-500 text-sm mt-2">{errors.roleDescription.message}</p>
              )}
            </div>

            {/* Key Result Achieved */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Key Result Achieved*
              </label>
              <div className="relative">
                <textarea
                  placeholder="Add Detail*"
                  {...register('keyResults', {
                    required: watchedIsCompleted ? 'Key results are required' : false,
                    minLength: watchedIsCompleted ? {
                      value: 20,
                      message: 'Key results must be at least 20 characters'
                    } : undefined,
                    maxLength: {
                      value: 100,
                      message: 'Key results cannot exceed 100 characters'
                    }
                  })}
                  maxLength={100}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none ${
                    errors.keyResults ? 'border-red-500' : 'border-[#E4E4E4]'
                  }`}
                />
                <div className="text-right text-xs text-gray-500 mt-2">
                  {watchedKeyResults?.length || 0}/100
                </div>
              </div>
              {errors.keyResults && (
                <p className="text-red-500 text-sm mt-2">{errors.keyResults.message}</p>
              )}
            </div>

            {/* Add campaign Social Link */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Add campaign Social Link*
              </label>

              {/* Social Link Input Fields */}
              <div className="space-y-3 mb-4">
                {socialLinks.map((link, index) => (
                  <div key={`${link.platform}-${index}`} className="relative space-y-2">
                    <div className="flex items-center border border-[#E4E4E4] rounded-xl px-4 py-4">
                      <div className="flex items-center gap-3 flex-1">
                        <Image
                          src={link.icon}
                          alt={link.platform}
                          width={24}
                          height={24}
                        />
                        <div className="flex-1 flex flex-col gap-2">
                          <select
                            value={link.contentType}
                            onChange={(e) => handleContentTypeChange(index, e.target.value)}
                            className="outline-none text-sm font-medium text-black bg-transparent border-b border-gray-200 pb-1"
                          >
                            <option value="post">Post</option>
                            <option value="reel">Reel</option>
                            <option value="story">Story</option>
                            <option value="video">Video</option>
                            <option value="shorts">Shorts</option>
                            <option value="article">Article</option>
                          </select>
                          <input
                            type="url"
                            placeholder="http...."
                            value={link.url}
                            onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                            className="outline-none placeholder-[#999] text-sm"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleSocialLinkRemove(index)}
                        className="w-6 h-6 rounded-full bg-[#999] text-white flex items-center justify-center ml-3 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add More Button */}
              {socialLinks.length > 0 && (
                <div className="text-center mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      const lastLink = socialLinks[socialLinks.length - 1];
                      handleSocialLinkAdd(lastLink.platform, lastLink.icon);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-dashed border-theme-primary text-theme-primary rounded-full transition-colors"
                  >
                    <CirclePlus size={16} />
                    <span className="text-sm font-medium">Add More</span>
                  </button>
                </div>
              )}

              {/* Available Social Platforms */}
                <div>
                    {
                        socialLinks.length > 0 && (
                            <div className="mb-3 flex items-center justify-center gap-x-1.5">
                                <div className="w-14 h-[1px] bg-gradient-to-r from-white to-[#222]" />
                                <span className="text-xs text-black font-bold">ADD MORE SOCIAL LINKS</span>
                                <div className="w-14 h-[1px] bg-gradient-to-r from-[#222] to-white" />
                            </div>
                        )
                    }
                  <div className="flex gap-4 justify-center pb-4">
                    {getAvailablePlatforms().map((platform) => (
                      <button
                        key={platform.name}
                        type="button"
                        onClick={() => handleSocialLinkAdd(platform.name, platform.icon)}
                        className='h-14 w-14 rounded-xl border border-[#E4E4E4] flex items-center justify-center'
                      >
                        <Image
                          src={platform.icon}
                          alt={platform.name}
                          width={32}
                          height={32}
                          className=""
                        />
                      </button>
                    ))}
                  </div>
                </div>
            </div>
          </>
        )}
      </div>

      {/* Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
       <button
         type="button"
         onClick={handleSubmit(onSubmit)}
         className="w-full py-5 bg-theme-primary text-white rounded-full font-semibold hover:bg-opacity-90 transition-colors"
       >
         Save Experience
       </button>
      </div>
    </div>
  )
}

export default AddExperiencePage