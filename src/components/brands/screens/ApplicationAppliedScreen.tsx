"use client"
import PopoverComponent from '@/components/common/Popover';
import useFetchApi from '@/hooks/useFetchApi';
import useMutationApi from '@/hooks/useMutationApi';
import { ChevronLeft, CircleCheck, CircleX, ClockFading, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Brand {
  id: number;
  brandName: string;
  profileImage: string;
  websiteUrl: string | null;
}

interface City {
  id: number;
  name: string;
  state: string;
  tier: number;
}

interface Deliverable {
  id: number;
  campaignId: number;
  platform: string;
  type: string;
  budget: string;
  quantity: number;
  specifications: string;
}

interface Invitation {
  id: number;
  campaignId: number;
  influencerId: number;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  createdAt: string;
  updatedAt: string;
  influencer: {
    id: number;
    username: string;
    fullName: string;
    profileImage: string | null;
    followersCount: number;
    engagementRate: number;
  };
}

interface ApplicationDetail {
  id: number;
  brandId: number;
  brand: Brand;
  name: string;
  description: string;
  category: string;
  deliverableFormat: string;
  isPanIndia: boolean;
  cities: City[];
  minAge: number;
  maxAge: number;
  isOpenToAllAges: boolean;
  genderPreferences: string[];
  isOpenToAllGenders: boolean;
  nicheIds: number[];
  customInfluencerRequirements: string;
  performanceExpectations: string;
  brandSupport: string;
  status: string;
  type: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  deliverables: Deliverable[];
  invitations: Invitation[];
  appliedStatus?: string;
  selectedCampaignId?: number | null;
}

interface ApplicationAppliedScreenProps {
  onBack: () => void;
  showApplyButton?: boolean;
  appliedStatus?: string;
  selectedCampaignId?: number | null;
  popOverButton?: string;
  showPopover?: boolean;
  appliedDate?: string;
}

const ApplicationAppliedScreen = ({ onBack, showApplyButton, appliedStatus, selectedCampaignId, appliedDate }: ApplicationAppliedScreenProps) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const formatPrice = (price: string | number) => {
      const numPrice = typeof price === 'string' ? parseFloat(price) : price;
      return `₹${numPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getPlatformIcon = (platform: string) => {
      const platformLower = platform.toLowerCase();
      if (platformLower === 'instagram') return '/images/icons/instagram.svg';
      if (platformLower === 'youtube') return '/images/icons/youtube.svg';
      if (platformLower === 'facebook') return '/images/icons/facebook.svg';
      return '/images/icons/instagram.svg'; // default
    };

    const formatDeliverableType = (type: string) => {
      return type.replace(/_/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ').replace(/Instagram |Youtube |Facebook /gi, '');
    };

    console.log(selectedCampaignId)
    const {data: ApplicationDetail, loading: loadingApplicationDetail} = useFetchApi<ApplicationDetail>({
      endpoint: `influencer/campaigns/${selectedCampaignId}`,
      retrieveOnMount: !!selectedCampaignId
    })

    const {mutate: withdrawApplication, isPending: loadingWithdrawApplication} = useMutationApi({
      endpoint: `influencer/campaigns/applications/${selectedCampaignId}/withdraw`,
      method: 'PUT',
    })

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
      setAnchorEl(null);
    }

    const handleWithdrawApplication = () => {
      try {
        withdrawApplication({});
      } catch (error) {
        console.error('Error withdrawing application:', error);
      }
    }

    if (loadingApplicationDetail || !ApplicationDetail) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading campaign details...</p>
        </div>
      );
    }
  return (
    <div className={`h-full flex flex-col bg-white ${showApplyButton ? 'pb-24' : 'pb-0'}`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-1" onClick={onBack}>
            <ChevronLeft size={20} className="text-black" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900">{ApplicationDetail.brand.brandName}</h1>
          </div>
        </div>
          <>
            <button className="p-1" onClick={handlePopoverOpen}>
              <MoreHorizontal size={20} className="text-gray-700" />
            </button>
            <PopoverComponent
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
            >
              <div className='w-44 border-2 border-[#E4E4E4] rounded-xl'>
                <button
                  onClick={handleWithdrawApplication}
                  className="w-full py-3 ps-4 text-left text-sm transition-colors rounded-xl flex items-center gap-3"
                >
                  <span>{loadingWithdrawApplication ? 'Withdrawing...' : 'Withdraw Application'}</span>
                </button>
              </div>
            </PopoverComponent>
          </>
      </div>

      {/* application status */}
      <div>
        {
          appliedStatus === 'applied' && (
            <div className='border-t border-b border-dashed border-[#E4E4E4] px-2 py-6 text-center'>
              <p className="text-[#555] text-sm font-medium">{appliedDate}</p>
            </div>
          )
        }
        {
          appliedStatus === 'under_review' && (
            <div className='border-t border-b border-dashed border-[#E4E4E4] px-2 py-6 text-center flex items-center justify-center gap-x-2 text-theme-primary'>
              <ClockFading size={20}/>
              <p className="text-sm font-medium">Application Under Review</p>
            </div>
          )
        }
        {
          appliedStatus === 'selected' && (
            <div className='border-t border-b border-dashed border-[#E4E4E4] px-2 py-6 text-center flex items-center justify-center gap-x-2 text-[#27C840]'>
              <CircleCheck size={20}/>
              <p className="text-sm font-medium">Application Selected</p>
            </div>
          )
        }
        {
          appliedStatus === 'rejected' && (
            <div className='border-t border-b border-dashed border-[#E4E4E4] px-2 py-6 text-center flex items-center justify-center gap-x-2 text-[#FF5F57]'>
              <CircleX size={20}/>
              <p className="text-sm font-medium">Application Rejected</p>
            </div>
          )
        }
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Brand Info Section */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {ApplicationDetail.brand.profileImage ? (
              <Image
                src={ApplicationDetail.brand.profileImage}
                alt={ApplicationDetail.brand.brandName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                {ApplicationDetail.brand.brandName.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {ApplicationDetail.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{ApplicationDetail.brand.brandName}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Category:</span> {ApplicationDetail.category}</p>
              <p><span className="font-medium">Deliverable:</span> {ApplicationDetail.deliverableFormat}</p>
            </div>
          </div>
        </div>

        {/* About Campaign Section */}
        <div>
          <h3 className="font-bold text-black mb-3">About Campaign</h3>
          <p className="text-black text-sm leading-relaxed font-medium">
            {ApplicationDetail.description}
          </p>
        </div>

        {/* Deliverable Section */}
        <div>
          <h3 className="font-bold text-black mb-3">Deliverable</h3>
          <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
            {ApplicationDetail.deliverableFormat}
          </p>
        </div>

        {/* Influencer Requirements Section */}
        <div>
          <h3 className="font-bold text-black mb-3">Influencer Requirements</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Age Range:</span> {ApplicationDetail.isOpenToAllAges ? 'Open to all ages' : `${ApplicationDetail.minAge} - ${ApplicationDetail.maxAge} years old`}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Gender:</span> {ApplicationDetail.isOpenToAllGenders ? 'Open to all genders' : ApplicationDetail.genderPreferences.join(', ')}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Region:</span> {ApplicationDetail.isPanIndia ? 'Pan-India' : ApplicationDetail.cities.map(c => c.name).join(', ')}
              </p>
            </div>
            {ApplicationDetail.customInfluencerRequirements && (
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-black text-sm font-medium">
                  <span className="font-medium">Custom Requirements:</span> {ApplicationDetail.customInfluencerRequirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rewards/Compensation */}
        <div>
          <h3 className="font-bold text-black mb-3">Campaign Budget</h3>
          <div className="space-y-3">
            {Object.entries(
              ApplicationDetail.deliverables.reduce((acc, deliverable) => {
                const platform = deliverable.platform.toLowerCase();
                if (!acc[platform]) {
                  acc[platform] = [];
                }
                acc[platform].push(deliverable);
                return acc;
              }, {} as Record<string, Deliverable[]>)
            ).map(([platform, platformDeliverables]) => (
              <div key={platform} className="p-4 border border-[#E4E4E4] rounded-2xl">
                <div className="heading flex items-center gap-x-2">
                  <Image src={getPlatformIcon(platform)} alt={platform} height={24} width={24} />
                  <span className='font-bold text-sm capitalize'>{platform}</span>
                </div>
                <hr className='border border-dashed border-[#E4E4E4] my-3'/>
                <div className="prices flex items-center gap-x-10">
                  {platformDeliverables.map((deliverable) => (
                    <div key={deliverable.id} className="flex flex-col gap-y-1">
                      <span className='font-normal text-sm text-black'>{formatDeliverableType(deliverable.type)}</span>
                      <span className='font-bold text-black'>{formatPrice(deliverable.budget)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Expectations */}
        {ApplicationDetail.performanceExpectations && (
          <div>
            <h3 className="font-bold text-black mb-3">Performance Expectations</h3>
            <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {ApplicationDetail.performanceExpectations}
            </p>
          </div>
        )}

        {/* Brand Support */}
        {ApplicationDetail.brandSupport && (
          <div>
            <h3 className="font-bold text-black mb-3">Brand Support</h3>
            <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {ApplicationDetail.brandSupport}
            </p>
          </div>
        )}

      </div>
    </div>
  )
}

export default ApplicationAppliedScreen