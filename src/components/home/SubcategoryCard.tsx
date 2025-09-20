import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation'

const SubcategoryCard = ({ title, imagePath }: { title: string, imagePath: string }) => {
  const router = useRouter()

  const handleClick = () => {
    // Check if it's desktop (>= 1024px) for page redirection
    if (window.innerWidth >= 1024) {
      router.push('/shops/123/products/456')
    } else {
      // For mobile/tablet, dispatch custom event to trigger bottom sheet
      const event = new CustomEvent('subcategory-click', { detail: { title } })
      window.dispatchEvent(event)
    }
  }

  return (
    <div 
      onClick={handleClick}
      className='border border-white dark:border-[#292929] w-24 h-24 p-1 rounded-full md:w-48 md:h-48 md:p-3 cursor-pointer hover:opacity-80 transition-opacity'
    >
      <div className='bg-white dark:bg-[#292929] w-full h-full rounded-full relative'>
        <div className='absolute inset-0 flex items-center justify-center p-2'>
          <Image src={imagePath} alt={title} fill className="object-contain" />
        </div>
      </div>
      <p className='font-medium text-sm mt-2 text-center text-nowrap md:text-xl md:mt-5 dark:text-white'>{title}</p>
    </div>
  )
}

export default SubcategoryCard
