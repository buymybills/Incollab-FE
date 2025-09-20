"use client"
import { MapPin, MoreHorizontal } from 'lucide-react'
import Image from 'next/image'
import ProfileStatusAlert from '../influencer/ProfileStatusAlert'
import BrandsTabs from './BrandsTabs'

interface BrandsProfileDetailProps {
  bannerImage?: string
  profileImage?: string
  name?: string
  username?: string
  isVerified?: boolean
  location?: string
  bio?: string
  stats?: {
    posts: string | number
    followers: string | number
    following: string | number
    campaigns: string | number
  }
}

const BrandsProfileDetail = ({
  bannerImage = "/images/user/influencer.svg",
  profileImage = "/images/brand/loreal.svg",
  name = "Sneha Sharma",
  username = "@sneha_s19",
  isVerified = true,
  location = "Navi Mumbai, Maharashtra, India",
  bio = "Obsessed with all things fashion & beauty ✨ Sharing daily looks, skincare secrets & makeup tips that anyone can try!",
  stats = {
    posts: "1200",
    followers: "120K",
    following: "120",
    campaigns: "05"
  }
}: BrandsProfileDetailProps) => {
  return (
    <div>
      {/* Banner Image */}
      <div className='w-full h-52 relative rounded-b-2xl overflow-hidden'>
        <Image src={bannerImage} alt="Banner image" fill className='object-cover' />
      </div>

      {/* Profile Section */}
      <div className="pb-6 px-4">
        {/* Profile Picture and Name */}
        <div className="flex items-end gap-4 -mt-8">
          <div className="w-[100px] h-[100px] rounded-full border-8 border-white overflow-hidden bg-white shadow-lg z-10">
            <Image
              src={profileImage}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 mb-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-black">{name}</h1>
              {isVerified && (
                <div className='relative h-5 w-5'>
                  <Image src="/images/common/verification-badge.svg" alt="verification-badge" fill className='object-cover' />
                </div>
              )}
            </div>
            <p className="text-black text-sm">{username}</p>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 mt-6">
          <MapPin size={20} className="text-black " />
          <span className="text-sm text-black font-bold">{location}</span>
        </div>

        {/* Bio */}
        <p className="text-sm text-[#555] font-medium leading-relaxed mt-1">{bio}</p>

        {/* Stats */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <div className="font-extrabold text-black">{stats.posts}</div>
            <div className="text-sm text-[#999] font-medium">Posts</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{stats.followers}</div>
            <div className="text-sm text-[#999] font-medium">Followers</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{stats.following}</div>
            <div className="text-sm text-[#999] font-medium">Following</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{stats.campaigns}</div>
            <div className="text-sm text-[#999] font-medium">Campaigns</div>
          </div>
        </div>

         {/* profile status */}
          <div className='mt-6'>
            <ProfileStatusAlert status='rejected'/>
          </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button className="flex-1 bg-theme-blue text-white py-2.5 px-4 rounded-full font-bold text-sm">
            Follow
          </button>
          <button className="flex-1 border border-theme-blue text-theme-blue py-2.5 px-4 rounded-full font-bold text-sm">
            Message
          </button>
          <button className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
            <MoreHorizontal size={18} className="text-gray-600" />
          </button>
        </div>

        {/* tabs */}
        <div className="mt-6">
            <BrandsTabs/>
        </div>
      </div>
    </div>
  )
}

export default BrandsProfileDetail