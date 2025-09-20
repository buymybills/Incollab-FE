"use client"
import { CirclePlus, Gem, Highlighter, Pencil, Shirt, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface AboutUsTabProps {
  bio?: string
}

const AboutUsTab: React.FC<AboutUsTabProps> = ({ bio }) => {
  console.log(bio)
  return (
    <div className="space-y-6">
      {/* About Me Section */}
      <div>
        <div className='flex items-center mb-2 justify-between'>
          <h2 className="text-black font-extrabold text-base">About Us</h2>
          <div className='flex items-center gap-x-2'>
            <button className='flex items-center gap-x-1 text-theme-primary'>
              <CirclePlus size={16}/>
              <span>Add</span>
            </button>
            <button className='flex items-center gap-x-1 text-[#555]'>
              <Pencil size={16}/>
              <span>Edit</span>
            </button>
          </div>
        </div>
        <p className="font-medium text-sm text-black">
        LOréal Paris is a global leader in the beauty and personal care industry, recognized for its commitment to innovation, quality, and inclusivity. With a legacy that spans over a century, the brand offers a comprehensive portfolio of products across skincare, makeup, haircare, and fragrances, designed to meet the diverse needs of individuals worldwide. Guided by the belief that ‘everyone is worth it’, LOréal Paris empowers people to express themselves confidently through beauty, blending cutting-edge research with accessible luxury. From pioneering formulas backed by science to trendsetting campaigns that celebrate diversity, the brand continues to inspire millions. With a presence in over 150 countries, LOréal Paris remains dedicated to sustainability, social responsibility, and redefining beauty standards for every generation.”
        </p>
        <p className="font-medium text-sm text-black mt-3">
          {"Redefining beauty with every outfit 💄 Fashion, glam & unapologetic self-love | Let's create magic together."}
        </p>
      </div>

      {/* brand detail */}
      <div className="brand-detail">
        <h2 className='font-extrabold text-black'>Brand Detail</h2>
        <div className="details text-sm mt-3 space-y-2">
          <div className='flex items-center gap-x-1'>
            <span className='font-medium text-[#555]'>Headquarters: </span>
            <span className='font-bold text-black'>Paris, France</span>
          </div>
          <div className='flex items-center gap-x-1'>
            <span className='font-medium text-[#555]'>Founded: </span>
            <span className='font-bold text-black'>1909</span>
          </div>
          <div className='flex items-center gap-x-1'>
            <span>Website: </span>
            <span className='font-bold text-black'>www.lorealparis.com</span>
          </div>
          <div className='flex items-center gap-x-1'>
            <span>Active Regions: </span>
            <span className='font-bold text-black'>Global</span>
          </div>
        </div>
      </div>

      {/* My Niche Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">Brand Niche</h2>
          <button className='flex items-center gap-x-1 text-[#555]'>
            <Pencil size={16}/>
            <span>Edit</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 gap-x-2 py-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center"><StarIcon size={16}/> Lifestyle</span>
          <span className="px-3 py-2 gap-x-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center"><Shirt size={16}/> Fashion</span>
          <span className="px-3 py-2 gap-x-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center"><Highlighter size={16}/> Beauty</span>
          <span className="px-3 py-2 gap-x-2 border border-[#000]/20 rounded-full text-sm font-medium flex items-center"><Gem size={16}/> Accessories</span>
        </div>
      </div>

      {/* Connect Me Here Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">Our Socials</h2>
          <button className='flex items-center gap-x-1 text-[#555]'>
            <Pencil size={16}/>
            <span>Edit</span>
          </button>
        </div>
        <div className="flex gap-3">
          <div className="w-14 h-14 relative rounded-xl border border-[#E4E4E4] flex items-center justify-center">
            <Image src="/images/icons/facebook.svg" alt="Facebook" height={32} width={32}/>
          </div>
          <div className="w-14 h-14 relative p-3 rounded-xl border border-[#E4E4E4] flex items-center justify-center">
            <Image src="/images/icons/instagram.svg" alt="Instagram" height={32} width={32}/>
          </div>
          <div className="w-14 h-14 relative p-3 rounded-xl border border-[#E4E4E4] flex items-center justify-center">
            <Image src="/images/icons/youtube.svg" alt="Youtube" height={32} width={32}/>
          </div>
          <div className="w-14 h-14 relative p-3 rounded-xl border border-[#E4E4E4] flex items-center justify-center">
            <Image src="/images/icons/linkedin.svg" alt="linkedin" height={32} width={32}/>
          </div>
          <div className="w-14 h-14 relative p-3 rounded-xl border border-[#E4E4E4] flex items-center justify-center">
            <Image src="/images/icons/x-social.svg" alt="X" height={32} width={32}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUsTab