import Image from 'next/image';
import React from 'react';
import { Star } from 'lucide-react';
import Link from 'next/link';

const ShopCard = ({ imagePath, shopTitle, rating, collection, location, distance }: { imagePath: string, shopTitle: string, rating: string, collection: string, location: string, distance: string }) => {
    return (
        <Link href={"/shops/adidas-outlet"}>
            <div className="max-w-md rounded-[20px] bg-white dark:bg-[#222]">
                <div className="flex items-center justify-center p-3">
                    <div className="relative h-[155px] w-full rounded-xl overflow-hidden">
                        <Image
                            src={imagePath}
                            alt={shopTitle}
                            fill
                            className="h-44 w-full rounded-xl object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-white/5 to-[#000] pointer-events-none w-full h-full rounded-xl" />
                        <div className="absolute bottom-3 left-2 text-white">
                            <p className="text-sm md:text-base md:font-semibold font-[#000] text-wrap pr-16">Flat 30% Off +2 more</p>
                        </div>
                    </div>
                </div>
                <div className="pt-1 p-4">
                    <h3 className="text-base md:text-xl font-bold text-[#000] dark:text-white">{shopTitle}</h3>
                    <div className="mt-1 flex items-center">
                        <div className="flex items-center rounded-full bg-theme-rating px-2 py-0.5 text-sm font-bold text-white">
                            <span>{rating}</span>
                            <Star className='fill-white ml-1' size={12} />
                        </div>
                        <p className="ml-3 text-xs md:text-sm text-[#000] dark:text-white font-bold opacity-70">{collection}</p>
                    </div>
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        <span className='text-[#000] dark:text-white opacity-70 text-xs md:text-sm font-bold'>{location}, </span>
                        <span className="font-bold text-theme-blue text-xs md:text-base">{distance} km</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ShopCard;
