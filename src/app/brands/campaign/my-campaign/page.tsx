"use client"
import BrandsDetailScreen from '@/components/brands/screens/CampaignDetailScreen';
import CampaignCard from '@/components/common/CampaignCard';
import useFetchApi from '@/hooks/useFetchApi';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    status: string;
    createdAt: string;
    updatedAt: string;
}

interface Brand {
    id: number;
    brandName: string;
    profileImage: string;
}

export interface BrandCampaign {
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
    isInviteOnly: boolean;
    createdAt: string;
    updatedAt: string;
    deliverables: Deliverable[];
    invitations: Invitation[];
    brand?: Brand;
}

type CampaignDataResponse = {
    campaigns: BrandCampaign[];
};

const filters = ["Open Campaigns", "Invites Campaigns", "Finished", "Rejected"];

const BrandsCampaignListingPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("Open Campaigns");
    const [showCampaignDetail, setShowCampaignDetail] = useState<boolean>(false);
    const [campaignsData, setCampaignsData] = useState<BrandCampaign[]>([]);
    const router = useRouter();

    const getFilterParam = (filter: string): string => {
        const filterMap: Record<string, string> = {
            "Open Campaigns": "open",
            "Invites Campaigns": "invite",
            "Finished": "finished",
            "Rejected": "rejected"
        };
        return filterMap[filter] || "open";
    };

    const {data: myCampaigns} = useFetchApi<CampaignDataResponse>({
        endpoint: `campaign/by-category?type=${getFilterParam(selectedFilter)}`,
    })
    useEffect(() => {
        if(myCampaigns){
            setCampaignsData(myCampaigns.campaigns)
        }
    }, [myCampaigns])
    console.log(campaignsData)

    if(showCampaignDetail){
        return <BrandsDetailScreen showAppliedStatus={true} appliedStatus={"applied"} onBack={() => setShowCampaignDetail(false)}/>
    }

    const handleViewCampaignDetail = (campaignId: number) => {
        router.push(`/brands/campaign/my-campaign/${campaignId}`);
    }


    
  return (
    <div className='mt-3 px-4'>
        <div className="back flex items-center gap-x-4">
            <button onClick={() => router.back()}><ChevronLeft size={24}/></button>
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
            {
                campaignsData.length === 0 ? (
                    <div className='flex flex-col items-center justify-center gap-y-4 my-auto min-h-[70vh]'>
                        <div>
                            <Image src={"/images/icons/circle-megaphone.svg"} alt={"megaphone"} width={156} height={156}/>
                        </div>
                        <p className='text-theme-primary/30 font-semibold'>NO CAMPAIGNS LISTED</p>
                    </div>
                ) : (
                    campaignsData.map((campaign) => (
                        <div key={campaign.id}>
                            <CampaignCard
                                brandLogo={campaign?.brand?.profileImage || ""}
                                title={campaign.name}
                                brandName={campaign?.brand?.brandName || ""}
                                category={campaign?.category}
                                deliverable={campaign?.deliverableFormat}
                                onViewCampaignDetail={() => handleViewCampaignDetail(campaign.id)}
                                numberOfApplications={122}
                            />
                        </div>
                    ))
                )   
            }
        </div>
    </div>
  )
}

export default BrandsCampaignListingPage