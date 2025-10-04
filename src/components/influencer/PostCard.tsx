"use client"
import { Heart, MoreHorizontal, Send, Pencil, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { useAuthContext } from '@/auth/context/auth-provider'
import PopoverComponent from '../common/Popover'
import useMutationApi from '@/hooks/useMutationApi'
import { useRouter } from 'next/navigation'

export interface Post {
  id: number | string
  content: string
  mediaUrls: string[]
  userType: string
  influencerId?: number
  brandId?: number
  likesCount?: number
  createdAt?: string
  updatedAt?: string
}

interface SinglePostCardProps {
  post?: Post
  refetchPosts?: () => void
}

interface PostCardProps {
  posts?: Post[]
  refetchPosts?: () => void
}

const SinglePostCard = ({post, refetchPosts}: SinglePostCardProps) => {
  const { user, token } = useAuthContext()
  const [isLiked, setIsLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(post?.likesCount || 0)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)
  const [postId, setPostId] = useState<number | null>(null)
  const router = useRouter()
  console.log(likesCount)

  const {mutateAsync: likePostMutation, isPending: likePostLoading} = useMutationApi({
    endpoint: `posts/${post?.id}/like`,
    method: 'POST',
    options:{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    },
    onSuccess: () => {
      refetchPosts?.()
    }
  })

  const handleHeartClick = async () => {
    console.log(post?.id)
    if (likePostLoading) return // Prevent multiple clicks

    // Optimistic update
    const newIsLiked = !isLiked
    setIsLiked(newIsLiked)
    setLikesCount(prev => newIsLiked ? prev + 1 : prev - 1)

    try {
      await likePostMutation({})
    } catch (error) {
      // Revert on error
      setIsLiked(!newIsLiked)
      setLikesCount(prev => newIsLiked ? prev - 1 : prev + 1)
      console.error('Failed to like post:', error)
    }
  }

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAnchorEl(null)
  }

  const handleEditPost = (postId: number | string | undefined) => {
    router.push(`/influencers/edit-post/${postId}`)
    handlePopoverClose()
    // Add edit logic here
  }

  const {mutateAsync: deletePost } = useMutationApi({
    endpoint: `posts/${postId}`,
    method: 'DELETE',
    onSuccess: () => {
      refetchPosts?.()
    }
  })

  const handleDeletePost = async () => {
    try {
      await deletePost({})
      handlePopoverClose()
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  // Calculate time ago from createdAt
  const getTimeAgo = (date?: string) => {
    if (!date) return 'Just now'
    const now = new Date()
    const postDate = new Date(date)
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000)

    if (diffInSeconds < 60) return 'Just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  const profileImage = user?.profileImage || '/images/user/influencer.svg'
  const username = user?.username || user?.name || 'User'
  const isVerified = user?.verification?.isProfileCompleted || false
  const postImage = post?.mediaUrls?.[0] || '/images/user/influencer.svg'

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
            <span className="text-sm text-black">{getTimeAgo(post?.createdAt)}</span>
          </div>
        </div>
        <button
          onClick={(event) => {
            setPostId(post?.id ? Number(post.id) : null)
            handlePopoverOpen(event)
          }}
          className="p-1 hover:bg-gray-100 rounded-full"
        >
          <MoreHorizontal size={20} className="text-gray-600" />
        </button>

        <PopoverComponent
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
        >
          <div className='w-44 border-2 border-[#E4E4E4] rounded-xl'>
            <button
              onClick={() => handleEditPost(post?.id)}
              className="w-full first:rounded-t-xl py-3 ps-4 text-left text-sm border-b border-[#E4E4E4] hover:bg-gray-50 transition-colors flex items-center gap-3"
            >
              <Pencil size={16} />
              <span>Edit Post</span>
            </button>
            <button
              onClick={handleDeletePost}
              className="w-full py-3 ps-4 text-left text-sm last:border-b-0 hover:bg-gray-50 transition-colors last:rounded-b-xl flex items-center gap-3 text-red-500"
            >
              <Trash2 size={16} />
              <span>Delete Post</span>
            </button>
          </div>
        </PopoverComponent>
      </div>

      {/* Content */}
      <div className="py-4">
        <p className="text-[#555] text-sm">{post?.content}</p>
      </div>

      {/* Image */}
      {post?.mediaUrls && post.mediaUrls.length > 0 && (
        <div className="relative aspect-square w-full h-52 overflow-hidden rounded-xl">
          <Image
            src={postImage}
            alt="Post content"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 py-4">
        <button
          className="flex items-center gap-1 hover:bg-gray-50 rounded-full transition-colors"
          onClick={handleHeartClick}
          disabled={likePostLoading}
        >
          <Heart
            size={20}
            className={`${isLiked ? 'text-red-500 fill-current' : 'text-gray-600'} transition-colors ${likePostLoading ? 'opacity-50' : ''}`}
          />
          <span className="text-sm font-medium text-black">{post?.likesCount}</span>
        </button>
        <button className="">
          <Send size={20} className="text-black" />
        </button>
      </div>
    </div>
  )
}

const PostCard = ({ posts, refetchPosts }: PostCardProps) => {
  // Show message if no posts
  if (!posts || posts.length === 0) {
    return (
      <div className='flex flex-col items-center gap-y-4 justify-center min-h-[20vh] py-14 px-4'>
        <p className='text-[#555] font-medium text-sm text-center'>No posts yet</p>
        <p className='text-[#999] text-xs text-center'>Start creating content to share with your audience</p>
      </div>
    )
  }
  console.log(posts)

  // Render all posts
  return (
    <div className='pb-14'>
      {posts?.map((post) => (
        <SinglePostCard
          key={post.id}
          post={post}
          refetchPosts={refetchPosts}
        />
      ))}
    </div>
  )
}

export default PostCard