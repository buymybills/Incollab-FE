"use client"
import { ChevronLeft, EllipsisVertical, MapPin } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import BottomSheet from '../bottomsheets/BottomSheet';
import ArrowFilledButton from '../buttons/ArrowFilledButton';
import CampaignCard from '../common/CampaignCard';
import PopoverComponent from '../common/Popover';
import CampaignInfluencerCard from '../influencer/cards/CampaignInfluencerCard';
import useMutationApi from '@/hooks/useMutationApi';

interface Campaign {
  id: string;
  brandLogo: string;
  brandName: string;
  title: string;
  category: string;
  deliverable: string;
  status: 'Ongoing' | 'Completed';
}

interface CollaborationRate {
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'Twitter';
  icon: string;
  reel: string;
  story: string;
  post: string;
}

interface CampaignInfluencerDetailScreenProps {
  name?: string;
  age?: number;
  gender?: string;
  location?: string;
  profileImage?: string;
  isVerified?: boolean;
  status?: 'Selected' | 'Under Review' | 'Rejected';
  niches?: string[];
  collaborationRates?: CollaborationRate[];
  campaignExperience?: number;
  campaigns?: Campaign[];
  campaignName?: string;
  onBack?: () => void;
  onViewProfile?: () => void;
  onStatusChange?: (status: 'Selected' | 'Under Review' | 'Rejected') => void;
  influencerId?: number;
  campaignId?: number;
  applicationId?: number;
}

