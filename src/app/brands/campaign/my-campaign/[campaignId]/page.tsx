"use client"
import BottomSheet from '@/components/bottomsheets/BottomSheet';
import CampaignInfluencerCard from '@/components/influencer/cards/CampaignInfluencerCard';
import CampaignInfluencerDetailScreen from '@/components/screens/CampaignInfluencerDetailScreen';
import useFetchApi from '@/hooks/useFetchApi';
import { ChevronDown, ChevronLeft, Filter } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface City {
    id: number;
    name: string;
    state: string;
    tier: number;
}

interface Niche {
    id: number;
    name: string;
    logoNormal: string;
    logoDark: string;
}

interface CollaborationCosts {
    instagram: {
        reel: number;
        story: number;
        post: number;
    };
    youtube: {
        short: number;
        longVideo: number;
    };
}

interface Influencer {
    id: number;
    name: string;
    username: string;
    phone: string;
    phoneHash: string;
    dateOfBirth: string;
    gender: string;
    othersGender: string | null;
    bio: string;
    profileImage: string;
    profileBanner: string;
    profileHeadline: string;
    fcmToken: string | null;
    countryId: number;
    cityId: number;
    whatsappNumber: string;
    whatsappHash: string | null;
    isWhatsappVerified: boolean;
    instagramUrl: string;
    youtubeUrl: string;
    facebookUrl: string;
    linkedinUrl: string;
    twitterUrl: string;
    collaborationCosts: CollaborationCosts;
    isProfileCompleted: boolean;
    isPhoneVerified: boolean;
    isActive: boolean;
    isVerified: boolean;
    isTopInfluencer: boolean;
    lastLoginAt: string;
    createdAt: string;
    updatedAt: string;
    city: City;
    niches: Niche[];
    completedCampaigns: number;
    totalFollowers: number;
}

interface CampaignApplication {
    id: number;
    campaignId: number;
    influencerId: number;
    status: string;
    coverLetter: string | null;
    proposalMessage: string | null;
    reviewedAt: string | null;
    reviewNotes: string | null;
    createdAt: string;
    updatedAt: string;
    influencer: Influencer;
}

type ApplicationsResponse = {
    applications: CampaignApplication[];
}

const applicationFilters = ["All Applicants", "Under Review", "Selected", "Rejected"];

