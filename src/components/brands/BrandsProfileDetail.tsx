"use client"
import { MapPin, MoreHorizontal, Settings } from 'lucide-react'
import Image from 'next/image'
import ProfileStatusAlert from '../influencer/ProfileStatusAlert'
import BrandsTabs from './BrandsTabs'
import { useAuthContext } from '@/auth/context/auth-provider'
import BrandsBottomTab from '../common/BrandsBottomTab'
import PopoverComponent from '../common/Popover'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ScreenLoader from '../common/ScreenLoader'

interface BrandsProfileDetailProps {
  bannerImage?: string
  profileImage?: string
  name?: string
  username?: string
  isVerified?: boolean
  location?: string
  bio?: string
  profileUserId?: number | string
  stats?: {
    posts: string | number
    followers: string | number
    following: string | number
    campaigns: string | number
  }
}

const BrandsProfileDetail = ({
  bannerImage: defaultBannerImage,
  profileImage: defaultProfileImage,
  name: defaultName,
  username: defaultUsername,
  isVerified: defaultIsVerified,
  location: defaultLocation,
  bio: defaultBio,
  profileUserId,
}: BrandsProfileDetailProps) => {
  const {user} = useAuthContext();

  // Use user data from auth context if available, otherwise use defaults
  const bannerImage = user?.profileMedia?.profileBanner || defaultBannerImage || "/images/user/influencer.svg"
  const profileImage = user?.profileMedia?.profileImage || defaultProfileImage || "/images/brand/loreal.svg"
  const name = user?.brandName || defaultName || "Brand Name"
  const username = user?.username ? `@${user.username}` : defaultUsername || "@username"
  const isVerified = user?.isEmailVerified || defaultIsVerified || false
  const location = user?.companyInfo?.headquarterCity?.name && user?.companyInfo?.headquarterCountry?.name
    ? `${user.companyInfo.headquarterCity.name}, ${user.companyInfo.headquarterCountry.name}`
    : defaultLocation || "Location not set"
  const bio = user?.brandBio || user?.profileHeadline || defaultBio || "No bio available"
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const router = useRouter();

  // Check if viewing own profile
  const isOwnProfile = profileUserId ? user?.id === profileUserId : true;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    console.log("clicked")
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handlePopoverClose();
    router.push('/brands/me/brands-settings');
  };

  if (!user) {
    return <ScreenLoader />;
  }

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
            <div className="font-extrabold text-black">{user?.metrics?.posts}</div>
            <div className="text-sm text-[#999] font-medium">Posts</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{user?.metrics?.followers}</div>
            <div className="text-sm text-[#999] font-medium">Followers</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{user?.metrics?.following}</div>
            <div className="text-sm text-[#999] font-medium">Following</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{user?.metrics?.campaigns}</div>
            <div className="text-sm text-[#999] font-medium">Campaigns</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {isOwnProfile ? (
            <>
              <button onClick={() => router.push('/brands/me/edit-profile')} className="flex-1 bg-theme-primary text-white py-2.5 px-4 rounded-full font-bold text-sm">
                Edit Profile
              </button>
              {!user?.verificationStatus?.status && (
                <button onClick={() => router.push('/brands/me/verify')} className="flex-1 border-theme-primary border text-theme-primary py-2.5 px-4 rounded-full font-bold text-sm">
                  Verify Profile
                </button>
              )}
              <button
                onClick={handlePopoverOpen}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <MoreHorizontal size={18} className="text-gray-600" />
              </button>

              <PopoverComponent
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
              >
                <div className='w-44 border-2 border-[#E4E4E4] rounded-xl'>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full first:rounded-t-xl py-3 ps-4 text-left text-sm border-b border-[#E4E4E4] hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>
              </PopoverComponent>
            </>
          ) : (
            <>
              <button className="flex-1 bg-theme-blue text-white py-2.5 px-4 rounded-full font-bold text-sm">
                Follow
              </button>
              <button className="flex-1 border border-theme-blue text-theme-blue py-2.5 px-4 rounded-full font-bold text-sm">
                Message
              </button>
              <button
                onClick={handlePopoverOpen}
                className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <MoreHorizontal size={18} className="text-gray-600" />
              </button>

              <PopoverComponent
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
              >
                <div className='w-44 border-2 border-[#E4E4E4] rounded-xl'>
                  <button
                    onClick={handleSettingsClick}
                    className="w-full first:rounded-t-xl py-3 ps-4 text-left text-sm border-b border-[#E4E4E4] hover:bg-gray-50 transition-colors flex items-center gap-3"
                  >
                    <Settings size={16} />
                    <span>Settings</span>
                  </button>
                </div>
              </PopoverComponent>
            </>
          )}
        </div>

        {/* Profile Status Alert */}
        {
          user?.verificationStatus && (
            <div>
              <ProfileStatusAlert status={user?.verificationStatus?.status}/>
            </div>
          )
        }

        {/* tabs */}
        <div className="mt-6">
            <BrandsTabs/>
        </div>
        <BrandsBottomTab activeTab='profile' />
      </div>
    </div>
  )
}

export default BrandsProfileDetail