"use client"
import useFetchApi from '@/hooks/useFetchApi';
import useMutationApi from '@/hooks/useMutationApi';
import { ArrowLeft, Edit } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Alert from '../ui/alert/Alert';

interface EditProfileScreenProps {
    isOpen: boolean;
    onClose: () => void;
}

interface UserProfile {
    name: string;
    email: string;
    phone: string;
}

interface UpdateProfileRequest {
    name: string;
    [key: string]: unknown;
}

interface UpdateProfileResponse {
    success: boolean;
    message: string;
    data?: UserProfile;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ isOpen, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [editing, setEditing] = useState(false);
    const [token, setToken] = useState<string>('');
    const [initialName, setInitialName] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        if(typeof window !== 'undefined'){
            setToken(localStorage.getItem('token') || '');
        }
    },[]);

    const {data: profileData, retrieve: refetchProfile} = useFetchApi<UserProfile>({
        endpoint: 'user/profile',
        options: {
            headers:{
                authorization: `Bearer ${token}`
            }
        }
    });

    const {mutateAsync: updateProfile, isPending: isUpdating, error: updateError} = useMutationApi<UpdateProfileResponse, UpdateProfileRequest>({
        endpoint: 'user/profile',
        headers: {
            authorization: `Bearer ${token}`
        },
        method: 'PUT',
        onSuccess: () => {
            setUpdateSuccess(true);
            setInitialName(name); 
            refetchProfile();
            setTimeout(() => {
                setUpdateSuccess(false);
                onClose();
            }, 1500);
        },
    });

    useEffect(() => {
        if (profileData) {
            setName(profileData.name || '');
            setEmail(profileData.email || '');
            setPhone(profileData.phone || '');
            setInitialName(profileData.name || '');
        }
    }, [profileData]);

    const handleUpdateProfile = async () => {
        if (!hasChanges || isUpdating) return;

        try {
            await updateProfile({
                name: name.trim()
            });
        } catch (error) {
            console.error('Update profile error:', error);
        }
    };

    const handleClose = () => {
        // Reset form to initial state when closing
        if (profileData) {
            setName(profileData.name || '');
            setInitialName(profileData.name || '');
        }
        setEditing(false);
        setUpdateSuccess(false);
        onClose();
    };

    if (!isOpen) return null;

    const hasChanges = name.trim() !== initialName && name.trim().length > 0;
    const buttonClass = hasChanges && !isUpdating
        ? 'w-full py-3 rounded-xl bg-[#0566EA] text-white font-medium text-base hover:bg-[#0452C7] transition-colors'
        : 'w-full py-3 rounded-xl bg-[#E4E4E4] dark:bg-[#282828] text-[#000] dark:text-white font-medium text-base cursor-not-allowed';

    return (
        <div className="fixed inset-0 z-[99999]">
            <div className="absolute inset-0 bg-[#000]/20" onClick={handleClose} />
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#F1F1F1] dark:bg-[#222] shadow-xl transition-transform duration-500 ease-in-out px-4 pb-5 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
                <div className="flex items-center gap-2 mt-5 mb-6 dark:text-white">
                    <button onClick={handleClose}><ArrowLeft /></button>
                    <span className="font-bold text-base">Edit Profile</span>
                </div>
                
                {/* Success Message */}
                {updateSuccess && (
                    <div className="mb-4 p-3 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                        <Alert variant="success" title="Success" message="Profile updated successfully!"/>
                    </div>
                )}

                {/* Error Message */}
                {updateError && (
                    <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                        <p className="text-red-800 dark:text-red-200 text-sm font-medium">
                            Failed to update profile. Please try again.
                        </p>
                    </div>
                )}

                <div className="flex flex-col items-center mb-8">
                    <div className="relative">
                        <Image src="/images/user/user-01.jpg" alt="User" width={96} height={96} className="rounded-full border-2 border-white" />
                        <button className="absolute bottom-1 right-2 bg-white dark:bg-[#0D0D0D] rounded-full p-1 shadow">
                            <Edit size={18} className="text-[#000] dark:text-white" />
                        </button>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#52525B] mb-1">Name</label>
                    <div className="flex items-center bg-white dark:bg-[#292929] rounded-lg px-3 py-2">
                        {editing ? (
                            <input
                                className="flex-1 outline-none bg-transparent text-[#000] dark:text-white"
                                value={name}
                                onChange={e => setName(e.target.value)}
                                onBlur={() => setEditing(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        setEditing(false);
                                    }
                                }}
                                autoFocus
                                maxLength={100}
                            />
                        ) : (
                            <>
                                <span className="flex-1 text-[#000] dark:text-white">{name}</span>
                                <button 
                                    className="text-blue-600 font-medium ml-2 hover:text-blue-800 dark:hover:text-blue-400" 
                                    onClick={() => setEditing(true)}
                                    disabled={isUpdating}
                                >
                                    Edit
                                </button>
                            </>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-[#52525B] mb-1">Number</label>
                    <input
                        className="w-full bg-white dark:bg-[#292929] dark:text-white rounded-lg px-3 py-2 text-gray-400"
                        value={phone}
                        disabled
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-sm font-medium text-[#52525B] mb-1">Email</label>
                    <input
                        className="w-full rounded-lg px-3 py-2 bg-white dark:bg-[#292929] text-gray-400"
                        value={email}
                        disabled
                    />
                </div>
                <div className="text-xs text-[#000] mt-2 mb-1 dark:text-white">
                    <span className='text-red-600'>*</span>Contact Number and email is not editable.
                </div>
                <div className="text-xs text-[#000] mb-6 dark:text-white">
                    To edit contact number and email please contact <a href="#" className="text-blue-600 underline">Tech Support</a>
                </div>
                {/* Spacer to prevent content from being hidden behind the footer */}
                <div className="h-20" />
            </div>
            
            {/* Fixed footer for Update Changes button */}
            <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto w-full p-4 bg-white dark:bg-[#0D0D0D] z-[100000]">
                <button 
                    className={buttonClass}
                    onClick={handleUpdateProfile}
                    disabled={!hasChanges || isUpdating}
                >
                    {isUpdating ? (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Updating...
                        </span>
                    ) : (
                        'Update Changes'
                    )}
                </button>
            </div>
        </div>
    );
};

export default EditProfileScreen;