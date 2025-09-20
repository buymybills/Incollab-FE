'use client'

import CampaignCard from '@/components/common/CampaignCard';
import { CirclePlus, Megaphone, Pencil } from 'lucide-react';
import { useState } from 'react';
import BrandsDetailScreen from '../screens/BrandsDetailScreen';

const CampaignTab = () => {
  const [showDetailScreen, setShowDetailScreen] = useState(false);

  const handleViewCampaignDetail = () => {
    setShowDetailScreen(true);
  };

  const handleBackFromDetail = () => {
    setShowDetailScreen(false);
  };

  if (showDetailScreen) {
    return (
      <div className="fixed inset-0 bg-white z-[9999] overflow-hidden">
        <BrandsDetailScreen onBack={handleBackFromDetail} />
      </div>
    );
  }

  return (
    <>
        <div>
        <div className='flex items-center mb-2 justify-between'>
          <h2 className="text-black font-extrabold text-base">Campaigns</h2>
          <div className='flex items-center gap-x-2'>
            <button className='flex items-center gap-x-1 text-theme-primary'>
              <CirclePlus size={16}/>
              <span>Add</span>
            </button>
            <button className='flex items-center gap-x-1 text-[#555]'>
              <Pencil size={16}/>
              <span>Edit</span>
            </button>
          </div>
        </div>
            <CampaignCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                status="Ongoing"
                onViewCampaignDetail={handleViewCampaignDetail}
            />
            <CampaignCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                status="Ongoing"
                onViewCampaignDetail={handleViewCampaignDetail}
            />
        </div>
        <div className='apply-for-campaign flex flex-col items-center gap-y-4 justify-center'>
            <p className='text-[#555] font-medium text-sm'>NO CAMPAIGN IS CURRENTLY RUNNING</p>
            <button className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'>
                <Megaphone size={16}/>
                Setup Campaigns
            </button>
        </div>
    </>
  )
}

export default CampaignTab