"use client"
import { Heart, MoreHorizontal, Send } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

interface PostCardProps {
  profileImage?: string
  username?: string
  isVerified?: boolean
  timeAgo?: string
  content?: string
  postImage?: string
  likes?: string | number
  initialLiked?: boolean
}

const PostCard = ({
  profileImage = "/images/user/influencer.svg",
  username = "Sneha Sharma",
  isVerified = true,
  timeAgo = "3 days ago",
  content = "Obsessed with all things fashion & beauty ✨ Sharing daily looks, skincare secrets & makeup tips that anyone can try!",
  postImage = "/images/user/influencer.svg",
  likes = "3k",
  initialLiked = false
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(initialLiked)

  const handleHeartClick = () => {
    setIsLiked(!isLiked)
  }
  return (
    <div className="bg-white border-dashed border-b border-[#E4E4E4] overflow-hidden max-w-md mx-auto pt-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden">
            <Image
              src={profileImage}
              alt={username}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <span className="font-semibold text-black">{username}</span>
              {isVerified && (
                <div className='relative h-4 w-4 mt-0.5'>
                  <Image src="/images/common/verification-badge.svg" alt="verification-badge" fill className='object-cover' />
                </div>
              )}
            </div>
            <span className="text-sm text-black">{timeAgo}</span>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 rounded-full">
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="py-4">
        <p className="text-[#555] text-sm">{content}</p>
      </div>

      {/* Image */}
      <div className="relative aspect-square w-full h-52 overflow-hidden rounded-xl">
        <Image
          src={postImage}
          alt="Post content"
          fill
          className="object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 py-4">
        <button
          className="flex items-center gap-1 hover:bg-gray-50 rounded-full transition-colors"
          onClick={handleHeartClick}
        >
          <Heart
            size={20}
            className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'} transition-colors`}
          />
          <span className="text-sm font-medium text-black">{likes}</span>
        </button>
        <button className="">
          <Send size={20} className="text-black" />
        </button>
      </div>
    </div>
  )
}

export default PostCard