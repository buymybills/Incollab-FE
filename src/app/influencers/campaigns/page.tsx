"use client"
import React, { useState } from 'react'
import CampaignCard from '@/components/common/CampaignCard'
import { ChevronDown, ChevronLeft, Filter } from 'lucide-react'
import BrandsDetailScreen from '@/components/brands/screens/BrandsDetailScreen'

const CampaignsListingPage = () => {
    const [showDetailScreen, setShowDetailScreen] = useState<boolean>(false);
    const handleViewCampaignDetail = () => {
        setShowDetailScreen(true);
    };

    if(showDetailScreen){
        return <BrandsDetailScreen onBack={() => setShowDetailScreen(false)} showApplyButton={true}/>
    }
  return (
    <div className='px-4 mt-3'>
        <div className="back flex items-center gap-x-2">
            <button><ChevronLeft/></button>
            <span className='font-bold text-xl'>Brand Campaigns</span>
        </div>
        <div className="filters flex items-center gap-x-2 mt-3">
            <button className='bg-theme-primary py-2 px-3 rounded-full text-white'>
                All
            </button>
            <button className='bg-white py-2 px-3 rounded-full text-black border border-[#E4E4E4] flex items-center gap-x-1'>
                <Filter size={14}/>
                Filter
            </button>
            <button className='bg-white py-2 px-3 rounded-full text-black border border-[#E4E4E4] flex items-center gap-x-1'>
                Sort By
                <ChevronDown size={14}/>
            </button>
        </div>
        <div>
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
    </div>
  )
}

export default CampaignsListingPage