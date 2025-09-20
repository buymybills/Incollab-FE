import React, { useState } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import EditProfileScreen from './EditProfileScreen';
import DeleteAccountScreen from './DeleteAccountScreen';

interface AccountSettingScreenProps {
    isOpen: boolean;
    onClose: () => void;
}

const AccountSettingScreen: React.FC<AccountSettingScreenProps> = ({ isOpen, onClose }) => {

    const [showEditProfile, setShowEditProfile] = useState<boolean>(false);
    const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[99999]">
            <div className="absolute inset-0 bg-[#000]/20" onClick={onClose} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#E4E4E4] dark:bg-[#222] shadow-xl transition-transform duration-500 ease-in-out px-4 pb-5 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
                <div className="flex items-center gap-2 mt-5 mb-6">
                    <button onClick={onClose}><ArrowLeft className='text-[#000] dark:text-white' /></button>
                    <span className="font-bold text-lg text-[#000] dark:text-white">Account Setting</span>
                </div>
                <div className="bg-white dark:bg-[#292929] rounded-2xl p-2 flex flex-col gap-1">
                    <div className="flex items-center px-3 py-3 border-b last:border-b-0 border-[#F0F0F0] dark:border-[#555]" onClick={() => setShowEditProfile(true)}>
                        <Image className='dark:hidden' src={"/images/icons/account-settings.svg"} alt={"notification svg"} width={22} height={22} />
                        <Image className='dark:block hidden' src={"/images/icons/dark/account-settings.svg"} alt={"notification svg"} width={22} height={22} />
                        <span className="ml-3 text-base font-semibold text-[#000] dark:text-[#999] flex-1">Edit Profile</span>
                        <ChevronRight size={18} className='text-[#000] dark:text-[#999]' />
                    </div>
                    <div className="flex items-center px-3 py-3 border-b last:border-b-0 border-[#F0F0F0] dark:border-[#555]">
                        <Image className='dark:hidden' src={"/images/icons/notification.svg"} alt={"notification svg"} width={22} height={22} />
                        <Image className='dark:block hidden' src={"/images/icons/dark/notification.svg"} alt={"notification svg"} width={22} height={22} />
                        <span className="ml-3 text-base font-semibold text-[#000] dark:text-[#999] flex-1">Notification</span>
                        <ChevronRight size={18} className='text-[#000] dark:text-[#999]' />
                    </div>
                    <div className="flex items-center px-3 py-3 border-b last:border-b-0 border-[#F0F0F0] dark:border-[#555]">
                        <Image className='dark:hidden' src={"/images/icons/lock.svg"} alt={"notification svg"} width={22} height={22} />
                        <Image className='dark:block hidden' src={"/images/icons/dark/lock.svg"} alt={"notification svg"} width={22} height={22} />
                        <span className="ml-3 text-base font-semibold text-[#000] dark:text-[#999] flex-1">App Permissions</span>
                        <ChevronRight size={18} className='text-[#000] dark:text-[#999]' />
                    </div>
                    <div className="flex items-center px-3 py-3 border-b last:border-b-0 border-[#F0F0F0] dark:border-[#555] cursor-pointer" onClick={() => setShowDeleteAccount(true)}>
                        <Image className='dark:hidden' src={"/images/icons/trash.svg"} alt={"notification svg"} width={22} height={22} />
                        <Image className='dark:block hidden' src={"/images/icons/dark/trash.svg"} alt={"notification svg"} width={22} height={22} />
                        <span className="ml-3 text-base font-semibold text-[#000] dark:text-[#999] flex-1">Delete Account</span>
                        <ChevronRight size={18} className='text-[#000] dark:text-[#999]' />
                    </div>
                </div>
                <EditProfileScreen isOpen={showEditProfile} onClose={() => setShowEditProfile(false)} />
                <DeleteAccountScreen isOpen={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />
            </div>
        </div>
    );
};

export default AccountSettingScreen; 