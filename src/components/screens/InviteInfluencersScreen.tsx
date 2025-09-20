"use client";
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton';
import { X } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { Influencer } from '@/types/influencer.interface';

interface InviteInfluencersScreenProps {
  selectedInfluencers: Influencer[];
  onRemoveInfluencer: (influencerId: string) => void;
  onUploadCampaign: () => void;
  onInviteMore: () => void;
  campaignData?: {
    name: string;
    brandName: string;
    category: string;
    deliverable: string;
  };
}

const InviteInfluencersScreen: React.FC<InviteInfluencersScreenProps> = ({
  selectedInfluencers,
  onRemoveInfluencer,
  onUploadCampaign,
  onInviteMore,
  campaignData = {
    name: "Glow Like Never Before",
    brandName: "L'Oréal Paris",
    category: "Skincare + Makeup",
    deliverable: "2 Instagram reels, 3 story posts"
  }
}) => {

  const ProgressIndicator = () => (
    <div className="w-full max-w-sm mb-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          <span className="text-sm font-extrabold mt-1 text-black">Create</span>
          <span className="text-sm font-extrabold text-black">Campaign</span>
        </div>

        <div className="flex-1 h-0.5 mx-2 bg-[#999]"></div>

        <div className="flex flex-col items-center">
          <span className="text-sm font-extrabold mt-1 text-black">Review & Post</span>
          <span className="text-sm font-extrabold text-black">Campaign</span>
        </div>

        <div className="flex-1 h-0.5 bg-blue-500 mx-2"></div>

        <div className="flex flex-col items-center">
          <span className="text-blue-500 text-sm font-extrabold mt-1">Find</span>
          <span className="text-blue-500 text-sm font-extrabold">Influencers</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex flex-col items-center justify-start flex-1">
        {/* Progress Indicator */}
        <ProgressIndicator />

        {/* Campaign Summary */}
        <div className="w-full max-w-sm mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">L&apos;ORÉAL</span>
            </div>
            <div className="flex-1">
              <h2 className="font-extrabold text-black">{campaignData.name}</h2>
              <p className="font-medium text-black">{campaignData.brandName}</p>
              <p className="text-[#555] font-medium text-sm">
                Category: <span className="text-black font-bold">{campaignData.category}</span>
              </p>
              <p className="text-[#555] font-medium text-sm">
                Deliverable - <span className="text-black font-bold">{campaignData.deliverable}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Invite More Influencers Button */}
        <div className="w-full max-w-sm mb-8">
          <button
            onClick={onInviteMore}
            className="w-full py-4 border-2 border-dashed border-gray-300 rounded-2xl text-center"
          >
            <span className="text-[#999] font-medium">Invite More Influencers</span>
          </button>
        </div>

        {/* Selected Influencers Section */}
        <div className="w-full max-w-sm mb-20">
          <div className="mb-4">
            <h3 className="font-bold text-black text-lg">Influencers</h3>
            <p className="text-[#999] text-sm font-medium">
              Our uploaded they will be notified about this Campaign Invite
            </p>
          </div>

          {/* Influencers List */}
          <div className="space-y-4">
            {selectedInfluencers.map((influencer) => (
              <div key={influencer.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200">
                    <Image
                      src={influencer.image}
                      alt={influencer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-black">{influencer.name}</h4>
                      {influencer.isVerified && (
                        <Image
                          src="/images/common/verification-badge.svg"
                          alt="Verified"
                          width={16}
                          height={16}
                        />
                      )}
                    </div>
                    <p className="text-[#999] text-sm">{influencer.username}</p>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveInfluencer(influencer.id)}
                  className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <X size={16} className="text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Upload Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <ArrowFilledButton
            text="Upload As Invite Campaign"
            onClick={onUploadCampaign}
          />
        </div>
      </div>
    </div>
  );
};

export default InviteInfluencersScreen;