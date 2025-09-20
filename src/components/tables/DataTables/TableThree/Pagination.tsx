// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pagesAroundCurrent = Array.from(
    { length: Math.min(4, totalPages) },
    (_, i) => i + 1
  );

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center h-10 px-4 rounded-xl bg-white border-0 text-[#000] text-sm font-medium shadow-none disabled:opacity-50 gap-2"
      >
        <ChevronLeft className="w-4 h-4" fill="#000"/> Previous
      </button>
      {pagesAroundCurrent.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border-0 text-sm font-medium transition-colors
            ${currentPage === page
              ? 'border border-blue-400 text-blue-600 bg-white outline-2 outline-blue-400'
              : 'text-[#000]/60 bg-white hover:outline-blue-400 hover:outline-2 hover:text-blue-600'}
          `}
          style={{ minWidth: 40 }}
        >
          {page.toString().padStart(2, '0')}
        </button>
      ))}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center h-10 px-4 rounded-xl bg-white border-0 text-[#000] text-sm font-medium shadow-none disabled:opacity-50 gap-2"
      >
        Next <ChevronRight className="w-4 h-4" fill="#000" />
      </button>
    </div>
  );
};

export default Pagination;
