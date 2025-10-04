import { ChevronRight } from 'lucide-react';
import React from 'react'

interface ArrowFilledButtonProps {
    className?: string;
    children?: React.ReactNode;
    text?: string
    textCenter?: boolean;
    onClick?: () => void;
    disabled?: boolean;
}
const ArrowFilledButton: React.FC<ArrowFilledButtonProps> = ({ className, text, textCenter, onClick, disabled = false }) => {
  return (
    <div className={`${className}`}>
        <button
            onClick={disabled ? undefined : onClick}
            disabled={disabled}
            className={`flex items-center justify-between gap-2 rounded-full pl-6 py-5 w-full relative transition-all ${
                disabled
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-theme-blue hover:bg-blue-700'
            }`}
        >
            <p className={`${textCenter ? 'text-center' : 'text-left'} font-bold flex-1 ${
                disabled ? 'text-gray-500' : 'text-white'
            }`}>{text}</p>
            <div className={`w-11 h-11 rounded-full flex items-center justify-center absolute right-3 ${
                disabled ? 'bg-gray-200' : 'bg-white'
            }`}>
                <ChevronRight size={24} className={disabled ? 'text-gray-400' : 'text-[#000]'}/>
            </div>
        </button>
    </div>
  )
}

export default ArrowFilledButton