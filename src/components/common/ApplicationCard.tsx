"use client"
import { CircleCheck, CircleX, ClockFading, Pencil } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

interface ApplicationCardProps {
  brandLogo: string;
  title: string;
  brandName: string;
  category: string;
  deliverable: string;
  onViewApplicationDetail?: () => void;
  appliedStatus?: string;
  numberOfApplications?: number;
  onEdit?: () => void;
  showEditButton?: boolean;
  appliedDate?: string;
}

const ApplicationCard = ({
    brandLogo,
    title,
    brandName,
    category,
    deliverable,
    onViewApplicationDetail,
    appliedStatus,
    numberOfApplications,
    onEdit,
    showEditButton = false,
    appliedDate
  }: ApplicationCardProps) => {
    const handleCardClick = () => {
      onViewApplicationDetail?.();
    };

    const handleEdit = (e: React.MouseEvent) => {
      e.stopPropagation(); // Prevent card click when clicking edit button
      onEdit?.();
    };

    console.log(appliedStatus)
    return (
      <>
        <div className="border-b border-dashed border-[#E4E4E4] pb-6">
          <div className="flex items-start justify-between gap-x-3 mt-6">
            <div
              className="flex items-start gap-x-3 flex-1 cursor-pointer hover:bg-gray-50 transition-colors duration-200 pr-2"
              onClick={handleCardClick}
            >
          <div className="w-12 h-12 flex-shrink-0 relative bg-white flex rounded-full overflow-hidden items-center justify-center">
            <Image
              src={brandLogo}
              alt={brandName}
              fill
              className="w-full h-full object-cover"
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
                <>
                {
                  (appliedStatus === "applied" || appliedStatus === "withdrawn") && appliedDate && (
                    <div className='applied-time mt-2'>
                      <p className='text-[#999] font-medium text-sm'>{appliedDate}</p>
                    </div>
                  )
                }
                {
                  appliedStatus === "under_review" && (
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
                {
                  appliedStatus === "active" && (
                    <div className='applied-time mt-2'>
                      <p className='text-[#999] font-medium text-sm'>Ongoing</p>
                    </div>
                  )
                }
                </>
            {
              numberOfApplications && (
                <p className='text-theme-primary font-medium text-sm mt-3'>{numberOfApplications} new Applications in past 2 days</p>
              )
            }
          </div>
            </div>

            {/* Edit button */}
            {showEditButton && (
              <button
                onClick={handleEdit}
                className='flex items-center gap-x-1 text-[#555] flex-shrink-0 mt-1'
              >
                <Pencil size={16}/>
                <span>Edit</span>
              </button>
            )}
          </div>
        </div>
      </>
    );
  };

  export default ApplicationCard