const CampaignInfluencerDetailScreen: React.FC<CampaignInfluencerDetailScreenProps> = ({
  name = "Sneha Sharma",
  age = 24,
  gender = "W",
  location = "Navi Mumbai, Maharashtra",
  profileImage = "/images/user/influencer.svg",
  isVerified = true,
  status,
  niches = ["Lifestyle", "Fashion", "Beauty", "Accessories"],
  collaborationRates = [
    {
      platform: 'Instagram',
      icon: '/images/icons/instagram.svg',
      reel: '₹50,000',
      story: '₹50,000',
      post: '₹50,000'
    },
    {
      platform: 'Facebook',
      icon: '/images/icons/facebook.svg',
      reel: '₹50,000',
      story: '₹50,000',
      post: '₹50,000'
    }
  ],
  campaignExperience = 5,
  campaigns = [
    {
      id: '1',
      brandLogo: '/images/brand/loreal.svg',
      brandName: "L'Oréal Paris",
      title: "Glow Like Never Before",
      category: "Skincare + Makeup",
      deliverable: "2 Instagram reels, 3 story posts",
      status: "Ongoing"
    },
    {
      id: '2',
      brandLogo: '/images/brand/loreal.svg',
      brandName: "L'Oréal Paris",
      title: "Glow Like Never Before",
      category: "Skincare + Makeup",
      deliverable: "2 Instagram reels, 3 story posts",
      status: "Ongoing"
    },
  ],
  campaignName = "Campaign Name",
  onBack,
  onViewProfile,
  onStatusChange,
  campaignId,
  applicationId
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<'Selected' | 'Under Review' | 'Rejected' | null>(null);
  const [currentStatus, setCurrentStatus] = useState<'Selected' | 'Under Review' | 'Rejected' | null>(status || null);

  // Update currentStatus when status prop changes
  React.useEffect(() => {
    if (status) {
      setCurrentStatus(status);
    }
  }, [status]);

  const getStatusOptions = (): ('Selected' | 'Under Review' | 'Rejected')[] => {
    // If status is Under Review, only show Selected and Rejected
    if (currentStatus === 'Under Review') {
      return ['Selected', 'Rejected'];
    }
    // If already Selected or Rejected, don't show any options (status is final)
    if (currentStatus === 'Selected' || currentStatus === 'Rejected') {
      return [];
    }
    // Initial state - show all options
    return ['Selected', 'Under Review', 'Rejected'];
  };

  const statusOptions = getStatusOptions();

  const {mutateAsync: updateApplicationStatus, isPending: isUpdatingStatus} = useMutationApi({
    endpoint: `campaign/${campaignId}/applications/${applicationId}/status`,
    method: 'PUT',
  })

  const mapStatusToApiValue = (status: 'Selected' | 'Under Review' | 'Rejected'): string => {
    const statusMap: Record<string, string> = {
      'Selected': 'selected',
      'Under Review': 'under_review',
      'Rejected': 'rejected'
    };
    return statusMap[status];
  };

  const handleStatusSelect = async (newStatus: 'Selected' | 'Under Review' | 'Rejected') => {
    if (newStatus === 'Selected') {
      // Show confirmation bottom sheet for "Selected" status
      setPendingStatus(newStatus);
      setIsBottomSheetOpen(true);
    } else {
      // Directly apply other statuses
      try {
        await updateApplicationStatus({
          status: mapStatusToApiValue(newStatus)
        });
        setCurrentStatus(newStatus); // Update current status
        onStatusChange?.(newStatus);
      } catch (error) {
        console.error('Error updating application status:', error);
      }
    }
    setAnchorEl(null); // Close popover
  };

  const handleConfirmSelection = async () => {
    if (pendingStatus) {
      try {
        await updateApplicationStatus({
          status: mapStatusToApiValue(pendingStatus)
        });
        setCurrentStatus(pendingStatus); // Update current status
        onStatusChange?.(pendingStatus);
        setIsBottomSheetOpen(false);
        setPendingStatus(null);
      } catch (error) {
        console.error('Error updating application status:', error);
      }
    }
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
    setPendingStatus(null);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#E4E4E4] border-dashed">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1">
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">{campaignName}</h1>
        </div>
        <button
          onClick={onViewProfile}
          className="text-theme-primary text-sm font-bold"
        >
          View Profile
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Profile Section */}
        <div className='border-b border-dashed border-[#E4E4E4] pb-4 flex items-center justify-between'>
            <div className="flex items-start gap-3">
                <div className="relative">
                    <Image
                    src={profileImage}
                    alt="profile-image"
                    height={56}
                    width={56}
                    className='rounded-full object-cover'
                    />
                    {isVerified && (
                    <div className="absolute -bottom-1 -right-1">
                        <Image
                        src="/images/common/verification-badge.svg"
                        alt="verified"
                        height={18}
                        width={18}
                        />
                    </div>
                    )}
                </div>

                <div className="flex-1">
                    <div className="flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-gray-900 text-lg">{name}</h2>
                        {isVerified && (
                            <Image
                            src="/images/common/verification-badge.svg"
                            alt="verified"
                            height={16}
                            width={16}
                            />
                        )}
                        </div>
                        <p className="text-sm text-gray-600">
                        {gender}, {age}yr Old
                        </p>
                    </div>
                    </div>
                </div>
            </div>
            {statusOptions.length > 0 && (
              <>
                <button className="p-1" onClick={handlePopoverOpen}>
                  <EllipsisVertical className='rotate-90 text-gray-700' />
                </button>

                <PopoverComponent
                  open={Boolean(anchorEl)}
                  anchorEl={anchorEl}
                  onClose={handlePopoverClose}
                >
                  <div className='w-44 border-2 border-[#E4E4E4] rounded-xl'>
                    {statusOptions.map((statusOption) => (
                      <button
                        key={statusOption}
                        onClick={() => handleStatusSelect(statusOption)}
                        disabled={isUpdatingStatus}
                        className={`w-full first:rounded-t-xl py-3 ps-4 text-left text-sm last:border-b-0 hover:bg-gray-50 transition-colors last:rounded-b-xl disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {statusOption}
                      </button>
                    ))}
                  </div>
                </PopoverComponent>
              </>
            )}
        </div>

        {/* location */}
        <div className="location flex items-center gap-2 border-b border-dashed border-[#E4E4E4] pb-4">
            <MapPin className='text-black'/>
            <span className='font-bold text-black text-sm'>{location}</span>
        </div>

        {/* Influencer Niche */}
        <div className='border-b border-dashed border-[#E4E4E4] pb-4'>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Influencer Niche</h3>
          <div className="flex flex-wrap gap-2">
            {niches.map((niche, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-2 rounded-full border border-[#E4E4E4]">
                <span className="text-sm font-medium text-black">{niche}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Charge */}
        <div className='border-b border-dashed border-[#E4E4E4] pb-4'>
          <h3 className="text-base font-semibold text-gray-900 mb-3">Collaboration Charge</h3>
          <div className="flex items-center gap-x-3 overflow-auto no-scrollbar">
            {collaborationRates.map((rate, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3 border-b border-dashed border-[#E4E4E4] pb-2">
                  <Image
                    src={rate.icon}
                    alt={rate.platform}
                    height={20}
                    width={20}
                  />
                  <span className="font-medium text-gray-900">{rate.platform}</span>
                </div>
                <div className="flex items-center gap-5">
                  <div className="text-start">
                    <p className="text-xs text-black mb-1">Reel</p>
                    <p className="text-sm font-semibold text-black">{rate.reel}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-black mb-1">Story</p>
                    <p className="text-sm font-semibold text-black">{rate.story}</p>
                  </div>
                  <div className="text-start">
                    <p className="text-xs text-black mb-1">Post</p>
                    <p className="text-sm font-semibold text-black">{rate.post}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Campaigns Experience */}
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-3">
            Campaigns Experience - {campaignExperience}
          </h3>
          <div className="space-y-3">
            {campaigns.map((campaign) => (
                <div key={campaign.id}>
                    <CampaignCard
                     brandLogo={campaign.brandLogo}
                     title={campaign.title}
                     brandName={campaign.brandName}
                     category={campaign.category}
                     deliverable={campaign.deliverable}
                    />
                </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Bottom Sheet */}
      <BottomSheet isOpen={isBottomSheetOpen} onClose={handleCloseBottomSheet} bottomSheetMinimumHeight={400} bottomSheetMaximumHeight={400}>
        <div className="px-6 pb-">
          {/* Title */}
          <div className="text-center mb-6 border-b border-dashed border-[#E4E4E4] pb-5">
            <h2 className="text-2xl font-bold text-[#27C840] mb-1.5">Confirm Selection</h2>
            <p className="text-[#999] text-xs leading-relaxed">
              Please confirm before proceeding. Once selected, this<br />
              influencer&apos;s status cannot be changed.
            </p>
          </div>

          {/* Influencer Card */}
          <CampaignInfluencerCard
            name={name}
            age={age}
            gender={gender}
            niche={niches}
          />

          {/* Proceed Button */}
          <ArrowFilledButton
            text={isUpdatingStatus ? 'Updating...' : 'Proceed with Selection'}
            textCenter={true}
            onClick={handleConfirmSelection}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default CampaignInfluencerDetailScreen;