"use client"
import EditBrandsDetailScreen from '@/components/screens/EditBrandsDetailScreen'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

const EditBrandDetailPage = () => {
  const router = useRouter()

  const handleBack = () => {
    router.back()
  }

  return (
    <div className='min-h-screen flex flex-col bg-white'>
      {/* Header */}
      <div className='border-b border-[#E4E4E4]'>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-x-3">
            <button onClick={handleBack}>
              <ChevronLeft size={20}/>
            </button>
            <span className='font-bold text-black'>
              Edit Brand Detail
            </span>
          </div>
          <button
            onClick={handleBack}
            className='text-red-500 font-medium text-sm'
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Edit Brand Detail Screen */}
      <div className='flex-1'>
        <EditBrandsDetailScreen />
      </div>
    </div>
  )
}

export default EditBrandDetailPage