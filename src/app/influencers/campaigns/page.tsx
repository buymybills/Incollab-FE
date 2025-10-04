"use client"
import CampaignDetailScreen from '@/components/brands/screens/CampaignDetailScreen'
import CampaignCard from '@/components/common/CampaignCard'
import useFetchApi from '@/hooks/useFetchApi'
import { ChevronDown, ChevronLeft, Filter } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Brand {
    id: number;
    brandName: string;
    profileImage: string;
}

interface City {
    id: number;
    campaignId: number;
    cityId: number;
    city: {
        id: number;
        name: string;
        tier: number;
    };
}

interface Deliverable {
    platform: string;
    type: string;
    budget: string;
    quantity: number;
}

export interface Campaign {
    id: number;
    brandId: number;
    name: string;
    description: string;
    category: string;
    deliverableFormat: string;
    status: string;
    type: string;
    isInviteOnly: boolean;
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
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    brand: Brand;
    cities: City[];
    deliverables: Deliverable[];
}

export interface CampaignDataResponse{
    campaigns: Campaign[]
}

const CampaignsListingPage = () => {
    const [showDetailScreen, setShowDetailScreen] = useState<boolean>(false);
    const [campaignsData, setCampaignsData] = useState<Campaign[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const router = useRouter();

    const handleViewCampaignDetail = (campaignId: number) => {
        setSelectedCampaignId(campaignId);
        setShowDetailScreen(true);
    };

    const {data: campaigns} = useFetchApi<CampaignDataResponse>({
        endpoint: 'campaign',
    })
    
    useEffect(() => {
        if(campaigns){
            setCampaignsData(campaigns?.campaigns)
        }
    }, [campaigns])

    console.log(campaignsData)
  return (
    <>
        {
            showDetailScreen ? <CampaignDetailScreen showPopover={false} popOverButton="Withdraw" selectedCampaignId={selectedCampaignId} onBack={() => setShowDetailScreen(false)} showApplyButton={true}/> :
            <div className='px-4 mt-3'>
                <div className="back flex items-center gap-x-2">
                    <button onClick={() => router.back()}><ChevronLeft/></button>
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
                <div className='space-y-4 mt-4'>
                    {campaignsData.map((campaign) => {
                        const deliverableText = campaign.deliverables
                            .map(d => `${d.quantity} ${d.platform} ${d.type.replace(/_/g, ' ')}`)
                            .join(', ');

                        return (
                            <CampaignCard
                                key={campaign.id}
                                brandLogo={campaign.brand.profileImage}
                                title={campaign.name}
                                brandName={campaign.brand.brandName}
                                category={campaign.category}
                                deliverable={deliverableText}
                                status={campaign.status}
                                onViewCampaignDetail={() => handleViewCampaignDetail(campaign.id)}
                            />
                        );
                    })}
                </div>
            </div>
        }
    </>
  )
}

export default CampaignsListingPage