"use client"
import { useAuthContext } from '@/auth/context/auth-provider'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useMutationApi from '@/hooks/useMutationApi'
import { ChevronLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from "react-hook-form"

interface EditBioFormData {
  bio: string
}

const EditBioScreen = () => {
  const { user, setUser, refetchUser } = useAuthContext()
  const router = useRouter();

  const {mutateAsync: updateBio, isPending: updateLoading} = useMutationApi({
    endpoint: 'influencer/profile',
    method: 'PUT',
  })

  // Initialize react-hook-form
  const { handleSubmit, register, formState: { errors }, watch, setValue } = useForm<EditBioFormData>({
    defaultValues: {
      bio: "",
    },
    mode: "onChange"
  })

  // Watch bio value for character count
  const watchedBio = watch("bio")

  // Populate form with existing user bio
  useEffect(() => {
    if (user?.bio) {
      setValue("bio", user.bio)
    }
  }, [user, setValue])

  const onSubmit = async (data: EditBioFormData) => {
    try {
      const payload = {
        bio: data.bio
      }

      await updateBio(payload)

      // Update user context with new bio
      if (user) {
        setUser({
          ...user,
          bio: data.bio
        })
      }

      // Refetch user data to ensure we have the latest
      refetchUser()
    } catch (error) {
      console.error('Error updating bio:', error)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-1"
          >
            <ChevronLeft size={20} className="text-black" />
          </button>
          <h1 className="font-bold text-black">Edit Bio</h1>
        </div>
        <button
          onClick={() => router.back()}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col flex-1">
        <div className="flex-1 p-4">
          <div className="space-y-4">
            <h2 className="font-bold text-black">Tell Other About Your Self</h2>

            <div className="relative">
              <textarea
                {...register("bio", {
                  maxLength: {
                    value: 1000,
                    message: "Bio cannot exceed 1000 characters"
                  }
                })}
                placeholder="Fashion enthusiast & beauty creator | Blending style with self-expression | Collaborating with brands to inspire confidence & creativity.

'Redefining beauty with every outfit 💄 Fashion, glam & unapologetic self-love | Let's create magic together.'"
                className={`w-full p-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none min-h-[200px] ${
                  errors.bio ? 'border-red-500' : 'border-gray-300'
                }`}
                maxLength={1000}
              />
              <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                {watchedBio?.length || 0}/10,00
              </div>
            </div>

            {errors.bio && (
              <p className="text-red-500 text-sm">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* Fixed Bottom Button */}
        <div className="p-4 bg-white border-t border-[#E4E4E4] fixed bottom-0 w-full">
          <ArrowFilledButton
            text={updateLoading ? "Saving..." : "Save Changes"}
            textCenter={true}
            onClick={handleSubmit(onSubmit)}
            disabled={updateLoading}
          />
        </div>
      </form>
    </div>
  )
}

export default EditBioScreen