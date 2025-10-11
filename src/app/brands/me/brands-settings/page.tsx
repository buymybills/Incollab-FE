"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Info,
  LogOut,
  Megaphone,
  MessageSquare,
  Pencil,
  User
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import AccountSettingsScreen from '@/components/common/AccountSettingsScreen'
import { useState } from 'react'

const BrandSettingPage = () => {
  const router = useRouter()
  const { user, logout } = useAuthContext()
  const [showAccountSettingScreen, setShowAccountSettingScreen] = useState<boolean>(false);

  const handleBack = () => {
    router.back()
  }

  const handleEditProfile = () => {
    router.push('/brands/me/edit-profile')
  }

  if(showAccountSettingScreen) return <AccountSettingsScreen onClose={() => setShowAccountSettingScreen(false)}/>

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-theme-primary px-4 py-6 rounded-b-3xl">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={handleBack} className="p-1">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-white font-bold">Setting and Activity</h1>
        </div>

        {/* User Profile Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src={user?.profileImage || "/images/user/influencer.svg"}
                alt="profile"
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">
                {user?.name || "Sneha Sharma"}
              </h2>
              <p className="text-white text-sm font-medium">
                {user?.username ? `@${user.username}` : "@sneha_s09"}
              </p>
            </div>
          </div>
          <button
            onClick={handleEditProfile}
            className=""
          >
            <Pencil size={18} className="text-white" />
          </button>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* For Brands Section */}
        <div>
          <h3 className="text-[#222] font-bold mb-3">For Brands</h3>
          <button
            className="w-full flex items-center justify-between p-4 bg-white border border-[#E4E4E4] rounded-2xl"
          >
            <div className="flex items-center gap-3" onClick={() => router.push('/brands/campaign/my-campaign')}>
              <Megaphone size={20} className="text-gray-600" />
              <span className="text-[#555] font-bold">Campaign Management</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        </div>

        {/* More Setting Section */}
        <div>
          <h3 className="text-[#222] font-bold mb-3">More Setting</h3>
          <div className="space-y-1 border border-[#E4E4E4] rounded-2xl">
            <div className='px-4'>
                <button
                className="w-full flex items-center justify-between border-b py-4 border-[#E4E4E4]"
                >
                <div className="flex items-center gap-3">
                    <HelpCircle size={20} className="text-gray-600" />
                    <span className="text-[#555] font-bold">Frequently Asked Questions</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                </button>
            </div>

            <div className='px-4'>
                <button
                className="w-full flex items-center justify-between border-b py-4 border-[#E4E4E4]"
                >
                <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-gray-600" />
                    <span className="text-[#555] font-bold">Connect With Us</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                </button>
            </div>

            <div className='px-4'>
                <button
                onClick={() => setShowAccountSettingScreen(true)}
                className="w-full flex items-center justify-between border-b py-4 border-[#E4E4E4]"
                >
                <div className="flex items-center gap-3">
                    <User size={20} className="text-gray-600" />
                    <span className="text-[#555] font-bold">Account Setting</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                </button>
            </div>

            <div className='px-4'>
                <button
                className="w-full flex items-center justify-between border-b py-4 border-[#E4E4E4]"
                >
                <div className="flex items-center gap-3">
                    <Info size={20} className="text-gray-600" />
                    <span className="text-[#555] font-bold">About Us</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                </button>
            </div>

            <div className='px-4'>
                <button
                onClick={() => logout()}
                className="w-full flex items-center justify-between py-4"
                >
                <div className="flex items-center gap-3">
                    <LogOut size={20} className="text-gray-600" />
                    <span className="text-[#555] font-bold">Logout</span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BrandSettingPage