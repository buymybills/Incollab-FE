"use client";

import { Flame, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileFooter = () => {
  const pathName = usePathname();
  return (
    <div className="fixed bottom-0 left-0 right-0 py-1 bg-white dark:bg-[#292929] dark:border-gray-700 z-40 lg:hidden">
      <div className="flex justify-around items-center">
        <Link 
          href="/" 
          className={`flex flex-col items-center p-2 dark:text-[#E4E4E4] text-[#333]`}
        >
          <Image src="/images/icons/favlogo.svg" alt="mini-logo" width={24} height={24} />
          <span className="text-xs">Home</span>
        </Link>
        
        <Link 
          href="/" 
          className='h-full relative'
        >
          <div className={`absolute h-1 rounded-b-xl w-full -top-3 ${pathName === "/onlinemarket" ? "bg-[#DA1DE7]" : "bg-theme-primary"}`}/>
          <div className={`bg-gradient-to-b opacity-10 h-full w-full absolute -top-3 ${pathName === "/onlinemarket" ? "from-[#DA1DE7]" : "from-[#0566EA]"}`}/>
          <div className='flex flex-col justify-between gap-y-3 items-center dark:text-[#E4E4E4] text-[#333]'>
            {
              pathName === "/onlinemarket" ? (
                <Image src="/images/icons/QPick.svg" alt="mini-logo" className='mt-1' width={48} height={48} />
              ) : (
                <Image src="/images/icons/radar.svg" alt="mini-logo" width={48} height={48} />
              )
            }
            <span className="text-xs">
              {
                pathName === "/onlinemarket" ? "Online Store" : "Offline Market"
              }
            </span>
          </div>
        </Link>
        
        <Link 
          href="/" 
          className={`flex flex-col items-center p-2 dark:text-[#E4E4E4] text-[#333]`}
        >
          <Flame size={24} className="mb-1" />
          <span className="text-xs">Trending</span>
        </Link>
        
        <Link 
          href="/onlinemarket/my-orders" 
          className={`flex flex-col items-center p-2 dark:text-[#E4E4E4] text-[#333]`}
        >
          <User size={24} className="mb-1" />
          <span className="text-xs">My Orders</span>
        </Link>
      </div>
    </div>
  );
};

export default MobileFooter;
