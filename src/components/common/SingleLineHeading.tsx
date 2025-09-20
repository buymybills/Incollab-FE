import React from 'react'

const SingleLineHeading = ({ title }: { title: string }) => {
  return (
    <div className='flex items-center justify-start gap-2'>
      <h2 className='text-sm font-black text-[#222222] dark:text-white uppercase'>{title}</h2>
      <div className='w-14 h-[1px] dark:bg-gradient-to-r bg-gradient-to-l from-white via-gray-500 to-[#000] dark:from-[#222] dark:via-gray-700 dark:to-white' />
    </div>
  )
}

export default SingleLineHeading;