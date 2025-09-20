import React from "react";

interface TabItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

interface BottomTabProps {
  tabs: TabItem[];
  className?: string;
}

const BottomTab: React.FC<BottomTabProps> = ({ tabs, className = "" }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-blue-500 rounded-t-[32px] px-4 py-3 shadow-lg z-50 ${className}`}
    >
      <div className="flex items-center justify-between max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.onClick}
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