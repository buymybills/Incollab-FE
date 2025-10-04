"use client"
import BrandsBottomTab from '@/components/common/BrandsBottomTab'
import PostCard, { Post } from '@/components/influencer/PostCard'
import TopInfluencerCard from '@/components/influencer/TopInfluencerCard'
import useFetchApi from '@/hooks/useFetchApi'
import AppHeader from '@/layout/AppHeader'
import { useEffect, useState } from 'react'

const InfluencerPage = () => {
    const [allPosts, setAllPosts] = useState<Post[]>([]);
    
      // const verificationStatus = user?.verificationStatus?.status;
    
      const {data: posts} = useFetchApi<{
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
                <PostCard posts={allPosts}/>
            </div>
            <BrandsBottomTab activeTab='home' />
        </div>
    )
}

export default InfluencerPage