"use client"
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Plus } from 'lucide-react'
import { useAuthContext } from '@/auth/context/auth-provider'
import useFetchApi from '@/hooks/useFetchApi'
import useMutationApi from '@/hooks/useMutationApi'
import { useRouter } from 'next/navigation'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'

interface Niche {
  id: number
  name: string
  description?: string
  icon?: string
}

const MyNichePage = () => {
  const { user, refetchUser } = useAuthContext()
  const router = useRouter()
  const [allNiches, setAllNiches] = useState<Niche[]>([])
  const [selectedNiches, setSelectedNiches] = useState<number[]>(
    user?.niches?.map(niche => niche.id || 0) || []
  )

  // Fetch all available niches
  const { data: niches, loading: nichesLoading } = useFetchApi<{ niches: Niche[] }>({
    endpoint: 'auth/niches',
  })

  // Mutation for updating niches
  const { mutateAsync: updateNiches, isPending: updateLoading } = useMutationApi({
    endpoint: 'influencer/profile',
    method: 'PUT',
  })

  useEffect(() => {
    if(niches){
        setAllNiches(niches?.niches || [])
    }
  },[niches])

  // Update selected niches when user data changes
  useEffect(() => {
    if (user?.niches) {
      setSelectedNiches(user.niches.map(niche => niche.id || 0))
    }
  }, [user?.niches])

  const handleNicheToggle = (nicheId: number) => {
    setSelectedNiches(prev => {
      if (prev.includes(nicheId)) {
        return prev.filter(id => id !== nicheId)
      } else {
        return [...prev, nicheId]
      }
    })
  }

  const handleCancel = () => {
    router.back()
  }

  const handleAddCustom = () => {
    console.log('Add custom niche')
  }

  const handleSaveChanges = async () => {
    // Validate that at least one niche is selected
    if (selectedNiches.length === 0) {
      return
    }

    try {
      // Create payload with selected niche IDs as comma-separated string
      const payload = {
        nicheIds: selectedNiches.join(',')
      }

      await updateNiches(payload)

      // Navigate back after successful save
      refetchUser();
    } catch (error) {
      console.error('Error updating niches:', error)
    }
  }

  // Check if no niches are selected
  const hasNoSelection = selectedNiches.length === 0

  if (nichesLoading) {
    return (
      <div className="p-4">
        <div className="max-w-md mx-auto">
          <div className="text-center">Loading niches...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={handleCancel} className="p-1">
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-black">My Niche</h1>
        </div>
        <button
          onClick={handleCancel}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      <div className="p-4">
        {/* What's Your Niche Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-black">What&apos;s Your Niche?</h2>
          <button
            onClick={handleAddCustom}
            className="flex items-center gap-1 text-blue-500 font-bold text-sm"
          >
            <Plus size={16} />
            Add Custom
          </button>
        </div>

        {/* Niches Grid */}
        <div className="flex flex-wrap gap-3 mb-6">
          {allNiches?.map((niche) => {
            const isSelected = selectedNiches.includes(niche.id)
            return (
              <button
                key={niche.id}
                onClick={() => handleNicheToggle(niche.id)}
                className={`flex items-center gap-3 p-3 justify-center rounded-full border transition-all ${
                  isSelected
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                <span className="font-bold text-nowrap">{niche.name}</span>
              </button>
            )
          })}
        </div>

        {/* Selected Counter / Error Message */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E4E4E4]">
          <div className='flex items-center justify-center mb-3'>
            {hasNoSelection ? (
              <span className="font-semibold text-[#FF5F57]">
                Select At least one to Continue
              </span>
            ) : (
              <span className="font-semibold">
                Selected ({selectedNiches.length}/{allNiches?.length || 0})
              </span>
            )}
          </div>
          <ArrowFilledButton
            text={updateLoading ? 'Saving...' : 'Save Changes'}
            textCenter={true}
            onClick={handleSaveChanges}
            disabled={hasNoSelection || updateLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default MyNichePage