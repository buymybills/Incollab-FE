import { ChevronRight } from 'lucide-react';
import React from 'react'

interface ArrowNonFilledButtonProps {
    className?: string;
    children?: React.ReactNode;
    text?: string
    textCenter?: boolean;
    onClick?: () => void;
}
const ArrowNonFilledButton: React.FC<ArrowNonFilledButtonProps> = ({ className, text, textCenter, onClick }) => {
  return (
  <div className={`${className}`}>
        <button onClick={onClick} className='flex items-center justify-between gap-2 bg-white rounded-full pl-6 py-5 w-full relative'>
            <p className={`${textCenter ? 'text-center' : 'text-left'} text-[#111] font-bold flex-1`}>{text}</p>
            <div className='bg-theme-blue w-11 h-11 rounded-full flex items-center justify-center absolute right-3'>
                <ChevronRight size={24} className='text-white'/>
            </div>
        </button>
    </div>
  )
}

export default ArrowNonFilledButton