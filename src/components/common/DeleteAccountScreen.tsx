import { ArrowLeft } from 'lucide-react';
import React from 'react'

const deleteReasons = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
    'Lorem ipsum dolor sit amet, consectetur adipiscing',
];

const DeleteAccountScreen: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
    const [selected, setSelected] = React.useState<number | null>(null);
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100000] flex flex-col justify-between bg-[#f1f1f1] dark:bg-[#1B1B1B]">
            <div className='px-5'>
                <div className="flex items-center gap-2 pt-6 pb-4 text-[#000] dark:text-white">
                    <button onClick={onClose}><ArrowLeft /></button>
                    <span className="font-bold text-lg">Delete Account</span>
                </div>
                <div className="pb-2 text-sm text-[#000] dark:text-white font-normal">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                </div>
                <div className="flex flex-col gap-6 pt-2">
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
                <button className="w-full py-3 rounded-xl bg-[#FF3B30] text-white font-medium text-base">Delete Account</button>
            </div>
        </div>
    );
};

export default DeleteAccountScreen
