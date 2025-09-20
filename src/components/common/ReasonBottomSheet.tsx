import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// interface BookingInfo {
//     image: string;
//     status: string;
//     statusColor: string;
//     place: string;
//     location: string;
//     id: string;
//     guests: number;
//     date: string;
// }

interface ReasonBottomSheetProps {
    isOpen: boolean;
    onClose: () => void;
    // booking: BookingInfo;
}

const ReasonBottomSheet: React.FC<ReasonBottomSheetProps> = ({ isOpen, onClose }) => {
    const [reason, setReason] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = () => {
        // Handle the submission logic here
        console.log('Return reason:', reason);
        setReason('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            
            {/* Bottom Sheet */}
            <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 px-5">
                {/* Header */}
                <div className="flex items-center mb-6 mt-5">
                    <button 
                        onClick={onClose}
                        className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={24} color="#333" />
                    </button>
                    <h2 className="text-lg font-semibold text-gray-900 ml-2">
                        Reason For Return
                    </h2>
                </div>

                {/* Content */}
                <div className="mb-6">
                    <p className="text-[#555] mb-4 font-bold text-sm">
                        Write comment to let us know
                    </p>
                    
                    <textarea
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please Specify in detail"
                        className="w-full h-32 p-4 text-sm border border-gray-200 rounded-xl resize-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Continue Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-[#0566EA] text-white font-bold mb-2 py-4 rounded-xl transition-colors"
                >
                    Continue
                </button>
            </div>
        </>
    );
};

export default ReasonBottomSheet;