"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import { CirclePlus, Pencil, StarIcon } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UserHeadquarterCity, UserHeadquarterCountry } from '@/components/screens/EditBrandsDetailScreen'

interface AboutUsTabProps {
  bio?: string
  brandDetails?: {
    headquarters?: string
    founded?: string
    website?: string
    activeRegions?: string
  }
  niches?: string[]
  socialLinks?: {
    facebook?: string
    instagram?: string
    youtube?: string
    linkedin?: string
    twitter?: string
  }
}

const AboutUsTab: React.FC<AboutUsTabProps> = ({ }) => {
  const { user } = useAuthContext()
  const router = useRouter()

  console.log('Brand user data:', user)
  return (
    <div className="space-y-6 pb-20">
      {/* About Us Section */}
      <div>
        <div className='flex items-center mb-2 justify-between'>
          <h2 className="text-black font-extrabold text-base">About Us</h2>
          <div className='flex items-center gap-x-2'>
            {(!user?.brandBio || user?.brandBio.trim() === '') ? (
              <button
                onClick={() => router.push('/brands/me/edit-profile')}
                className='flex items-center gap-x-1 text-theme-primary'
              >
                <CirclePlus size={16}/>
                <span>Add</span>
              </button>
            ) : (
              <button
                onClick={() => router.push('/brands/me/edit-profile')}
                className='flex items-center gap-x-1 text-[#555]'
              >
                <Pencil size={16}/>
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
        {user?.brandBio || user?.profileHeadline ? (
          <>
            {user?.brandBio && (
              <p className="font-medium text-sm text-black">
                {user.brandBio}
              </p>
            )}
            {user?.profileHeadline && (
              <p className="font-medium text-sm text-black mt-3">
                {user.profileHeadline}
              </p>
            )}
          </>
        ) : (
          <p className="font-medium text-sm text-gray-400">{`No bio available. Click "Add" to add your brand description.`}</p>
        )}
      </div>

      {/* brand detail */}
      <div className="brand-detail border-t border-dashed border-[#E4E4E4] pt-4">
        <div className='flex items-center justify-between mb-3'>
          <h2 className='font-extrabold text-black'>Brand Detail</h2>
          <button
            onClick={() => router.push('/brands/me/edit-brand-detail')}
            className='flex items-center gap-x-1 text-[#555]'
          >
            <Pencil size={16}/>
            <span>Edit</span>
          </button>
        </div>
        <div className="details text-sm space-y-2">
          {(() => {
            const city = (user?.companyInfo?.headquarterCity as UserHeadquarterCity)?.name || user?.companyInfo?.headquarterCity?.name || ''
            const country = (user?.companyInfo?.headquarterCountry as UserHeadquarterCountry)?.name || user?.companyInfo?.headquarterCountry?.name || ''
            return city && country ? (
              <div className='flex items-center gap-x-1'>
                <span className='font-medium text-[#555]'>Headquarters: </span>
                <span className='font-bold text-black'>
                  {city}, {country}
                </span>
              </div>
            ) : null
          })()}

          {user?.companyInfo?.foundedYear ? (
            <div className='flex items-center gap-x-1'>
              <span className='font-medium text-[#555]'>Founded: </span>
              <span className='font-bold text-black'>{user.companyInfo.foundedYear}</span>
            </div>
          ) : null}

          {(() => {
            const website = user?.companyInfo?.websiteUrl || user?.companyInfo?.website
            return website ? (
              <div className='flex items-center gap-x-1'>
                <span className='font-medium text-[#555]'>Website: </span>
                <a
                  href={website.startsWith('http') ? website : `https://${website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className='font-bold text-theme-blue hover:underline'
                >
                  {website}
                </a>
              </div>
            ) : null
          })()}

          {(() => {
            const regions = user?.companyInfo?.activeRegions
            const displayRegions = Array.isArray(regions) ? regions.join(', ') : regions
            return displayRegions ? (
              <div className='flex items-center gap-x-1'>
                <span className='font-medium text-[#555]'>Active Regions: </span>
                <span className='font-bold text-black'>{displayRegions}</span>
              </div>
            ) : null
          })()}

          {!user?.companyInfo?.headquarterCity && !user?.companyInfo?.headquarterCountry &&
           !user?.companyInfo?.foundedYear && !user?.companyInfo?.website &&
           !user?.companyInfo?.activeRegions && (
            <p className="font-medium text-sm text-gray-400">{`No brand details available. Click "Edit" to add details.`}</p>
          )}
        </div>
      </div>

      {/* Brand Niche Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">Brand Niche</h2>
          <button
            onClick={() => router.push('/brands/me/my-niche')}
            className='flex items-center gap-x-1 text-[#555]'
          >
            <Pencil size={16}/>
            <span>Edit</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {user?.niches && user.niches.length > 0 ? (
          user.niches.map((niche, index) => (
              <span key={niche.id || index} className="px-3 gap-x-2 py-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center">
                <StarIcon size={16}/> {niche.name}
              </span>
            ))
          ) : (
            <p className="font-medium text-sm text-gray-400">{`No niches added. Click "Edit" to add niches.`}</p>
          )}
        </div>
      </div>

      {/* Our Socials Section */}
      {user?.socialLinks && Object.values(user.socialLinks).some(link => link) && (
        <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
          <div className='flex items-center justify-between mb-3'>
            <h2 className="text-black font-extrabold text-base">Our Socials</h2>
            <button
              onClick={() => router.push('/brands/me/edit-sociallinks')}
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
  )
}

export default AboutUsTab