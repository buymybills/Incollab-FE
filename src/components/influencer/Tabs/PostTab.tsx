"use client"
import React from 'react'
import PostCard from '../PostCard'
import { DiamondPlus } from 'lucide-react'

const PostTab = () => {
  return (
    <div>
        <PostCard/>
        <div className='apply-for-campaign flex flex-col items-center gap-y-4 justify-center'>
            <p className='text-[#555] font-medium text-sm'>COMPLETE VERIFICATION TO POST CONTENT</p>
            <button className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'>
                <DiamondPlus size={16}/>
                Verify Profile
            </button>
        </div>
    </div>
  )
}

export default PostTab