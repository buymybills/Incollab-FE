"use client"
import EditBrandsProfileScreen from '@/components/screens/EditBrandsProfileScreen'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EditBrandsProfilePage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Header */}
      <div className='border-b border-[#E4E4E4]'>
        <div className="flex items-center gap-x-3 px-4 py-3">
          <button onClick={handleBack}>
            <ChevronLeft size={20}/>
          </button>
          <span className='font-bold text-black'>
            Edit Profile
          </span>
        </div>
      </div>

      {/* Edit Profile Screen */}
      <div className='flex-1'>
        <EditBrandsProfileScreen onClose={handleBack} />
      </div>
    </div>
  )
}

export default EditBrandsProfilePage