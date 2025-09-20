"use client"
import SuccessfulScreen from '@/components/screens/SuccessfulScreen';
import { ChevronLeft, CircleCheck, CircleX, ClockFading, MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

interface BrandsDetailScreenProps {
  onBack?: () => void;
  showApplyButton?: boolean;
  onApply?: () => void;
  showAppliedStatus?: boolean;
  appliedStatus?: "Applied" | "underreview" | "selected" | "rejected";
}

const BrandsDetailScreen = ({ onBack, showApplyButton, showAppliedStatus, appliedStatus }: BrandsDetailScreenProps) => {
    const [showSuccessScreen, setShowSuccessScreen] = useState<boolean>(false);
    if(showSuccessScreen){
        return <SuccessfulScreen onBack={() => setShowSuccessScreen(false)}/>
    }
  return (
    <div className={`h-full flex flex-col bg-white ${showApplyButton ? 'pb-24' : 'pb-0'}`}>
      {/* Header - Fixed */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <button className="p-1" onClick={onBack}>
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-gray-900">{"L'Oréal Paris"}</h1>
          </div>
        </div>
        <button className="p-1">
          <MoreHorizontal size={20} className="text-gray-700" />
        </button>
      </div>

      {showAppliedStatus && (
              <div className='border border-dashed border-[#E4E4E4] py-6 flex items-center justify-center'>
                {appliedStatus === "Applied" && (
                  <p className='text-[#999] font-medium text-sm'>Applied 2 Days ago</p>
                )}
                {appliedStatus === "underreview" && (
                  <div className='flex items-center gap-x-2'>
                    <ClockFading className='text-theme-primary' size={16}/>
                    <p className='font-medium text-sm text-theme-primary'>Application Under Review</p>
                  </div>
                )}
                {appliedStatus === "selected" && (
                  <div className='flex items-center gap-x-2'>
                    <CircleCheck className='text-[#27C840]' size={16}/>
                    <p className='font-medium text-sm text-[#27C840]'>Selected for campaign</p>
                  </div>
                )}
                {appliedStatus === "rejected" && (
                  <div className='flex items-center gap-x-2'>
                    <CircleX className='text-[#FF5F57]' size={16}/>
                    <p className='font-medium text-sm text-[#FF5F57]'>Application Rejected</p>
                  </div>
                )}
              </div>
            )}

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Brand Info Section */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">{"L'O"}</span>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Glow Like Never Before
            </h2>
            <p className="text-gray-600 text-sm mb-2">{"L'Oréal Paris"}</p>
            <div className="space-y-1 text-sm text-gray-600">
              <p><span className="font-medium">Category:</span> Skincare + Makeup</p>
              <p><span className="font-medium">Deliverable:</span> 2 Instagram reels, 3 story posts</p>
            </div>
          </div>
        </div>

        {/* About Campaign Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">About Campaign</h3>
          <p className="text-black text-sm leading-relaxed font-medium">
           {` L'Oréal Paris invites beauty creators to be part of our flagship campaign "Glow Like Never Before," celebrating skincare and makeup products designed to enhance natural radiance. This campaign focuses on creating authentic, aspirational, narrative content that inspires confidence and highlights the science-backed innovation behind our products. Influencers are encouraged to demonstrate real transformations, daily-use beauty routines, and tips that resonate with diverse audiences. Our goal is to drive awareness, showcase product versatility, and build strong engagement with communities who trust their creators for beauty recommendations.`}
          </p>
        </div>

        {/* Deliverable Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Deliverable</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Instagram Reels: 2</span> (Product tutorial + Glow transformation)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Instagram Stories: 3</span> (Unboxing, Q&A polls, live usage)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Optional Bonus: 1</span> Carousel Post (before/after look)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Tone & Style:</span> Relatable, empowering, natural beauty showcase
              </p>
            </div>
          </div>
        </div>

        {/* Influencer Requirements Section */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Influencer Requirements</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Niche:</span> Beauty, Skincare, Lifestyle
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Follower Range:</span> 10K-500K (micro to mid-tier influencers preferred)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Influencer Demographic:</span> Women, 18-35 years old
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Platforms:</span> Instagram (mandatory), TikTok (bonus if available)
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Audience:</span> Primarily women, 18-35 years old
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Region:</span> India (metro & Tier 2 cities focus)
              </p>
            </div>
          </div>
        </div>

        {/* rewards */}
        <div>
          <h3 className="text-lg font-extrabold text-black mb-3">Rewards/Compensation</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Fixed collaboration fee (₹20,000 – ₹50,000 depending on reach)</span>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Product PR kit included (delivered before campaign start)</span>
              </p>
            </div>
            <div className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-gray-900 rounded-full mt-2 flex-shrink-0"></span>
              <p className="text-black text-sm font-medium">
                <span className="font-medium">Performance-based bonus for top 10% performing creators</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      {showApplyButton && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button onClick={() => setShowSuccessScreen(true)} className='bg-theme-primary text-center text-white w-full py-5 rounded-full'>Click to Apply</button>
        </div>
      )}
    </div>
  )
}

export default BrandsDetailScreen