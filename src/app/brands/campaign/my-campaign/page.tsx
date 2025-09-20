"use client"
import BrandsDetailScreen from '@/components/brands/screens/BrandsDetailScreen';
import CampaignCard from '@/components/common/CampaignCard';
import { ChevronLeft } from 'lucide-react'
import React, { useState } from 'react'

const filters = ["Open Campaigns", "Invites Campaigns", "Finished", "Rejected"];

const BrandsCampaignListingPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("Open Campaigns");
    const [showCampaignDetail, setShowCampaignDetail] = useState<boolean>(false);

    if(showCampaignDetail){
        return <BrandsDetailScreen showAppliedStatus={true} appliedStatus={"Applied"} onBack={() => setShowCampaignDetail(false)}/>
    }
  return (
    <div className='mt-3 px-4'>
        <div className="back flex items-center gap-x-4">
            <button><ChevronLeft size={24}/></button>
            <span className='font-bold text-xl'>Campaign Management</span>
        </div>
        <div className="filters mt-5 flex items-center gap-x-2 overflow-scroll no-scrollbar">
            {
                filters.map((filter) => (
                    <button key={filter} onClick={() => setSelectedFilter(filter)} className={`text-nowrap text-black text-sm px-4 py-2 rounded-full transition-colors ${selectedFilter === filter ? "bg-theme-primary text-white font-bold" : "font-medium bg-white border border-[#E4E4E4]"}`}>
                        {filter}
                    </button>
                ))
            }
        </div>
        <div className="mt-6">
            <CampaignCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                onViewCampaignDetail={() => setShowCampaignDetail(true)}
                numberOfApplications={122}
            />
            <CampaignCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                onViewCampaignDetail={() => setShowCampaignDetail(true)}
                numberOfApplications={122}
            />
            <CampaignCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                onViewCampaignDetail={() => setShowCampaignDetail(true)}
                numberOfApplications={122}
            />
        </div>
    </div>
  )
}

export default BrandsCampaignListingPage