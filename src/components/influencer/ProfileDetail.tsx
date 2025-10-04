"use client"
import { MapPin, MoreHorizontal, Settings, Activity } from 'lucide-react'
import Image from 'next/image'
import BottomTab from '../common/BottomTab'
import TabWithBadge from '../ui/tabs/TabWithBadge'
import ProfileStatusAlert from './ProfileStatusAlert'
import { useAuthContext } from '@/auth/context/auth-provider'
import { useRouter } from 'next/navigation'
import PopoverComponent from '../common/Popover'
import { useState } from 'react'

interface ProfileDetailProps {
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

const ProfileDetail = ({
  bannerImage,
  profileImage,
  name,
  username,
  isVerified,
  location,
  profileUserId,
  stats
}: ProfileDetailProps) => {
  const { user } = useAuthContext();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Check if viewing own profile
  const isOwnProfile = profileUserId ? user?.id === profileUserId : true;

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleSettingsClick = () => {
    handlePopoverClose();
    router.push('/influencers/me/settings');
  };

  const handleActivityClick = () => {
    handlePopoverClose();
    // Add navigation or action for activity here
  };

  // Extract and format user data with fallbacks
  const profileData = {
    bannerImage: bannerImage || user?.profileBanner || "/images/user/influencer.svg",
    profileImage: profileImage || user?.profileImage || "/images/user/influencer.svg",
    name: name || user?.name || "User Name",
    username: username || (user?.username ? `@${user.username}` : "@username"),
    isVerified: isVerified ?? (user?.verification?.isProfileCompleted || false),
    location: location || (user?.location ? 
      `${user.location.city?.name || ''}, ${user.location.country?.name || ''}`.replace(/^,\s*|,\s*$/g, '') 
      : "Location not specified"),
    profileHeadline: user?.profileHeadline,
    stats: stats || {
      posts: "0",
      followers: "0",
      following: "0",
      campaigns: "0"
    }
  }

  // Determine profile status based on user data
  // const getProfileStatus = () => {
  //   if (!user?.verification) return 'pending'
    
  //   if (user.verification.isProfileCompleted) return 'approved'
  //   if (user.profileCompletion?.completionPercentage < 100) return 'incomplete'
  //   return 'pending'
  // }

  console.log(user)

  return (
    <div>
      {/* Banner Image */}
      <div className='w-full h-52 relative rounded-b-2xl overflow-hidden'>
        <Image src={profileData.bannerImage} alt="Banner image" fill className='object-cover' />
      </div>

      {/* Profile Section */}
      <div className="pb-6 px-4">
        {/* Profile Picture and Name */}
        <div className="flex items-end gap-4 -mt-8">
          <div className="w-[100px] h-[100px] rounded-full border-8 border-white overflow-hidden bg-white shadow-lg z-10">
            <Image
              src={profileData.profileImage}
              alt={profileData.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1 mb-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-xl font-bold text-black">{profileData.name}</h1>
              {profileData.isVerified && (
                <div className='relative h-5 w-5'>
                  <Image src="/images/common/verification-badge.svg" alt="verification-badge" fill className='object-cover' />
                </div>
              )}
            </div>
            <p className="text-black text-sm">{profileData.username}</p>
          </div>
        </div>

        {/* Location */}
        {
          profileData.location && (
            <div className="flex items-center gap-1 mt-6">
              <MapPin size={20} className="text-black " />
              <span className="text-sm text-black font-bold">{profileData.location}</span>
            </div>
          )
        }

        {/* Bio */}
        <p className="text-sm text-[#555] font-medium leading-relaxed mt-1">{profileData?.profileHeadline}</p>

        {/* Stats */}
        <div className="flex justify-between items-center mt-6">
          <div className="text-center">
            <div className="font-extrabold text-black">{profileData.stats.posts}</div>
            <div className="text-sm text-[#999] font-medium">Posts</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{profileData.stats.followers}</div>
            <div className="text-sm text-[#999] font-medium">Followers</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{profileData.stats.following}</div>
            <div className="text-sm text-[#999] font-medium">Following</div>
          </div>
          <hr className='h-9 w-[0.7px] bg-[#E4E4E4]'/>
          <div className="text-center">
            <div className="font-extrabold text-black">{profileData.stats.campaigns}</div>
            <div className="text-sm text-[#999] font-medium">Campaigns</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          {isOwnProfile ? (
            <>
              <button onClick={() => router.push('/influencers/me/edit-profile')} className="flex-1 bg-theme-primary text-white py-2.5 px-4 rounded-full font-bold text-sm">
                Edit Profile
              </button>
              {!user?.contact?.isWhatsappVerified && (
                <button onClick={() => router.push('/influencers/me/verify')} className="flex-1 border-theme-primary border text-theme-primary py-2.5 px-4 rounded-full font-bold text-sm">
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
                  <button
                    onClick={handleActivityClick}
                    className="w-full py-3 ps-4 text-left text-sm last:border-b-0 hover:bg-gray-50 transition-colors last:rounded-b-xl flex items-center gap-3"
                  >
                    <Activity size={16} />
                    <span>Activity</span>
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

        {/* Tabs */}
        <div className="mt-6">
          <TabWithBadge/>
        </div>

        {/* Bottom Tab */}
        <BottomTab activeTab='profile' />
      </div>
    </div>
  )
}

export default ProfileDetail