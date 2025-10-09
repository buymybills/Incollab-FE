import { ArrowLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'
import Image from 'next/image'
import DeleteAccountScreen from './DeleteAccountScreen'

const AccountSettingsScreen = ({onClose}: {onClose: () => void}) => {
    const [showDeleteAccount, setShowDeleteAccount] = useState<boolean>(false);
    const menuItems = [
        {
            id: 1,
            icon: '/images/icons/notification.svg',
            label: 'Notification Setting',
            onClick: () => {
                // Handle notification setting navigation
            }
        },
        {
            id: 2,
            icon: '/images/icons/lock.svg',
            label: 'App Permissions',
            onClick: () => {
                // Handle app permissions navigation
            }
        },
        {
            id: 3,
            icon: '/images/icons/trash-bin.svg',
            label: 'Delete Account',
            onClick: () => {
                setShowDeleteAccount(true);
            }
        }
    ]

    if(showDeleteAccount) return <DeleteAccountScreen isOpen={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} />

    return (
        <div className="p-4">
            {/* Header */}
            <div className="flex items-center gap-x-3 mb-6">
                <button onClick={onClose} className="text-gray-800">
                    <ArrowLeft size={24} />
                </button>
                <h1 className='text-xl font-semibold text-gray-800'>Account Setting</h1>
            </div>

            {/* Menu Items Card */}
            <div className="bg-white rounded-2xl border border-[#E4E4E4] overflow-hidden">
                {menuItems.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <button
                            onClick={item.onClick}
                            className='w-full flex items-center justify-between p-4 transition-colors'
                        >
                            <div className='flex items-center gap-x-4'>
                                <div className="icon text-[#555]">
                                    <Image
                                        src={item.icon}
                                        alt={item.label}
                                        height={24}
                                        width={24}
                                    />
                                </div>
                                <span className="text-[#555] font-bold text-sm">
                                    {item.label}
                                </span>
                            </div>
                            <ChevronRight size={20} className="text-[#555]" />
                        </button>
                        {index < menuItems.length - 1 && (
                            <div className="border-b border-[#E4E4E4] mx-4" />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default AccountSettingsScreen