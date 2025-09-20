import Image from 'next/image';
import React from 'react'

interface TopInfluencerCardProps {
    name: string;
    image: string;
}

const TopInfluencerCard = ({ name, image }: TopInfluencerCardProps) => {

  return (
    <div className='flex flex-col items-center'>
        <div className='w-20 h-20 rounded-full overflow-hidden relative'>
            <Image src={image} alt="influencer image" fill className='object-contain' />
        </div>
        <p className='font-medium text-black text-sm'>{name}</p>
    </div>
  )
}

export default TopInfluencerCard