const CampaignDetailPage = () => {
    const [selectedFilter, setSelectedFilter] = useState<string>("All Applicants");
    const [allApplications, setAllApplications] = useState<CampaignApplication[]>([]);
    const [showApplicationDetail, setShowApplicationDetail] = useState<boolean>(false);
    const [selectedApplication, setSelectedApplication] = useState<CampaignApplication | null>(null);
    const [showFilterBottomSheet, setShowFilterBottomSheet] = useState<boolean>(false);
    const [selectedFilterTab, setSelectedFilterTab] = useState<string>("Gender");
    const [filters, setFilters] = useState({
        gender: "",
        age: { min: "", max: "" },
        niche: [] as string[],
        experience: { min: "", max: "" },
        location: [] as string[],
        platform: [] as string[]
    });
    const router = useRouter();
    const params = useParams();

    const getFilterParam = (filter: string): string => {
        const filterMap: Record<string, string> = {
            "All Applicants": "",
            "Under Review": "under_review",
            "Selected": "selected",
            "Rejected": "rejected"
        };
        return filterMap[filter] || "";
    };

    const buildEndpoint = () => {
        const baseEndpoint = `campaign/${params.campaignId}/applications`;
        const params_array: string[] = [];

        const statusParam = getFilterParam(selectedFilter);
        if (statusParam) {
            params_array.push(`status=${statusParam}`);
        }

        if (filters.gender) {
            params_array.push(`gender=${filters.gender}`);
        }

        return params_array.length > 0
            ? `${baseEndpoint}?${params_array.join('&')}`
            : baseEndpoint;
    };

    const {data: campaignApplications} = useFetchApi<ApplicationsResponse>({
        endpoint: buildEndpoint(),
    })

    useEffect(() => {
        if (campaignApplications) {
            setAllApplications(campaignApplications?.applications);
        }
    }, [campaignApplications]);

    const handleViewApplicationDetail = (application: CampaignApplication) => {
        setSelectedApplication(application);
        setShowApplicationDetail(true);
    };

    const handleBackFromDetail = () => {
        setShowApplicationDetail(false);
        setSelectedApplication(null);
    };

    const handleGenderSelect = (gender: string) => {
        setFilters(prev => ({
            ...prev,
            gender: gender
        }));
    };


    const calculateAge = (dateOfBirth: string): number => {
        const birthDate = new Date(dateOfBirth);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const formatLocation = (city: City): string => {
        return `${city.name}, ${city.state}`;
    };

    const mapApiStatusToDisplayStatus = (status: string): 'Selected' | 'Under Review' | 'Rejected' | undefined => {
        const statusMap: Record<string, 'Selected' | 'Under Review' | 'Rejected'> = {
            'selected': 'Selected',
            'under_review': 'Under Review',
            'rejected': 'Rejected'
        };
        return statusMap[status];
    };

    if (showApplicationDetail && selectedApplication) {
        const influencer = selectedApplication.influencer;
        return (
            <CampaignInfluencerDetailScreen
                name={influencer.name}
                age={calculateAge(influencer.dateOfBirth)}
                gender={influencer.gender}
                location={formatLocation(influencer.city)}
                profileImage={influencer.profileImage}
                isVerified={influencer.isVerified}
                status={mapApiStatusToDisplayStatus(selectedApplication.status)}
                niches={influencer.niches.map(n => n.name)}
                campaignExperience={influencer.completedCampaigns}
                onBack={handleBackFromDetail}
                campaignId={Number(params.campaignId)}
                influencerId={influencer.id}
                applicationId={selectedApplication.id}
            />
        );
    }

    return (
        <div className='mt-3'>
            <div className="back flex items-center gap-x-4 px-4">
                <button onClick={() => router.back()}><ChevronLeft size={24}/></button>
                <span className='font-bold text-xl'>Campaign Management</span>
            </div>
            <div className="filters mt-5 flex items-center gap-x-2 overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] py-5 px-4">
                {
                    applicationFilters.map((filter) => (
                        <button key={filter} onClick={() => setSelectedFilter(filter)} className={`text-nowrap text-black text-sm px-4 py-2 rounded-full transition-colors ${selectedFilter === filter ? "bg-theme-primary text-white font-bold" : "font-medium bg-white border border-[#E4E4E4]"}`}>
                            {filter}
                        </button>
                    ))
                }
            </div>
            <div className="filters mt-5 flex items-center gap-x-2 overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] pb-5 px-4">
                <button className='bg-theme-primary py-2 px-4 rounded-full text-white'>
                    All
                </button>
                <button
                    onClick={() => setShowFilterBottomSheet(true)}
                    className='bg-white py-2 px-3 rounded-full text-black border border-[#E4E4E4] flex items-center gap-x-1'
                >
                    <Filter size={14}/>
                    Filter
                </button>
                <button className='bg-white py-2 px-3 rounded-full text-black border border-[#E4E4E4] flex items-center gap-x-1'>
                    Sort By
                    <ChevronDown size={14}/>
                </button>
            </div>
            <div className="applicants-card px-4">
                {
                    allApplications.length === 0 ?
                    (
                        <div className='flex flex-col items-center justify-center gap-y-4 my-auto min-h-[50vh]'>
                            <Image src={"/images/icons/circle-megaphone.svg"} alt={"megaphone"} width={156} height={156}/>
                            <p className='text-theme-primary/30 font-semibold'>NO APPLICATIONS YET</p>
                        </div>
                    ):
                    (
                        <>
                            <div className="filters mt-5 overflow-scroll no-scrollbar border-b border-dashed border-[#E4E4E4] pb-5 px-4 flex items-center justify-center">
                                <p className='text-black font-medium'>Total Applications - </p>
                                <span className='font-bold'>{allApplications.length}</span>
                            </div>
                            {allApplications.map((application) => {
                                const influencer = application.influencer;
                                const age = calculateAge(influencer.dateOfBirth);
                                const location = formatLocation(influencer.city);
                                const niches = influencer.niches.map(n => n.name);

                                return (
                                    <div key={application.id}>
                                        <CampaignInfluencerCard
                                            name={influencer.name}
                                            age={age}
                                            gender={influencer.gender}
                                            campaignExperience={influencer.completedCampaigns}
                                            niche={niches}
                                            location={location}
                                            profileImage={influencer.profileImage}
                                            isVerified={influencer.isVerified}
                                            onClick={() => handleViewApplicationDetail(application)}
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )
                }
            </div>

            {/* Filter Bottom Sheet */}
            <BottomSheet
                isOpen={showFilterBottomSheet}
                onClose={() => setShowFilterBottomSheet(false)}
                bottomSheetMinimumHeight={500}
                bottomSheetMaximumHeight={700}
            >
                <div className="flex h-full">
                    {/* Left Side - Filter Tabs */}
                    <div className="w-1/3 border-r border-[#E4E4E4] bg-gray-50">
                        <div className="p-4">
                            <button
                                onClick={() => setShowFilterBottomSheet(false)}
                                className="flex items-center gap-2 mb-4"
                            >
                                <ChevronLeft size={20} />
                                <span className="font-bold text-black">Filter</span>
                            </button>
                        </div>
                        <div>
                            {["Gender", "Age", "Niche", "Experience", "Location", "Platform"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setSelectedFilterTab(tab)}
                                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                                        selectedFilterTab === tab
                                            ? "bg-white text-theme-primary font-bold border-l-4 border-theme-primary"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Filter Options */}
                    <div className="flex-1 p-6">
                        {selectedFilterTab === "Gender" && (
                            <div className="space-y-4">
                                {["Male", "Female", "Others"].map((gender) => (
                                    <div
                                        key={gender}
                                        className="flex items-center justify-between cursor-pointer"
                                        onClick={() => handleGenderSelect(gender)}
                                    >
                                        <span className="text-black font-medium">{gender}</span>
                                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                            filters.gender === gender
                                                ? "border-theme-primary"
                                                : "border-gray-300"
                                        }`}>
                                            {filters.gender === gender && (
                                                <div className="w-3 h-3 rounded-full bg-theme-primary"></div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {selectedFilterTab === "Age" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Age Range</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.age.min}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                age: { ...prev.age, min: e.target.value }
                                            }))}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-theme-primary"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.age.max}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                age: { ...prev.age, max: e.target.value }
                                            }))}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-theme-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedFilterTab === "Niche" && (
                            <div className="text-gray-500">
                                Niche filters coming soon...
                            </div>
                        )}

                        {selectedFilterTab === "Experience" && (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-600 mb-2 block">Experience Range</label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            value={filters.experience.min}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                experience: { ...prev.experience, min: e.target.value }
                                            }))}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-theme-primary"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            value={filters.experience.max}
                                            onChange={(e) => setFilters(prev => ({
                                                ...prev,
                                                experience: { ...prev.experience, max: e.target.value }
                                            }))}
                                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-theme-primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedFilterTab === "Location" && (
                            <div className="text-gray-500">
                                Location filters coming soon...
                            </div>
                        )}

                        {selectedFilterTab === "Platform" && (
                            <div className="text-gray-500">
                                Platform filters coming soon...
                            </div>
                        )}
                        {/* apply button */}
                        <button className="fixed bottom-2 bg-theme-primary text-white py-2 rounded-lg mt-4">Apply</button>
                    </div>
                </div>
            </BottomSheet>
        </div>
    )
}

export default CampaignDetailPage