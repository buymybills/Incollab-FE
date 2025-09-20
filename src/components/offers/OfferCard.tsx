import React from 'react'

interface OfferCardProps {
    className?: string;
}

const OfferCard: React.FC<OfferCardProps> = ({ className = '' }) => {
    return (
        <div className={`bg-white rounded-2xl p-5 w-full border border-[#E4E4E4] dark:border-0 dark:bg-[#292929] ${className}`}>
            <div className="text-base lg:text-2xl font-extrabold text-[#000] mb-2 dark:text-white">FIRSTBUY</div>
            <div className="text-gray-400 dark:text-[#999999] text-xs lg:text-base leading-snug font-medium">
                Save Upto ₹1200 on minimum order of ₹12000
            </div>
        </div>
    )
}

export default OfferCard