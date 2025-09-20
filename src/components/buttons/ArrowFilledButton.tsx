import { ChevronRight } from 'lucide-react';
import React from 'react'

interface ArrowFilledButtonProps {
    className?: string;
    children?: React.ReactNode;
    text?: string
    textCenter?: boolean;
    onClick?: () => void;
}
const ArrowFilledButton: React.FC<ArrowFilledButtonProps> = ({ className, text, textCenter, onClick }) => {
  return (
    <div className={`${className}`}>
        <button onClick={onClick} className='flex items-center justify-between gap-2 bg-theme-blue rounded-full pl-6 py-5 w-full relative'>
            <p className={`${textCenter ? 'text-center' : 'text-left'} text-white font-bold flex-1`}>{text}</p>
            <div className='bg-white w-11 h-11 rounded-full flex items-center justify-center absolute right-3'>
                <ChevronRight size={24} className='text-[#000]'/>
            </div>
        </button>
    </div>
  )
}

export default ArrowFilledButton