"use client"
import ApplicationDetailScreen from '@/components/brands/screens/ApplicationDetailScreen'
import ApplicationCard from '@/components/common/ApplicationCard'
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

interface CampaignResponse {
    campaigns: Campaign[];
}

const CampaignsListingPage = () => {
    const [showDetailScreen, setShowDetailScreen] = useState<boolean>(false);
    const [campaignsData, setCampaignsData] = useState<Campaign[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [selectedApplicationStatus, setSelectedApplicationStatus] = useState<string>('');
    const [selectedAppliedDate, setSelectedAppliedDate] = useState<string>('');
    const router = useRouter();

    const handleViewApplicationDetail = (campaignId: number, applicationStatus: string, createdAt: string) => {
        setSelectedCampaignId(campaignId);
        setSelectedApplicationStatus(applicationStatus);
        setSelectedAppliedDate(getTimeAgo(createdAt));
        setShowDetailScreen(true);
    };

    const getTimeAgo = (dateString: string) => {
        const createdDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - createdDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Applied today';
        if (diffInDays === 1) return 'Applied 1 day ago';
        return `Applied ${diffInDays} days ago`;
    };

    const {data: campaigns} = useFetchApi<CampaignResponse>({
        endpoint: 'campaign',
    })
    
    useEffect(() => {
        if(campaigns){
            setCampaignsData(campaigns.campaigns)
        }
    }, [campaigns])

    console.log(campaignsData)
  return (
    <>
        {
            showDetailScreen ? <ApplicationDetailScreen appliedStatus={selectedApplicationStatus} selectedCampaignId={selectedCampaignId} appliedDate={selectedAppliedDate} onBack={() => setShowDetailScreen(false)}/> :
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
                            <ApplicationCard
                                key={campaign.id}
                                brandLogo={campaign.brand.profileImage}
                                title={campaign.name}
                                brandName={campaign.brand.brandName}
                                category={campaign.category}
                                deliverable={deliverableText}
                                onViewApplicationDetail={() => handleViewApplicationDetail(campaign.id, campaign.status, campaign.createdAt)}
                                appliedStatus={campaign.status}
                                appliedDate={getTimeAgo(campaign.createdAt)}
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