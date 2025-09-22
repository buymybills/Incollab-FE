"use client"
import { Bell, Home, Plus, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface BottomTabProps {
  className?: string;
  activeTab?: string;
}

const BottomTab: React.FC<BottomTabProps> = ({ className, activeTab }) => {
  const router = useRouter();

  const tabs = [
    {
          id: 'home',
          label: 'Home',
          icon: <Home size={20} />,
          isActive: activeTab === 'home',
          onClick: () => {
            router.push('/influencers')
          }
        },
        {
          id: 'search',
          label: 'Search',
          icon: <Search size={20} />,
          isActive: activeTab === 'search',
          onClick: () => {
            router.push('/influencers/search')
          }
        },
        {
          id: 'add',
          label: 'Add',
          icon: <Plus size={20} />,
          isActive: activeTab === 'add',
          onClick: () => {
            router.push('/influencers/add-post')
          }
        },
        {
          id: 'notifications',
          label: 'Notifications',
          icon: <Bell size={20} />,
          isActive: activeTab === 'notifications',
          onClick: () => {
            router.push('/influencers/notifications')
          }
        },
        {
          id: 'profile',
          label: 'Profile',
          icon: <User size={20} />,
          isActive: activeTab === 'profile',
          onClick: () => {
            router.push('/influencers/me')
          }
        }
      ]
  return (
    <div
      className={`fixed bottom-4 left-4 right-4 bg-theme-primary px-4 py-3 rounded-full z-50 ${className}`}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              tab.onClick();
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
              tab.isActive
                ? "bg-white text-gray-900"
                : "text-white hover:bg-white/10"
            }`}
          >
            <span className="text-lg">{tab.icon}</span>
            {tab.isActive && (
              <span className="text-sm font-medium">{tab.label}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomTab;