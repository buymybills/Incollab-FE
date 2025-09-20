"use client";
import React, { useState } from 'react';
import { ChevronLeft, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import Image from 'next/image';
import { Influencer } from '@/types/influencer.interface';

interface SearchScreenProps {
  onBack?: () => void;
  searchQuery?: string;
  onInfluencersSelected?: (influencers: Influencer[]) => void;
}

const SearchScreen: React.FC<SearchScreenProps> = ({ onBack, searchQuery = "Search for Influencers", onInfluencersSelected }) => {
  const [searchText, setSearchText] = useState(searchQuery);
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [selectedInfluencers, setSelectedInfluencers] = useState<Influencer[]>([]);

  const influencers: Influencer[] = [
    {
      id: "1",
      name: "Sneha Sharma",
      username: "@sneha_s09",
      image: "/images/user/influencer.svg",
      isVerified: true
    },
    {
      id: "2",
      name: "Avantika Shah",
      username: "@Avantika_S",
      image: "/images/user/influencer.svg",
      isVerified: true
    },
    {
      id: "3",
      name: "Avantika Shah",
      username: "@Avantika_S",
      image: "/images/user/influencer.svg",
      isVerified: true
    },
    {
      id: "4",
      name: "Sneha Sharma",
      username: "@sneha_s09",
      image: "/images/user/influencer.svg",
      isVerified: true
    },
    {
      id: "5",
      name: "Avantika Shah",
      username: "@Avantika_S",
      image: "/images/user/influencer.svg",
      isVerified: true
    }
  ];

  const handleInfluencerToggle = (influencer: Influencer) => {
    setSelectedInfluencers(prev => {
      const isSelected = prev.some(inf => inf.id === influencer.id);
      if (isSelected) {
        return prev.filter(inf => inf.id !== influencer.id);
      } else {
        return [...prev, influencer];
      }
    });
  };

  const handleProceedWithSelected = () => {
    if (onInfluencersSelected && selectedInfluencers.length > 0) {
      onInfluencersSelected(selectedInfluencers);
    }
  };

  const isInfluencerSelected = (influencerId: string) => {
    return selectedInfluencers.some(inf => inf.id === influencerId);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white mt-5">
        <div className="flex bg-[#F1F1F1] py-3 rounded-full px-4">
          <button onClick={onBack} className="mr-3">
            <ChevronLeft size={20} className="text-black" />
          </button>
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 bg-transparent text-[#555] placeholder-[#555] outline-none text-base"
            placeholder="Search for Influencers"
          />
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="flex gap-3 mt-5">
        <button className="flex items-center py-2 gap-2 bg-white rounded-full px-4 border border-gray-200">
          <SlidersHorizontal size={16} className="text-gray-600" />
          <span className="text-gray-700 font-medium">Filter</span>
        </button>

        <div className="relative">
          <button
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center py-2 gap-2 bg-white rounded-full px-4 border border-gray-200"
          >
            <span className="text-gray-700 font-medium">Sort By</span>
            <ChevronDown size={16} className="text-gray-600" />
          </button>

          {/* {showSortDropdown && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[150px]">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSortBy(option);
                    setShowSortDropdown(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg text-gray-700"
                >
                  {option}
                </button>
              ))}
            </div>
          )} */}
        </div>
      </div>

      {/* Search Results */}
      <div className="">
        <div className="mt-5">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className={`bg-white rounded-lg cursor-pointer transition-colors`}
              onClick={() => handleInfluencerToggle(influencer)}
            >
              <div className="flex items-center gap-3 py-2">
                <div className="w-12 h-12 rounded-full overflow-hidden relative bg-gray-200">
                  <Image
                    src={influencer.image}
                    alt={influencer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900 text-base">{influencer.name}</h3>
                    {influencer.isVerified && (
                      <div className="">
                        <Image
                          src="/images/common/verification-badge.svg"
                          alt="Verified"
                          width={16}
                          height={16}
                          className="text-white"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm">{influencer.username}</p>
                </div>
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isInfluencerSelected(influencer.id)
                      ? 'border-theme-primary bg-theme-primary'
                      : 'border-gray-300'
                  }`}>
                    {isInfluencerSelected(influencer.id) && (
                      <Check size={16} className="text-white"/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Influencers Footer */}
      {selectedInfluencers.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-600">
              {selectedInfluencers.length} influencer{selectedInfluencers.length > 1 ? 's' : ''} selected
            </span>
            <button
              onClick={() => setSelectedInfluencers([])}
              className="text-sm text-blue-500 font-medium"
            >
              Clear All
            </button>
          </div>
          <button
            onClick={handleProceedWithSelected}
            className="w-full bg-blue-500 text-white py-3 rounded-full font-semibold"
          >
            Proceed with Selected
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchScreen;