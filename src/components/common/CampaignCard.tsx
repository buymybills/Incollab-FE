"use client"
import { CircleCheck, CircleX, ClockFading } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface CampaignCardProps {
  brandLogo: string;
  title: string;
  brandName: string;
  category: string;
  deliverable: string;
  status?: 'Ongoing' | 'Completed' | 'Pending';
  onViewCampaignDetail?: () => void;
  showAppliedStatus?: boolean;
  appliedStatus?: "Applied" | "underreview" | "selected" | "rejected";
  numberOfApplications?: number;
}

const CampaignCard = ({
    brandLogo,
    title,
    brandName,
    category,
    deliverable,
    status,
    onViewCampaignDetail,
    showAppliedStatus,
    appliedStatus,
    numberOfApplications
  }: CampaignCardProps) => {
    const handleCardClick = () => {
      onViewCampaignDetail?.();
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
            {
              showAppliedStatus && (
                <>
                {
                  appliedStatus === "Applied" && (
                    <div className='applied-time mt-2'>
                      <p className='text-[#999] font-medium text-sm'>Applied 2 Days ago</p>
                    </div>
                  )
                }
                {
                  appliedStatus === "underreview" && (
                    <div className='applied-time mt-2'>
                      <div className='flex items-center gap-x-2'>
                        <ClockFading className='text-theme-primary' size={20}/>
                        <p className='font-medium text-sm text-theme-primary'>Application Under Review</p>
                      </div>
                    </div>
                  )
                }
                {
                  appliedStatus === "selected" && (
                    <div className='applied-time mt-2'>
                      <div className='flex items-center gap-x-2'>
                        <CircleCheck className='text-[#27C840]' size={20}/>
                        <p className='font-medium text-sm text-[#27C840]'>Selected for campaign</p>
                      </div>
                    </div>
                  )
                }
                {
                  appliedStatus === "rejected" && (
                    <div className='applied-time mt-2'>
                      <div className='flex items-center gap-x-2'>
                        <CircleX className='text-[#FF5F57]' size={20}/>
                        <p className='font-medium text-sm text-[#FF5F57]'>Application Rejected</p>
                      </div>
                    </div>
                  )
                }
                </>
              )
            }
            {
              numberOfApplications && (
                <p className='text-theme-primary font-medium text-sm mt-3'>{numberOfApplications} new Applications in past 2 days</p>
              )
            }
          </div>
        </div>
        </div>
      </>
    );
  };

  export default CampaignCard