"use client"
import { CirclePlus, Gem, Highlighter, Pencil, Shirt, StarIcon } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface AboutUsTabProps {
  bio?: string
}

const AboutUsTab: React.FC<AboutUsTabProps> = ({ bio }) => {
  return (
    <div className="space-y-6">
      {/* About Me Section */}
      <div>
        <div className='flex items-center mb-2 justify-between'>
          <h2 className="text-black font-extrabold text-base">About Me</h2>
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
          {bio}
        </p>
        <p className="font-medium text-sm text-black mt-3">
          {"Redefining beauty with every outfit 💄 Fashion, glam & unapologetic self-love | Let's create magic together."}
        </p>
      </div>

      {/* My Niche Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">My Niche</h2>
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

      {/* Collaboration Charge Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">Collaboration Charge</h2>
          <button className='flex items-center gap-x-1 text-[#555]'>
            <Pencil size={16}/>
            <span>Edit</span>
          </button>
        </div>
        <div className="space-y-5">
          {/* Instagram Rates */}
            <div className="p-4 border border-[#E4E4E4] rounded-2xl">
              <div className="heading flex items-center gap-x-2">
                <Image src="/images/icons/instagram.svg" alt="Instagram" height={24} width={24} />
                <span className='font-bold text-sm'>Instagram</span>
              </div>
              <hr className='border border-dashed border-[#E4E4E4] my-3'/>
              <div className="prices flex items-center gap-x-10">
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Reel</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Story</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Post</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
              </div>
            </div>

          {/* Facebook Rates */}
            <div className="p-4 border border-[#E4E4E4] rounded-2xl">
              <div className="heading flex items-center gap-x-2">
                <Image src="/images/icons/facebook.svg" alt="facebook" height={24} width={24} />
                <span className='font-bold text-sm'>Facebook</span>
              </div>
              <hr className='border border-dashed border-[#E4E4E4] my-3'/>
              <div className="prices flex items-center gap-x-10">
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Reel</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Story</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Post</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
              </div>
            </div>

          {/* YouTube Rates */}
            <div className="p-4 border border-[#E4E4E4] rounded-2xl">
              <div className="heading flex items-center gap-x-2">
                <Image src="/images/icons/youtube.svg" alt="youtube" height={24} width={24} />
                <span className='font-bold text-sm'>Youtube</span>
              </div>
              <hr className='border border-dashed border-[#E4E4E4] my-3'/>
              <div className="prices flex items-center gap-x-10">
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Youtube Shorts</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
                <div className="reel flex flex-col gap-y-1">
                  <span className='font-normal text-sm text-black'>Long Video</span>
                  <span className='font-bold text-black'>₹50,000</span>
                </div>
              </div>
            </div>
        </div>
      </div>

      {/* Connect Me Here Section */}
      <div className='border-t border-dashed border-[#E4E4E4] pt-4'>
        <div className='flex items-center justify-between mb-3'>
          <h2 className="text-black font-extrabold text-base">Connect Me Here</h2>
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