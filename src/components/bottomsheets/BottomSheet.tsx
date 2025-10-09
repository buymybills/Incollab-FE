'use client'

import React, { useEffect, useRef } from 'react'


interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  bottomSheetMinimumHeight?: number
  bottomSheetMaximumHeight?: number
  zIndexBackdrop?: number
  zIndexSheet?: number
}

export default function BottomSheet({ isOpen, onClose, children, bottomSheetMinimumHeight, bottomSheetMaximumHeight, zIndexBackdrop = 40, zIndexSheet = 50 }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null)
  console.log(bottomSheetMinimumHeight)

  // const minHeight = typeof window !== 'undefined' && bottomSheetMinimumHeight || 500 // 60% of screen initially
  const maxHeight = typeof window !== 'undefined' && bottomSheetMaximumHeight || 560 // 70% of screen

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#000]/70"
        style={{ zIndex: zIndexBackdrop }}
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        ref={sheetRef}
        className="fixed bottom-0 w-full left-0 right bg-white shadow-xl transition-transform duration-300 ease-out rounded-t-3xl"
        style={{
          height: `${maxHeight}px`,
          zIndex: zIndexSheet,
        }}
      >

        {/* Content */}
        <div className="h-full overflow-y-auto no-scrollbar pt-6">
          {children}
        </div>
      </div>
    </>
  )
}