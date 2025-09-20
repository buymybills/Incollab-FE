"use client"
import { ChevronLeft, CirclePlus, X } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const AddExperiencePage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    campaignName: '',
    brandCompany: '',
    campaignCategory: '',
    deliverableFormat: '',
    roleDescription: '',
    keyResults: ''
  })
  const [isCompleted, setIsCompleted] = useState(false)
  const [socialLinks, setSocialLinks] = useState<{platform: string, url: string, icon: string}[]>([])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSocialLinkAdd = (platform: string, icon: string) => {
    setSocialLinks(prev => [...prev, { platform, url: '', icon }])
  }

  const handleSocialLinkChange = (index: number, url: string) => {
    setSocialLinks(prev => prev.map((link, i) =>
      i === index ? { ...link, url } : link
    ))
  }

  const handleSocialLinkRemove = (index: number) => {
    setSocialLinks(prev => prev.filter((_, i) => i !== index))
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
            value={formData.campaignName}
            onChange={(e) => handleInputChange('campaignName', e.target.value)}
            className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent"
          />
        </div>

        {/* Brand / Company */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Brand / Company*
          </label>
          <input
            type="text"
            placeholder="Eg. Nykaa"
            value={formData.brandCompany}
            onChange={(e) => handleInputChange('brandCompany', e.target.value)}
            className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent"
          />
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
              value={formData.campaignCategory}
              onChange={(e) => handleInputChange('campaignCategory', e.target.value)}
              className="w-full px-4 py-3 border border-[#E4E4E4] rounded-full placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* Deliverable Format */}
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">
            Deliverable Format*
          </label>
          <div className="relative">
            <textarea
              placeholder="Add Deliverable*"
              value={formData.deliverableFormat}
              onChange={(e) => handleInputChange('deliverableFormat', e.target.value)}
              maxLength={100}
              rows={4}
              className="w-full px-4 py-3 border border-[#E4E4E4] rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none"
            />
            <div className="text-right text-xs text-gray-500 mt-2">
              {formData.deliverableFormat.length}/100
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
                checked={isCompleted}
                onChange={(e) => setIsCompleted(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-6 h-6 border-2 rounded-md flex items-center justify-center transition-colors ${
                isCompleted
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300 bg-white'
              }`}>
                {isCompleted && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
          </label>
        </div>

        {/* Additional fields when campaign is completed */}
        {isCompleted && (
          <>
            {/* Tell Us About your Role */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Tell Us About your Role In the Campaign*
              </label>
              <div className="relative">
                <textarea
                  placeholder="Add Detail*"
                  value={formData.roleDescription}
                  onChange={(e) => handleInputChange('roleDescription', e.target.value)}
                  maxLength={100}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E4E4E4] rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none"
                />
                <div className="text-right text-xs text-gray-500 mt-2">
                  {formData.roleDescription.length}/100
                </div>
              </div>
            </div>

            {/* Key Result Achieved */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Key Result Achieved*
              </label>
              <div className="relative">
                <textarea
                  placeholder="Add Detail*"
                  value={formData.keyResults}
                  onChange={(e) => handleInputChange('keyResults', e.target.value)}
                  maxLength={100}
                  rows={4}
                  className="w-full px-4 py-3 border border-[#E4E4E4] rounded-[28px] placeholder-[#999] focus:outline-none focus:ring-1 focus:ring-theme-primary focus:border-transparent resize-none"
                />
                <div className="text-right text-xs text-gray-500 mt-2">
                  {formData.keyResults.length}/100
                </div>
              </div>
            </div>

            {/* Add campaign Social Link */}
            <div>
              <label className="block text-sm font-semibold text-black mb-3">
                Add campaign Social Link*
              </label>

              {/* Social Link Input Fields */}
              <div className="space-y-3 mb-4">
                {socialLinks.map((link, index) => (
                  <div key={`${link.platform}-${index}`} className="relative">
                    <div className="flex items-center border border-[#E4E4E4] rounded-xl px-4 py-4">
                      <div className="flex items-center gap-3 flex-1">
                        <Image
                          src={link.icon}
                          alt={link.platform}
                          width={24}
                          height={24}
                        />
                        <input
                          type="url"
                          placeholder="http...."
                          value={link.url}
                          onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                          className="flex-1 outline-none placeholder-[#999] text-sm"
                        />
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
       <button className="w-full py-5 bg-theme-primary text-white rounded-full">Save Experience</button>
      </div>
    </div>
  )
}

export default AddExperiencePage