import useMutationApi from '@/hooks/useMutationApi';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import BottomSheet from '../bottomsheets/BottomSheet';

const deleteReasons = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
];


const FinalDeleteScreen: React.FC<{ onBack: () => void; onClose: () => void }> = ({ onBack }) => {
    const router = useRouter();
    const {mutateAsync: deleteAccount, isPending: deleteAccountLoading} = useMutationApi({
        endpoint: 'auth/delete-account',
        method: 'delete',
        onSuccess: () => {
            router.push('/auth')
        }
    })
    const handleDeleteAccount = () => {
        deleteAccount({});
    };

    return (
        <div className="fixed inset-0 flex flex-col justify-between bg-white z-[100003]">
            <div className='px-5'>
                <div className="flex items-center gap-2 pt-6 pb-4 text-[#000]">
                    <button onClick={onBack}><ArrowLeft /></button>
                    <span className="font-bold">Delete Account</span>
                </div>
                <div className="pb-2 text-sm text-[#000] font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
            </div>
            <div className="p-4 bg-white dark:bg-[#0D0D0D]">
                <button
                    onClick={handleDeleteAccount}
                    className={`w-full py-4 rounded-full ${deleteAccountLoading ? "bg-[#999]" : "bg-[#FF3B30]"} text-white font-medium text-base`}
                    disabled={deleteAccountLoading}
                >
                    {deleteAccountLoading ? 'Deleting...' : 'Delete Account'}
                </button>
            </div>
        </div>
    );
}

const DeleteAccountScreen: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [selected, setSelected] = useState<number | null>(null);
    const [showReasonBottomSheet, setShowReasonBottomSheet] = useState(false);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [reason, setReason] = useState('');
    const maxLength = 500;

    if (!isOpen) return null;

    const handleContinueClick = () => {
        if (selected !== null) {
            setShowReasonBottomSheet(true);
        }
    };

    const handleFinalContinue = () => {
        // Handle final continue - show the final delete screen
        console.log('Selected reason:', deleteReasons[selected!]);
        console.log('Additional details:', reason);
        setShowReasonBottomSheet(false);
        setShowFinalScreen(true);
    };

    const handleBackFromFinal = () => {
        setShowFinalScreen(false);
    };

    if (showFinalScreen) {
        return <FinalDeleteScreen onBack={handleBackFromFinal} onClose={onClose} />;
    }

    return (
        <>
            <div className="fixed inset-0 z-[100000] flex flex-col justify-between bg-white">
                <div className='px-5'>
                    <div className="flex items-center gap-2 pt-6 pb-4 text-[#000]">
                        <button onClick={onClose}><ArrowLeft /></button>
                        <span className="font-bold">Delete Account</span>
                    </div>
                    <div className="pb-2 text-sm text-[#000] font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    </div>
                    <div className="flex flex-col gap-6 mt-6">
                        {deleteReasons.map((reason, idx) => (
                            <label key={idx} className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="delete-reason"
                                    checked={selected === idx}
                                    onChange={() => setSelected(idx)}
                                    className="w-5 h-5 accent-[#000] border border-[#000]"
                                />
                                <span className="text-sm text-[#000] dark:text-white font-medium">{reason}</span>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="p-4 bg-white dark:bg-[#0D0D0D]">
                    <button
                        onClick={handleContinueClick}
                        disabled={selected === null}
                        className="w-full py-4 rounded-full bg-[#FF3B30] text-white font-medium text-base disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue
                    </button>
                </div>
            </div>

           <BottomSheet
                     isOpen={showReasonBottomSheet}
                     onClose={() => setShowReasonBottomSheet(false)}
                     bottomSheetMaximumHeight={350}
                     zIndexBackdrop={100001}
                     zIndexSheet={100002}
                   >
                     <div className="px-6 pb-6">
                        {/* Header */}
                        <div className="flex items-center gap-3 mb-6">
                            <button onClick={() => setShowReasonBottomSheet(false)} className="text-black">
                                <ArrowLeft size={20} />
                            </button>
                            <h2 className="text-base font-semibold text-gray-800">
                                Reason For Account Deletions
                            </h2>
                        </div>

                        {/* Label */}
                        <label className="block text-sm font-medium text-[#555] mb-3">
                            {`What's Upsets You?`}
                        </label>

                        {/* Textarea */}
                        <div className="relative mb-6">
                            <textarea
                                value={reason}
                                onChange={(e) => {
                                    if (e.target.value.length <= maxLength) {
                                        setReason(e.target.value);
                                    }
                                }}
                                placeholder="Please Specify in detail"
                                className="w-full h-32 px-4 py-3 text-xs text-[#999] border border-[#999] rounded-xl resize-none focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
                            />
                            <span className="absolute -bottom-4 right-1 text-xs text-black">
                                {reason.length}/{maxLength}
                            </span>
                        </div>

                        {/* Continue Button */}
                        <div className='fixed bottom-4 left-0 right-0 px-4'>
                            <button
                                onClick={handleFinalContinue}
                                className="w-full py-4 rounded-full bg-[#FF3B30] text-white font-medium text-base"
                            >
                                Continue
                            </button>
                        </div>
                     </div>
                   </BottomSheet>
        </>
    );
};

export default DeleteAccountScreen
