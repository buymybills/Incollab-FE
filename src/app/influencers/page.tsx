import PostCard from '@/components/influencer/PostCard'
import TopInfluencerCard from '@/components/influencer/TopInfluencerCard'
import AppHeader from '@/layout/AppHeader'
import React from 'react'

const InfluencerPage = () => {
  return (
    <div>
        <div className="header">
            <AppHeader/>
        </div>
        <div className="top-influencer px-4">
            <p className='font-bold text-black'>Top Influencers</p>
            <div className="flex items-center gap-3 overflow-x-scroll no-scrollbar mt-2 mb-3">
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
                <TopInfluencerCard name='sneha_s19' image="/images/user/influencer.svg"/>
            </div>
        </div>
        <div className="post-card px-4">
            <PostCard/>
            <PostCard/>
        </div>
    </div>
  )
}

export default InfluencerPage