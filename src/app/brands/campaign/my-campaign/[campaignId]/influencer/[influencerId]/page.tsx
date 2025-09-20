"use client"
import CampaignInfluencerDetailScreen from '@/components/screens/CampaignInfluencerDetailScreen'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

  useEffect(() => {
    params.then(({ campaignId, influencerId }) => {
      setCampaignId(campaignId)
      setInfluencerId(influencerId)
    })
  }, [params])
  console.log(campaignId);

  const handleBack = () => {
    router.back()
  }

  const handleViewProfile = () => {
    router.push(`/influencers/${influencerId}`)
  }

  return (
    <CampaignInfluencerDetailScreen
      onBack={handleBack}
      onViewProfile={handleViewProfile}
    />
  )
}

export default InfluencerDetailPage