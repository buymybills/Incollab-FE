"use client";
import React, { useState } from "react";
import AboutUsTab from "./Tabs/AboutUsTab";
import CampaignsTab from "./Tabs/CampaignsTab";
import PostTab from "./Tabs/PostTab";

interface BrandsTabData {
  id: string;
  label: string;
  content: string | React.ReactNode;
}

const BrandsTabData: BrandsTabData[] = [
  {
    id: "about",
    label: "About",
    content: <AboutUsTab/>,
  },
  {
    id: "campaigns",
    label: "Campaigns",
    content: <CampaignsTab />,
  },
  {
    id: "posts",
    label: "Posts",
    content: <PostTab />,
  },
];

const TabButton: React.FC<{
  tab: BrandsTabData;
  isActive: boolean;
  onClick: () => void;
}> = ({ tab, isActive, onClick }) => (
  <button
    className={`inline-flex items-center gap-2 border-b-2 px-2.5 py-2 text-sm font-medium transition-colors duration-200 ease-in-out ${
      isActive
        ? "text-theme-blue border-theme-blue"
        : "bg-transparent text-[#555]"
    }`}
    onClick={onClick}
  >
    {tab.label}
  </button>
);

const TabContent: React.FC<{ tab: BrandsTabData }> = ({ tab }) => (
  <div>
    {typeof tab.content === 'string' ? (
      <>
        <h3 className="mb-1 text-xl font-medium text-gray-800 dark:text-white/90">
          {tab.label}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{tab.content}</p>
      </>
    ) : (
      tab.content
    )}
  </div>
);

const BrandsTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("about");

  return (
    <div className="">
      <div className="border-b border-gray-200 dark:border-gray-800">
        <nav className="-mb-px flex space-x-3 overflow-x-auto [&::-webkit-scrollbar]:h-1.5">
          {BrandsTabData.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </nav>
      </div>

      <div className="pt-4 dark:border-gray-800">
        {BrandsTabData.map((tab) => (
          <div
            key={tab.id}
            style={{ display: activeTab === tab.id ? "block" : "none" }}
          >
            <TabContent tab={tab} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandsTabs;