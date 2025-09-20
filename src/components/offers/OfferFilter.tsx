import { ChevronDown, SlidersHorizontal } from 'lucide-react'

const ReviewFilter = ({className}: {className?: string}) => {
    return (
        <div className="w-full">
            <div className={`flex gap-2 md:gap-4 rounded-xl items-center overflow-x-auto hide-scrollbar ${className}`}>
                {/* Filter Button */}
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 dark:bg-transparent dark:border-[#999999] dark:text-white text-sm md:text-base font-medium hover:bg-gray-200 transition flex-shrink-0">
                    <SlidersHorizontal size={16} />
                    Filter
                </button>
                {/* Sort By Button */}
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 text-sm md:text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Sort By <ChevronDown size={14} />
                </button>
                {/* Women (selected) */}
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 text-sm md:text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Brands
                    <ChevronDown size={14} />
                </button>
                {/* Kids */}
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 text-sm md:text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Price
                    <ChevronDown size={14} />
                </button>
                {/* Rating */}
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 text-sm md:text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Rating
                    <ChevronDown size={14} />
                </button>
                <button className="flex items-center gap-1 px-3 py-1 rounded-full border md:border-2 border-gray-300 bg-transparent text-gray-700 text-sm md:text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Discounts
                    <ChevronDown size={14} />
                </button>
            </div>
        </div>
    )
}

export default ReviewFilter