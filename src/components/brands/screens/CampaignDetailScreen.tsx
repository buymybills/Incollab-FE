"use client"
import SuccessfulScreen from '@/components/screens/SuccessfulScreen';
import useFetchApi from '@/hooks/useFetchApi';
import { ChevronLeft, CircleCheck, CircleX, ClockFading, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import useMutationApi from '@/hooks/useMutationApi';
import PopoverComponent from '@/components/common/Popover';

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
  platform: string;
  budget: number;
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

interface CampaignDetail {
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
  showAppliedStatus?: boolean;
  appliedStatus?: "Applied" | "underreview" | "selected" | "rejected";
  selectedCampaignId?: number | null;
}

interface CampaignDetailScreenProps {
  onBack: () => void;
  showApplyButton?: boolean;
  showAppliedStatus?: boolean;
  appliedStatus?: "applied" | "under_review" | "selected" | "rejected";
  selectedCampaignId?: number | null;
  popOverButton?: string;
  showPopover?: boolean;
}

const CampaignDetailScreen = ({ onBack, showApplyButton, showPopover, popOverButton, showAppliedStatus, appliedStatus, selectedCampaignId }: CampaignDetailScreenProps) => {
    const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    console.log(selectedCampaignId)
    const {data: campaignDetail, loading: loadingCampaignDetail} = useFetchApi<CampaignDetail>({
      endpoint: `campaign/${selectedCampaignId}`,
      retrieveOnMount: !!selectedCampaignId
    })

    console.log(campaignDetail)

    const {mutate: applyForCampaign, isPending: loadingApplyForCampaign} = useMutationApi({
      endpoint: `influencer/campaigns/${selectedCampaignId}/apply`,
      method: 'POST',
      onSuccess: () => {
        setShowSuccessScreen(true);
      }
    })

    const handleApplyForCampaign = () => {
      try {
        applyForCampaign({});
      } catch (error) {
        console.error('Error applying for campaign:', error);
      }
    }

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    }

    const handlePopoverClose = () => {
      setAnchorEl(null);
    }

    const handleWithdrawApplication = () => {
      // Add withdraw logic here
      handlePopoverClose();
    }

    if(showSuccessScreen){
        return <SuccessfulScreen onBack={() => setShowSuccessScreen(false)} heading={`Your application was sent to ${campaignDetail.brand.brandName}`} subHeading={`Check the application status in ‘My campaign’ tab in Profile and setting`}/>
    }

    if (loadingCampaignDetail || !campaignDetail) {
      return (
        <div className="h-full flex items-center justify-center">
          <p className="text-gray-500">Loading campaign details...</p>
        </div>
      );
    }
  return (
    <div className={`h-full flex flex-col bg-white ${showApplyButton ? 'pb-24' : 'pb-0'}`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-1" onClick={onBack}>
            <ChevronLeft size={20} className="text-black" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900">{campaignDetail.brand.brandName}</h1>
          </div>
        </div>
        {showPopover && (
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
                  <span>{popOverButton === 'Withdraw' ? 'Withdraw Application' : 'Withdraw'}</span>
                </button>
              </div>
            </PopoverComponent>
          </>
        )}
      </div>

      {showAppliedStatus && (
              <div className='border border-dashed border-[#E4E4E4] py-6 flex items-center justify-center'>
                {appliedStatus === "applied" && (
                  <p className='text-[#999] font-medium text-sm'>Applied</p>
                )}
                {appliedStatus === "under_review" && (
                  <div className='flex items-center gap-x-2'>
                    <ClockFading className='text-theme-primary' size={16}/>
                    <p className='font-medium text-sm text-theme-primary'>Application Under Review</p>
                  </div>
                )}
                {appliedStatus === "selected" && (
                  <div className='flex items-center gap-x-2'>
                    <CircleCheck className='text-[#27C840]' size={16}/>
                    <p className='font-medium text-sm text-[#27C840]'>Selected for campaign</p>
                  </div>
                )}
                {appliedStatus === "rejected" && (
                  <div className='flex items-center gap-x-2'>
                    <CircleX className='text-[#FF5F57]' size={16}/>
                    <p className='font-medium text-sm text-[#FF5F57]'>Application Rejected</p>
                  </div>
                )}
              </div>
            )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Brand Info Section */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
            {campaignDetail.brand.profileImage ? (
              <Image
                src={campaignDetail.brand.profileImage}
                alt={campaignDetail.brand.brandName}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-white font-bold text-sm">
                {campaignDetail.brand.brandName.substring(0, 2).toUpperCase()}
              </span>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {campaignDetail.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">{campaignDetail.brand.brandName}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Category:</span> {campaignDetail.category}</p>
              <p><span className="font-medium">Deliverable:</span> {campaignDetail.deliverableFormat}</p>
            </div>
          </div>
        </div>

        {/* About Campaign Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">About Campaign</h3>
          <p className="text-black text-sm leading-relaxed font-medium">
            {campaignDetail.description}
          </p>
        </div>

        {/* Deliverable Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Deliverable</h3>
          <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
            {campaignDetail.deliverableFormat}
          </p>
        </div>

        {/* Influencer Requirements Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Influencer Requirements</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Age Range:</span> {campaignDetail.isOpenToAllAges ? 'Open to all ages' : `${campaignDetail.minAge} - ${campaignDetail.maxAge} years old`}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Gender:</span> {campaignDetail.isOpenToAllGenders ? 'Open to all genders' : campaignDetail.genderPreferences.join(', ')}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Region:</span> {campaignDetail.isPanIndia ? 'Pan-India' : campaignDetail.cities.map(c => c.name).join(', ')}
              </p>
            </div>
            {campaignDetail.customInfluencerRequirements && (
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                <p className="text-black text-sm font-medium">
                  <span className="font-medium">Custom Requirements:</span> {campaignDetail.customInfluencerRequirements}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Rewards/Compensation */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Rewards/Compensation</h3>
          <div className="space-y-2">
            {campaignDetail.deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
                {/* <p className="text-black text-sm font-medium">
                  <span className="font-medium capitalize">{deliverable.platform} {deliverable.type.replace(/_/g, ' ')}:</span> ₹{deliverable.budget}
                </p> */}
              </div>
            ))}
          </div>
        </div>

        {/* Performance Expectations */}
        {campaignDetail.performanceExpectations && (
          <div>
            <h3 className="text-lg font-extrabold text-black mb-3">Performance Expectations</h3>
            <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {campaignDetail.performanceExpectations}
            </p>
          </div>
        )}

        {/* Brand Support */}
        {campaignDetail.brandSupport && (
          <div>
            <h3 className="text-lg font-extrabold text-black mb-3">Brand Support</h3>
            <p className="text-black text-sm leading-relaxed font-medium whitespace-pre-wrap">
              {campaignDetail.brandSupport}
            </p>
          </div>
        )}
      </div>

      {/* Upload Button */}
      {showApplyButton && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button
            onClick={handleApplyForCampaign}
            disabled={loadingApplyForCampaign}
            className='bg-theme-primary text-center text-white w-full py-5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loadingApplyForCampaign ? 'Applying...' : 'Click to Apply'}
          </button>
        </div>
      )}
    </div>
  )
}

export default CampaignDetailScreen