import React from 'react'

const LineHeading = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center justify-center gap-4'>
      <div className='w-14 h-[2px] dark:bg-gradient-to-l bg-gradient-to-r from-[#F1F1F1] via-gray-500 to-[#000] dark:from-[#222] dark:via-gray-700 dark:to-white' />
      <h2 className='text-base md:text-xl md:font-black font-bold text-[#222222] dark:text-white uppercase text-nowrap'>{title}</h2>
      <div className='w-14 h-[2px] dark:bg-gradient-to-r bg-gradient-to-l from-[#F1F1F1] via-gray-500 to-[#000] dark:from-[#222] dark:via-gray-700 dark:to-white' />
    </div>
  )
}

export default LineHeading
