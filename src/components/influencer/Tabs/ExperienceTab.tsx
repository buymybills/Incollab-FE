'use client'

import Image from 'next/image';
import React, { useState } from 'react';
import BottomSheet from '../../bottomsheets/BottomSheet';
import { ChevronRight, CirclePlus, Megaphone, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ExperienceCardProps {
  brandLogo: string;
  title: string;
  brandName: string;
  category: string;
  deliverable: string;
  status: 'Ongoing' | 'Completed' | 'Pending';
}

const ExperienceDetailContent = ({
  brandLogo,
  title,
  brandName,
  category,
  deliverable,
  status
}: ExperienceCardProps) => {
  return (
    <div className="px-3 pb-2">
      <div className="gap-x-3 mb-5">
        <div className="flex-shrink-0">
          <Image
            src={brandLogo}
            alt={brandName}
            width={100}
            height={57}
            className="object-contain"
          />
        </div>
        <div className="flex-">
          <h3 className="font-extrabold text-black text-xl mt-2">{title}</h3>
          <p className="text-black font-medium text-sm">{brandName}</p>
          <div>
            <span className="text-sm text-[#555]">Category: </span>
            <span className="text-sm text-black font-medium">{category}</span>
          </div>
          <div>
            <span className="text-sm text-[#555]">Deliverable - </span>
            <span className="text-sm text-black font-medium">{deliverable}</span>
          </div>
          <div>
            <span className="text-sm text-[#555]">{status} (Sep 2025)</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <button className="text-theme-primary text-sm font-medium flex items-center gap-1">
          View Campaign Detail
          <ChevronRight size={24}/>
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-bold text-black text-base mb-3">My Role</h4>
        <p className="text-sm text-black leading-normal">
          Collaborated with L&apos;Oréal Paris on &apos;Glow Like Never Before&apos;, creating reels & stories to showcase beauty products. Reached 120K+ users, 4.5% engagement, +2,300 new followers.
        </p>
      </div>

      <div className="mb-6">
        <h4 className="font-extrabold text-black mb-3">Key Result Achieved</h4>
        <ul className="space-y-1">
          <li className="text-sm text-black flex items-center gap-x-1 font-bold">
            <span className="w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            Reach: 150K
          </li>
          <li className="text-sm text-black flex items-center gap-x-1 font-bold">
            <span className="w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            Engagement: Rate 6.1%
          </li>
          <li className="text-sm text-black flex items-center gap-x-1 font-bold">
            <span className="w-1 h-1 bg-black rounded-full flex-shrink-0"></span>
            Conversions (via Nykaa link): 530 clicks
          </li>
        </ul>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-bold text-black text-base">Insta Campaign Links</h4>
          <button className="text-[#555] flex items-center gap-1">
            <Pencil className='text-[#555]' size={14}/>
            Edit
          </button>
        </div>
        <div className="instagram-links space-y-4">
            <div className="flex items-center gap-3">
            <div className="image">
                <Image src="/images/icons/instagram.svg" alt="Instagram" width={32} height={32} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-blue-500 underline leading-tight">
                https://ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="image">
                <Image src="/images/icons/instagram.svg" alt="Instagram" width={32} height={32} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-blue-500 underline leading-tight">
                https://ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
            </div>
            </div>
        </div>
      </div>

      {/* youtube links */}
      <div>
        <div className="flex items-center justify-between mb-3 mt-6">
          <h4 className="font-bold text-black text-base">Youtube Campaign Links</h4>
          <button className="text-[#555] flex items-center gap-1">
            <Pencil className='text-[#555]' size={14}/>
            Edit
          </button>
        </div>
        <div className="instagram-links space-y-4">
            <div className="flex items-center gap-3">
            <div className="image">
                <Image src="/images/icons/youtube.svg" alt="Youtube" width={32} height={32} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-blue-500 underline leading-tight">
                https://ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
            </div>
            </div>
            <div className="flex items-center gap-3">
            <div className="image">
                <Image src="/images/icons/youtube.svg" alt="Youtube" width={32} height={32} />
            </div>
            <div className="flex-1">
                <p className="text-xs text-blue-500 underline leading-tight">
                https://ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                </p>
            </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const ExperienceCard = ({
  brandLogo,
  title,
  brandName,
  category,
  deliverable,
  status
}: ExperienceCardProps) => {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCardClick = () => {
    setIsBottomSheetOpen(true);
    console.log("hey");
  };

  const handleCloseBottomSheet = () => {
    setIsBottomSheetOpen(false);
  };

  return (
    <>
      <div
        className="border-b border-dashed border-[#E4E4E4] pb-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200"
        onClick={handleCardClick}
      >
        <div className="flex items-start gap-x-3 mt-6">
        <div className="w-12 h-12 flex-shrink-0 bg-white flex items-center justify-center">
          <Image
            src={brandLogo}
            alt={brandName}
            width={48}
            height={48}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="flex-min-w-0">
          <div className="flex flex-col">
            <h3 className="font-extrabold text-black text-base">
              {title}
            </h3>
            <p className="text-black font-medium">{brandName}</p>
          </div>

          <div className="">
            <span className="text-sm text-[#555]">Category: </span>
            <span className="text-sm text-black font-medium">{category}</span>
          </div>

          <div className="">
            <span className="text-sm text-[#555]">Deliverable - </span>
            <span className="text-sm text-black font-medium">{deliverable}</span>
          </div>

          <div>
            <span className={`text-sm font-medium text-[#555]`}>
              {status}
            </span>
          </div>
        </div>
      </div>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={handleCloseBottomSheet}
      >
        <ExperienceDetailContent
          brandLogo={brandLogo}
          title={title}
          brandName={brandName}
          category={category}
          deliverable={deliverable}
          status={status}
        />
      </BottomSheet>
    </>
  );
};

const ExperienceTab = () => {
  const router = useRouter();
  return (
    <>
        <div>
        <div className='flex items-center mb-2 justify-between'>
          <h2 className="text-black font-extrabold text-base">Experience</h2>
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
            <ExperienceCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                status="Ongoing"
            />
            <ExperienceCard
                brandLogo="/images/brand/nykaa.svg"
                title="Glow Like Never Before"
                brandName="Nykaa"
                category="Skincare + Makeup"
                deliverable="2 Instagram reels, 3 story posts"
                status="Ongoing"
            />
        </div>
        <div className='apply-for-campaign flex flex-col items-center gap-y-4 justify-center'>
            <p className='text-[#555] font-medium text-sm'>NO CAMPAIGN TO ADD IN EXPERIENCE</p>
            <button onClick={() => router.push('/influencers/me/add-experience')} className='flex items-center gap-x-2 border border-dashed border-theme-primary rounded-full px-3 py-2 font-semibold text-theme-primary'>
                <Megaphone size={16}/>
                Add Campaigns Experience
            </button>
        </div>
    </>
  )
}

export default ExperienceTab