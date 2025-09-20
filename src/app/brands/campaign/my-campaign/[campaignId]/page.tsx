"use client"
import CampaignInfluencerCard from '@/components/influencer/cards/CampaignInfluencerCard';
import { ChevronDown, ChevronLeft, Filter } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import React, { useState } from 'react'

const filters = ["All Applicants", "Under Review", "Selected", "Rejected"];

const CampaignDetailPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("Open Campaigns");
    const router = useRouter();
    const params = useParams();

    const handleInfluencerCardClick = (influencerId: string) => {
        router.push(`/brands/campaign/my-campaign/${params.campaignId}/influencer/${influencerId}`);
    };
    return (
        <div className='mt-3 px-4'>
            <div className="back flex items-center gap-x-4">
                <button><ChevronLeft size={24}/></button>
                <span className='font-bold text-xl'>Campaign Management</span>
            </div>
            <div className="filters mt-5 flex items-center gap-x-2 overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] py-5">
                {
                    filters.map((filter) => (
                        <button key={filter} onClick={() => setSelectedFilter(filter)} className={`text-nowrap text-black text-sm px-4 py-2 rounded-full transition-colors ${selectedFilter === filter ? "bg-theme-primary text-white font-bold" : "font-medium bg-white border border-[#E4E4E4]"}`}>
                            {filter}
                        </button>
                    ))
                }
            </div>
            <div className="filters mt-5 flex items-center gap-x-2 overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] pb-5">
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
            <div className="filters mt-5 flex items-center overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] pb-5">
                <p className='text-black font-medium'>Total Applications - </p>
                <span className='font-bold'>122</span>
            </div>
            <div className="applicants-card">
                <CampaignInfluencerCard
                    onClick={() => handleInfluencerCardClick('influencer-1')}
                />
                <CampaignInfluencerCard
                    name="Priya Sharma"
                    age={26}
                    gender="W"
                    niche={["Beauty", "Fashion", "Travel"]}
                    onClick={() => handleInfluencerCardClick('influencer-2')}
                />
            </div>
        </div>
    )
}

export default CampaignDetailPage