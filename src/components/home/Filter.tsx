import { ChevronDown, SlidersHorizontal, Star, X } from 'lucide-react'

const Filter = () => {
    return (
        <div className="w-full">
            <div className="flex gap-3 rounded-xl items-center overflow-x-auto hide-scrollbar md:justify-center">
                {/* Filter Button */}
                <button className="flex items-center gap-1 px-4 py-0.5 rounded-full border-2 border-gray-300 bg-transparent text-gray-700 dark:bg-transparent dark:border-[#999999] dark:text-white text-base font-medium hover:bg-gray-200 transition flex-shrink-0">
                    <SlidersHorizontal size={16} />
                    Filter
                </button>
                {/* Sort By Button */}
                <button className="flex items-center gap-1 px-4 py-0.5 rounded-full border-2 border-gray-300 bg-transparent text-gray-700 text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Sort By <ChevronDown size={14} />
                </button>
                {/* Women (selected) */}
                <button className="flex items-center gap-1 px-4 py-0.5 rounded-full border-2 border-blue-400 text-[#006FEE] text-base font-semibold flex-shrink-0 dark:border-[#0F71FA] bg-[#006FEE]/10">
                    Women
                    <div className="flex items-center justify-center h-4 w-4 bg-[#006FEE] text-white rounded-full">
                        <X size={10} />
                    </div>
                </button>
                {/* Kids */}
                <button className="flex items-center gap-1 px-4 py-0.5 rounded-full border-2 border-gray-300 bg-transparent text-gray-700 text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    Kids
                </button>
                {/* Rating */}
                <button className="flex items-center gap-1 px-4 py-0.5 rounded-full border-2 border-gray-300 bg-transparent text-gray-700 text-base dark:bg-transparent dark:border-[#999999] dark:text-white font-medium hover:bg-gray-200 transition flex-shrink-0">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    4.5+
                </button>
            </div>
        </div>
    )
}

export default Filter
