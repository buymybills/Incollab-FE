"use client"
import BrandsBottomTab from '@/components/common/BrandsBottomTab'
import PostCard, { Post } from '@/components/influencer/PostCard'
import TopInfluencerCard from '@/components/influencer/TopInfluencerCard'
import useFetchApi from '@/hooks/useFetchApi'
import AppHeader from '@/layout/AppHeader'
import { useEffect, useState } from 'react'

interface TopInfluencer {
  id: number;
  name: string;
  username: string;
  profileImage: string;
  isVerified?: boolean;
}

interface TopInfluencersResponse {
  limit: number;
  offset: number;
  topInfluencers: TopInfluencer[];
  total: number;
}

const InfluencerPage = () => {
      const [allPosts, setAllPosts] = useState<Post[]>([]);
      const [topInfluencers, setTopInfluencers] = useState<TopInfluencer[]>([]);

      const {data: topInfluencerData} = useFetchApi<TopInfluencersResponse>({
        endpoint: 'influencer/top-influencers'
      })

      useEffect(() => {
        if (topInfluencerData) {
          setTopInfluencers(topInfluencerData.topInfluencers);
        }
      }, [topInfluencerData])

      console.log(topInfluencerData)
      // const verificationStatus = user?.verificationStatus?.status;
    
      const {data: posts, retrieve: refetchPosts} = useFetchApi<{
        posts: Post[]
      }>({
        endpoint: 'posts'
      })

      useEffect(() => {
        if(posts){
          setAllPosts(posts.posts)
        }
      }, [posts])
    return (
        <div className='pb-4'>
            <div className="header">
                <AppHeader/>
            </div>
            <div className="top-influencer px-4">
                <p className='font-bold text-black'>Top Influencers</p>
                <div className="flex items-center gap-3 overflow-x-scroll no-scrollbar mt-2 mb-3">
                    {topInfluencers.length > 0 ? (
                        topInfluencers.map((influencer) => (
                            <TopInfluencerCard
                                key={influencer.id}
                                name={influencer.username}
                                image={influencer.profileImage || "/images/user/influencer.svg"}
                            />
                        ))
                    ) : (
                        <p className='text-gray-500 text-sm'>No top influencers available</p>
                    )}
                </div>
            </div>
            <div className="post-card px-4">
                <PostCard posts={allPosts} refetchPosts={refetchPosts}/>
            </div>
            <BrandsBottomTab activeTab='home' />
        </div>
    )
}

export default InfluencerPage