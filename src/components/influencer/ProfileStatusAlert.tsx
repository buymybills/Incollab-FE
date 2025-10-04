import React, { useState } from 'react'
import { Clock, CheckCircle, X, BadgeX } from 'lucide-react'

interface ProfileStatusAlertProps {
  status?: string
  isNew?: boolean
  onClose?: () => void
}

const ProfileStatusAlert = ({ status, isNew, onClose }: ProfileStatusAlertProps) => {
  const [isVisible, setIsVisible] = useState(true)
console.log({status})
  const handleClose = () => {
    setIsVisible(false)
    onClose?.()
  }

  // Don't show if isNew is false (notification is old/already seen)
  if (!isNew && status !== 'pending') {
    return null
  }

  if (!isVisible) return null

  if (status === 'approved') {
    return (
      <div className="border-2 mt-4 border-dashed border-theme-primary bg-theme-primary/10 rounded-xl px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <CheckCircle className="text-theme-primary" size={18}/>
            </div>
            <div className="flex flex-col">
              <h3 className="text-theme-primary font-bold">
                Profile Verification Successful
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    )
  }

  if (status === 'rejected') {
    return (
      <div className="border-2 border-dashed border-[#FF5F57] bg-[#FF5F57]/10 rounded-xl px-3 py-3 my-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <BadgeX className="text-[#FF5F57]" size={18}/>
            </div>
            <div className="flex flex-col">
              <h3 className="text-[#FF5F57] font-bold">
                Profile Verification Rejected
              </h3>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="flex-shrink-0 w-5 h-5 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="border-2 border-dashed border-theme-primary bg-theme-primary/10 rounded-xl px-3 py-3 my-4">
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Clock className="w-6 h-6 text-theme-primary" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-theme-primary font-bold">
            Profile Under Verification
          </h3>
          <p className="text-theme-primary text-xs text-nowrap">
            Usually takes 1-2 Business day to complete verification
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfileStatusAlert