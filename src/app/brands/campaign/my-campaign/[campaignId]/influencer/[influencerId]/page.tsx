"use client"
import CampaignInfluencerDetailScreen from '@/components/screens/CampaignInfluencerDetailScreen'
import useFetchApi from '@/hooks/useFetchApi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface City {
  id: number;
  name: string;
  state: string;
}

interface Country {
  id: number;
  name: string;
  code: string;
}

interface Location {
  city: City;
  country: Country;
}

interface Niche {
  id: number;
  name: string;
  description: string;
}

interface SocialLinks {
  instagram: string;
  youtube: string;
  facebook: string;
  linkedin: string;
  twitter: string;
}

interface InfluencerProfile {
  id: number;
  name: string;
  username: string;
  bio: string;
  profileImage: string;
  profileBanner: string;
  profileHeadline: string;
  location: Location;
  niches: Niche[];
  socialLinks: SocialLinks;
}

interface InfluencerDetailPageProps {
  params: Promise<{
    campaignId: string
    influencerId: string
  }>
}

const InfluencerDetailPage = ({ params }: InfluencerDetailPageProps) => {
  const router = useRouter()
  const [campaignId, setCampaignId] = useState<string>('')
  const [influencerId, setInfluencerId] = useState<string>('')
  const [influencerProfile, setInfluencerProfile] = useState<InfluencerProfile | null>(null)

  const {data: influencerProfileData} = useFetchApi<InfluencerProfile>({
    endpoint: `influencer/profile/${influencerId}`,
    retrieveOnMount: !!influencerId
  })


  useEffect(() => {
    params.then(({ campaignId, influencerId }) => {
      setCampaignId(campaignId)
      setInfluencerId(influencerId)
    })
  }, [params])

  useEffect(() => {
    if(influencerProfileData){
      setInfluencerProfile(influencerProfileData)
    }
  }, [influencerProfileData])

  const handleBack = () => {
    router.back()
  }

  const handleViewProfile = () => {
    router.push(`/influencers/${influencerId}`)
  }

  const formatLocation = (location: Location): string => {
    return `${location.city.name}, ${location.city.state}`;
  }

  if (!influencerProfile) {
    return (
      <div className="h-full flex items-center justify-center">
        <p className="text-gray-500">Loading influencer profile...</p>
      </div>
    );
  }

  return (
    <CampaignInfluencerDetailScreen
      name={influencerProfile.name}
      location={formatLocation(influencerProfile.location)}
      profileImage={influencerProfile.profileImage}
      niches={influencerProfile.niches.map(n => n.name)}
      onBack={handleBack}
      onViewProfile={handleViewProfile}
      campaignId={Number(campaignId)}
      influencerId={Number(influencerId)}
    />
  )
}

export default InfluencerDetailPage