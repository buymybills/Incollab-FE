import { MapPin } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface CampaignInfluencerCardProps {
  name?: string;
  age?: number;
  gender?: string;
  campaignExperience?: number;
  rating?: number;
  niche?: string[];
  location?: string;
  profileImage?: string;
  isVerified?: boolean;
  onClick?: () => void;
}

const CampaignInfluencerCard: React.FC<CampaignInfluencerCardProps> = ({
  name = "Sneha Sharma",
  age = 24,
  gender = "W",
  campaignExperience = 5,
  niche = ["Fashion", "Lifestyle", "Makeup"],
  location = "Navi Mumbai, Maharashtra, India",
  profileImage = "/images/user/influencer.svg",
  isVerified = true,
  onClick
}) => {
  return (
    <div
      className="bg-white py-4 border-b border-dashed border-[#E4E4E4] cursor-pointer hover:bg-gray-50 transition-colors"
      onClick={onClick}
    >
      <div className="flex items-start gap-3">
        {/* Profile Image */}
        <div className="relative">
          <Image
            src={profileImage}
            alt="profile-image"
            height={48}
            width={48}
            className='rounded-full object-cover'
          />
          {isVerified && (
            <div className="absolute -bottom-1 -right-1">
              <Image
                src="/images/common/verification-badge.svg"
                alt="verified"
                height={16}
                width={16}
              />
            </div>
          )}
        </div>

        {/* Profile Details */}
        <div className='flex-1 space-y-1.5'>
          {/* Name and Verification */}
          <div className="flex items-center gap-1">
            <h3 className="font-semibold text-gray-900 text-sm">{name}</h3>
            {isVerified && (
              <Image
                src="/images/common/verification-badge.svg"
                alt="verified"
                height={14}
                width={14}
              />
            )}
          </div>

          {/* Age and Gender */}
          <p className="text-sm text-[#555] font-medium">
            {gender}, {age}yr Old
          </p>

          {/* Campaign Experience and Rating */}
          <div className="flex items-center gap-1">
            <span className="text-sm text-black font-medium">Campaigns Experience - {campaignExperience}</span>
          </div>

          {/* Niche */}
          <p className="text-sm text-black font-semibold">
            Niche - {niche.join(", ")}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1">
            <MapPin size={18}/>
            <span className="text-sm font-bold text-black">{location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CampaignInfluencerCard