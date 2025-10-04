'use client'

import { useAuthContext } from '@/auth/context/auth-provider';
import CampaignCard from '@/components/common/CampaignCard';
import useFetchApi from '@/hooks/useFetchApi';
import { CirclePlus, Megaphone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BrandsDetailScreen from '../screens/CampaignDetailScreen';
import { Influencer } from '@/types/influencer.interface';

interface Deliverable {
  platform: string;
  type: string;
  budget: number;
  quantity: number;
  specifications: string;
}

interface Campaign {
  id: number;
  brandId: number;
  name: string;
  description: string;
  category: string;
  deliverableFormat: string;
  isPanIndia: boolean;
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
  invitations: Influencer[];
}

const CampaignTab = () => {
  const [showDetailScreen, setShowDetailScreen] = useState(false);
  const [allCampaigns, setAllCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
  const router = useRouter();
  const {user} = useAuthContext();
  console.log(user)

  const handleViewCampaignDetail = (campaignId: number) => {
    setSelectedCampaignId(campaignId);
    setShowDetailScreen(true);
  };

  const handleBackFromDetail = () => {
    setShowDetailScreen(false);
  };

  const handleEditCampaign = (campaignId: number) => {
    // Navigate to edit campaign page
    router.push(`/brands/campaign/edit/${campaignId}`);
  };

  const {data: campaigns} = useFetchApi<Campaign[]>({
    endpoint: 'campaign/my-campaigns'
  })

  useEffect(() => {
    if(campaigns){
      setAllCampaigns(campaigns)
    }
  }, [campaigns])

  if (showDetailScreen) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] overflow-hidden">
        <BrandsDetailScreen onBack={handleBackFromDetail} selectedCampaignId={selectedCampaignId}/>
      </div>
    );
  }

  return (
    <div className='pb-10'>
        {allCampaigns.length > 0 ? (
          <div>
            <div className='flex items-center mb-2 justify-between'>
              <h2 className="text-black font-extrabold text-base">Campaigns</h2>
              <button onClick={() => router.push('/brands/campaign/create')} className='flex items-center gap-x-1 text-theme-primary'>
                <CirclePlus size={16}/>
                <span>Add</span>
              </button>
            </div>
            {allCampaigns.map((campaign) => (
              <CampaignCard
                key={campaign.id}
                brandLogo={user?.profileMedia?.profileImage || ""}
                title={campaign.name}
                brandName={user?.brandName || ""}
                category={campaign.category}
                deliverable={campaign.deliverableFormat}
                status={campaign.status === 'active' ? 'Ongoing' : campaign.status === 'completed' ? 'Completed' : 'Pending'}
                onViewCampaignDetail={() => handleViewCampaignDetail(campaign.id)}
                showEditButton={true}
                onEdit={() => handleEditCampaign(campaign.id)}
              />
            ))}
          </div>
        ) : (
          <div className='apply-for-campaign flex flex-col items-center gap-y-4 justify-center min-h-[60vh]'>
              <p className='text-[#555] font-medium text-sm'>NO CAMPAIGN IS CURRENTLY RUNNING</p>
              <button
                onClick={() => router.push('/brands/campaign/create')}
                className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'
              >
                  <Megaphone size={16}/>
                  Setup Campaigns
              </button>
          </div>
        )}
    </div>
  )
}

export default CampaignTab