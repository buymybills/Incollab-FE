"use client"
import React, { useEffect, useState } from 'react'
import PostCard from '@/components/influencer/PostCard'
import { DiamondPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuthContext } from '@/auth/context/auth-provider'
import useFetchApi from '@/hooks/useFetchApi'
import { Post } from '@/components/influencer/PostCard'

const PostTab = () => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  console.log(user);

  const verificationStatus = user?.verificationStatus?.status;

  const {data: posts, retrieve: refetchPosts} = useFetchApi<{
    posts: Post[]
  }>({
    endpoint: `posts/user/brand/${user?.id}`,
    retrieveOnMount: !!user?.id
  })

  console.log(posts)

  useEffect(() => {
    if(posts){
      setAllPosts(posts.posts)
    }
  }, [posts])

  // Show verify profile button if not verified
  if (verificationStatus !== 'approved') {
    return (
      <div className='flex flex-col items-center gap-y-2 justify-center min-h-[20vh] py-14 px-4'>
        <p className='text-[#555] font-medium text-sm text-center'>COMPLETE VERIFICATION TO POST CONTENT</p>
        <button
          className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'
          onClick={() => router.push('/brands/me/verify')}
        >
          <DiamondPlus size={16}/>
          Verify Profile
        </button>
      </div>
    );
  }

  return (
    <div>
      <PostCard posts={allPosts} refetchPosts={refetchPosts}/>
    </div>
  )
}

export default PostTab