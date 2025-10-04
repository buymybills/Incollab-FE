"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import { CirclePlus, Pencil, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface AboutUsTabProps {
  bio?: string
  profileHeadline?: string
  location?: {
    country?: string
    city?: string
  }
  niches?: string[]
  collaborationRates?: {
    instagram?: { reel?: string, story?: string, post?: string }
    facebook?: { reel?: string, story?: string, post?: string }
    youtube?: { shorts?: string, longVideo?: string }
  }
  socialLinks?: {
    facebook?: string
    instagram?: string
    youtube?: string
    linkedin?: string
    twitter?: string
  }
}

const AboutUsTab: React.FC<AboutUsTabProps> = ({
}) => {
  const {user} = useAuthContext();
  const router = useRouter();

  // Helper function to format currency
  const formatPrice = (price?: string | number) => {
    if (!price) return '₹0'
    return `₹${typeof price === 'number' ? price.toLocaleString('en-IN') : price}`
  }

  return (
    <>
      <div className="space-y-6 pb-20">
        {/* About Me Section */}
        <div>
          <div className='flex items-center mb-2 justify-between'>
            <h2 className="text-black font-extrabold text-base">About Me</h2>
            <div className='flex items-center gap-x-2'>
              {(!user?.bio || user?.bio.trim() === '') && (
                <button className='flex items-center gap-x-1 text-theme-primary'>
                  <CirclePlus size={16}/>
                  <span>Add</span>
                </button>
              )}
              <button
                onClick={() => router.push('/influencers/me/edit-bio')}
                className='flex items-center gap-x-1 text-[#555]'
              >
                <Pencil size={16}/>
                <span>Edit</span>
              </button>
            </div>
          </div>
          <p className="font-medium text-sm text-black">
            {user?.bio}
          </p>
        </div>

        {/* My Niche Section */}
        <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className="text-black font-extrabold text-base">My Niche</h2>
            <button
              onClick={() => router.push('/influencers/me/my-niche')}
              className='flex items-center gap-x-1 text-[#555]'
            >
              <Pencil size={16}/>
              <span>Edit</span>
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {user?.niches && user.niches.length > 0 ? (
              user.niches.map((niche) => (
                <span key={niche.id} className="px-3 gap-x-2 py-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center">
                  <StarIcon size={16}/> {niche.name}
                </span>
              ))
            ) : (
              <p>No Niches Added</p>
            )}
          </div>
        </div>

        {/* Collaboration Charge Section */}
        <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className="text-black font-extrabold text-base">Collaboration Charge</h2>
            <button
              onClick={() => router.push('/influencers/me/edit-collaboration-charges')}
              className='flex items-center gap-x-1 text-[#555]'
            >
              <Pencil size={16}/>
              <span>Edit</span>
            </button>
          </div>
          <div className="space-y-5">
            {/* Instagram Rates */}
            {user?.collaborationCosts?.instagram && (
              <div className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src="/images/icons/instagram.svg" alt="Instagram" height={24} width={24} />
                  <span className='font-bold text-sm'>Instagram</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {user.collaborationCosts.instagram.reel && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Reel</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.instagram.reel)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.instagram.story && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Story</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.instagram.story)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.instagram.post && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Post</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.instagram.post)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Facebook Rates */}
            {user?.collaborationCosts?.facebook && (
              <div className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src="/images/icons/facebook.svg" alt="facebook" height={24} width={24} />
                  <span className='font-bold text-sm'>Facebook</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {user.collaborationCosts.facebook.post && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Post</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.facebook.post)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.facebook.story && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Story</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.facebook.story)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* YouTube Rates */}
            {user?.collaborationCosts?.youtube && (
              <div className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src="/images/icons/youtube.svg" alt="youtube" height={24} width={24} />
                  <span className='font-bold text-sm'>YouTube</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {user.collaborationCosts.youtube.shorts && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Shorts</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.youtube.shorts)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.youtube.video && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Long Video</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.youtube.video)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* LinkedIn Rates */}
            {user?.collaborationCosts?.linkedin && (
              <div className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src="/images/icons/linkedin.svg" alt="linkedin" height={24} width={24} />
                  <span className='font-bold text-sm'>LinkedIn</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {user.collaborationCosts.linkedin.post && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Post</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.linkedin.post)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.linkedin.article && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Article</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.linkedin.article)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Twitter/X Rates */}
            {user?.collaborationCosts?.twitter && (
              <div className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src="/images/icons/x-social.svg" alt="X (Twitter)" height={24} width={24} />
                  <span className='font-bold text-sm'>X (Twitter)</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {user.collaborationCosts.twitter.post && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Post</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.twitter.post)}</span>
                    </div>
                  )}
                  {user.collaborationCosts.twitter.thread && (
                    <div className="reel flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>Thread</span>
                      <span className='font-bold text-black'>{formatPrice(user.collaborationCosts.twitter.thread)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* No Collaboration Costs Message */}
            {!user?.collaborationCosts && (
              <div className="p-4 border border-dashed border-[#E4E4E4] rounded-2xl text-center">
                <p className="text-gray-500">No collaboration charges added yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Connect Me Here Section */}
        {user?.socialLinks && Object.values(user.socialLinks).some(link => link) && (
          <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
            <div className='flex items-center justify-between mb-3'>
              <h2 className="text-black font-extrabold text-base">Connect Me Here</h2>
              <button
                onClick={() => router.push('/influencers/me/edit-sociallinks')}
                className='flex items-center gap-x-1 text-[#555]'
              >
                <Pencil size={16}/>
                <span>Edit</span>
              </button>
            </div>
            <div className="flex gap-3">
              {user.socialLinks.instagram && (
                <a
                  href={user.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/icons/instagram.svg" alt="Instagram" height={32} width={32}/>
                </a>
              )}
              {user.socialLinks.youtube && (
                <a
                  href={user.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/icons/youtube.svg" alt="YouTube" height={32} width={32}/>
                </a>
              )}
              {user.socialLinks.facebook && (
                <a
                  href={user.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/icons/facebook.svg" alt="Facebook" height={32} width={32}/>
                </a>
              )}
              {user.socialLinks.linkedin && (
                <a
                  href={user.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/icons/linkedin.svg" alt="LinkedIn" height={32} width={32}/>
                </a>
              )}
              {user.socialLinks.twitter && (
                <a
                  href={user.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/icons/x-social.svg" alt="X (Twitter)" height={32} width={32}/>
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default AboutUsTab