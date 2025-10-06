"use client"
import ApplicationAppliedScreen from '@/components/brands/screens/ApplicationAppliedScreen';
import ApplicationCard from '@/components/common/ApplicationCard';
import useFetchApi from '@/hooks/useFetchApi';
import { Check, ChevronLeft, ClockFading, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Campaign } from '../page';

const filters = ["applied", "selected", "under_review", "rejected"];

interface MyCampaignApplication {
    id: number;
    campaignId: number;
    influencerId: number;
    status: "applied" | "selected" | "under_review" | "rejected";
    createdAt: string;
    updatedAt: string;
    campaign: Campaign;
}

const MyCampaignsPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("applied");
    const [showCampaignDetail, setShowCampaignDetail] = useState<boolean>(false);
    const [myCampaignsData, setMyCampaignsData] = useState<MyCampaignApplication[]>([]);
    const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);
    const [selectedApplicationStatus, setSelectedApplicationStatus] = useState<"applied" | "under_review" | "selected" | "rejected">("applied");
    const [selectedAppliedDate, setSelectedAppliedDate] = useState<string>('');
    const router = useRouter();

    const { data: myCampaigns } = useFetchApi<MyCampaignApplication[]>({
        endpoint: `influencer/campaigns/my-applications?status=${selectedFilter}`
    });

    useEffect(() => {
        if (myCampaigns) {
            setMyCampaignsData(myCampaigns);
        }
    }, [myCampaigns]);

    console.log(myCampaignsData)

    const getTimeAgo = (dateString: string) => {
        const createdDate = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - createdDate.getTime();
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

        if (diffInDays === 0) return 'Applied today';
        if (diffInDays === 1) return 'Applied 1 day ago';
        return `Applied ${diffInDays} days ago`;
    };

    const handleViewCampaignDetail = (campaignId: number, status: "applied" | "under_review" | "selected" | "rejected", createdAt: string) => {
        setSelectedCampaignId(campaignId);
        setSelectedApplicationStatus(status);
        setSelectedAppliedDate(getTimeAgo(createdAt));
        setShowCampaignDetail(true);
        console.log(campaignId)
    };


    if(showCampaignDetail){
        return <ApplicationAppliedScreen appliedStatus={selectedApplicationStatus} showPopover={true} popOverButton="Withdraw" selectedCampaignId={selectedCampaignId} appliedDate={selectedAppliedDate} onBack={() => setShowCampaignDetail(false)} showApplyButton={false}/>
    }
  return (
    <div className='mt-3 px-4'>
        <div className="back flex items-center gap-x-4">
            <button onClick={() => router.back()}><ChevronLeft size={24}/></button>
            <span className='font-bold text-xl'>My Campaigns</span>
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
        <div className="mt-6 space-y-4">
            {myCampaignsData.length > 0 ? (
                myCampaignsData.map((application) => {
                    const deliverableText = application.campaign.deliverables
                        .map(d => `${d.quantity} ${d.platform} ${d.type.replace(/_/g, ' ')}`)
                        .join(', ');

                    return (
                        <ApplicationCard
                            key={application.id}
                            brandLogo={application.campaign.brand.profileImage}
                            title={application.campaign.name}
                            brandName={application.campaign.brand.brandName}
                            category={application.campaign.category}
                            deliverable={deliverableText}
                            appliedStatus={application.status}
                            appliedDate={getTimeAgo(application.createdAt)}
                            onViewApplicationDetail={() => handleViewCampaignDetail(application.campaign.id, application.status, application.createdAt)}
                        />
                    );
                })
            ) : (
                <div className='flex flex-col items-center gap-y-6 justify-center min-h-[50vh]'>
                    <div className='w-32 h-32 rounded-full border-8 border-[#3284F1]/10 flex items-center justify-center'>
                        {
                            selectedFilter === 'applied' && (
                                <Check className='text-[#3284F1]/10' size={100}/>
                            )
                        }
                        {
                            selectedFilter === 'selected' && (
                                <Check className='text-[#3284F1]/10' size={100}/>
                            )
                        }
                        {
                            selectedFilter === 'under_review' && (
                                <ClockFading className='text-[#3284F1]/10' size={100}/>
                            )
                        }
                        {
                            selectedFilter === 'rejected' && (
                                <X className='text-[#3284F1]/10' size={100}/>
                            )
                        }
                    </div>
                    <p className='text-[#B8D9FF] font-medium text-sm uppercase tracking-wide'>
                        {selectedFilter === 'applied' && 'NO APPLICATION APPLIED'}
                        {selectedFilter === 'selected' && 'NO APPLICATION SELECTED'}
                        {selectedFilter === 'under_review' && 'NO APPLICATION UNDER REVIEW'}
                        {selectedFilter === 'rejected' && 'NO APPLICATION REJECTED'}
                    </p>
                </div>
            )}
        </div>
    </div>
  )
}

export default MyCampaignsPage