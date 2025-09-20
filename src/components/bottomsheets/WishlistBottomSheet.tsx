'use client'

import { ArrowLeft, Heart } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'


interface WishlistBottomSheetProps {
  isOpen: boolean
  onClose: () => void
}

const wishlistCollection = [
  {
    image: "/images/products/product-1.svg",
    collectionName: "Wishlist",
    numberOfItems: 2
  },
  {
    image: "/images/products/product-1.svg",
    collectionName: "Shoe",
    numberOfItems: 2
  },
  {
    image: "/images/products/product-1.svg",
    collectionName: "Shoe",
    numberOfItems: 2
  },
  {
    image: "/images/products/product-1.svg",
    collectionName: "Shoe",
    numberOfItems: 2
  },
  {
    image: "/images/products/product-1.svg",
    collectionName: "Shoe",
    numberOfItems: 2
  },
  {
    image: "/images/products/product-1.svg",
    collectionName: "Shoe",
    numberOfItems: 2
  },
]

export default function WishlistBottomSheet({ isOpen, onClose }: WishlistBottomSheetProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const startY = useRef(0)
  const sheetRef = useRef<HTMLDivElement>(null)

  const minHeight = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400 // 60% of screen initially
  const maxHeight = typeof window !== 'undefined' ? window.innerHeight * 0.7 : 560 // 70% of screen

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentY = e.touches[0].clientY
    const deltaY = currentY - startY.current

    if (isExpanded) {
      // Only allow dragging down when expanded
      if (deltaY > 0) {
        setDragY(Math.min(deltaY, maxHeight - minHeight))
      }
    } else {
      // Only allow dragging up when collapsed
      if (deltaY < 0) {
        setDragY(Math.max(deltaY, -(maxHeight - minHeight)))
      }
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    const threshold = 50 // pixels
    const closeThreshold = 200 // pixels to close

    if (!isExpanded && dragY > closeThreshold) {
      // Close the bottom sheet
      onClose()
      setDragY(0)
      return
    }

    if (isExpanded && dragY > threshold) {
      // Collapse
      setIsExpanded(false)
      setDragY(0)
    } else if (!isExpanded && dragY < -threshold) {
      // Expand
      setIsExpanded(true)
      setDragY(0)
    } else {
      // Snap back
      setDragY(0)
    }
  }

  const currentHeight = isExpanded
    ? maxHeight - dragY
    : minHeight - dragY

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000]/70 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className={`fixed bottom-0 left-0 right-0 bg-[#F1F1F1] dark:bg-[#1B1B1B] shadow-xl z-50 transition-transform duration-300 ease-out ${isExpanded ? '' : 'rounded-t-3xl'
          }`}
        style={{
          height: `${currentHeight}px`,
          transform: `translateY(${Math.max(0, dragY)}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, height 0.3s ease-out'
        }}
      >
        {/* Drag Handle */}
        <div
          className="absolute top-0 left-0 right-0 h-12 cursor-grab active:cursor-grabbing"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1 bg-gray-300 dark:bg-white rounded-full mx-auto mt-3" />
        </div>

        {/* Content */}
        <div className="h-full overflow-y-auto pt-8">
          <div className="px-5">
            <div className="flex flex-col">
                <div className="relative flex items-center h-12">
                  <button className="z-10" onClick={onClose}>
                    <ArrowLeft className="dark:text-white text-[#000]" />
                  </button>
                  <h1 className="absolute left-0 right-0 text-lg font-semibold text-center dark:text-white">
                    Add to Wishlist
                  </h1>
                </div>
                <div className="relative flex items-center h-12 justify-between">
                  <p className='font-medium text-base dark:text-white'>Collections</p>
                  <button className='font-medium text-sm text-[#0566EA]'>Create New Collections</button>
                </div>
                <div className="overflow-y-auto no-scrollbar max-h-96">
              {wishlistCollection.map((item, idx) => (
                <div className='mb-5' key={item.collectionName + idx}>
                  <div className='flex items-center justify-between'>
                    <div className="collection-detail flex items-center gap-3">
                      <div className='rounded-md overflow-hidden'>
                        <Image src={item.image} alt={item.collectionName} width={60} height={60}/>
                      </div>
                      <div className='flex items-center gap-2'>
                        <p className='font-bold text-base dark:text-white'>{item.collectionName}</p>
                        <p className='font-normal text-base dark:text-white'>{`(${item.numberOfItems} item${item.numberOfItems > 1 ? 's' : ''})`}</p>
                      </div>
                    </div>
                    <button>
                      <Heart className='dark:text-[#999999]'/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}