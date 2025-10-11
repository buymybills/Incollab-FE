"use client"
import React, { useEffect, useRef, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form"
import { Edit2, ImageIcon, Upload, X } from 'lucide-react'
import Image from 'next/image'
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useMutationApi, { DynamicMutationPayload } from '@/hooks/useMutationApi'
import { useAuthContext } from '@/auth/context/auth-provider'
import { useRouter } from 'next/navigation'

// Form data interface
interface EditProfileFormData {
  bannerImage: string
  profileImage: string
  brandBio: string
}

interface EditBrandsProfileScreenProps {
  onClose?: () => void
}

const EditBrandsProfileScreen = ({ onClose }: EditBrandsProfileScreenProps) => {
  const bannerInputRef = useRef<HTMLInputElement>(null)
  const profileInputRef = useRef<HTMLInputElement>(null)
  const [bannerFile, setBannerFile] = useState<File | null>(null)
  const [profileFile, setProfileFile] = useState<File | null>(null)
  const { user, refetchUser } = useAuthContext()
  const router = useRouter()

  const {mutateAsync: updateBrandsProfile, isPending: updateBrandsLoading} = useMutationApi({
    endpoint: 'brand/profile',
    method: 'PUT',
    headers:{
        'Content-Type': 'multipart/form-data'
    },
    onSuccess: () => {
      refetchUser()
      if (onClose) {
        onClose()
      } else {
        router.back()
      }
    }
  })

  // Initialize react-hook-form
  const methods = useForm<EditProfileFormData>({
    defaultValues: {
      bannerImage: "",
      profileImage: "",
      brandBio: "",
    },
    mode: "onChange"
  })

  const { handleSubmit, register, formState: { errors }, trigger, setValue, watch } = methods

  // Watch form values
  const watchedBannerImage = watch("bannerImage")
  const watchedProfileImage = watch("profileImage")

  const handleBannerUpload = () => {
    bannerInputRef.current?.click()
  }

  const handleProfileUpload = () => {
    profileInputRef.current?.click()
  }

  const handleBannerFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setBannerFile(file)
      setValue("bannerImage", imageUrl)
      await trigger("bannerImage")
      console.log('Banner file selected:', file.name)
    }
  }

  const handleRemoveBanner = async () => {
    setValue("bannerImage", "")
    setBannerFile(null)
    if (bannerInputRef.current) {
      bannerInputRef.current.value = ''
    }
    await trigger("bannerImage")
  }

  const handleProfileFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setProfileFile(file)
      setValue("profileImage", imageUrl)
      await trigger("profileImage")
      console.log('Profile file selected:', file.name)
    }
  }

  const handleRemoveProfile = async () => {
    setValue("profileImage", "")
    setProfileFile(null)
    if (profileInputRef.current) {
      profileInputRef.current.value = ''
    }
    await trigger("profileImage")
  }


  const onSubmit = async (data: EditProfileFormData) => {
    try {
      const payload = new FormData()

      // Add files
      if (bannerFile) {
        payload.append('profileBanner', bannerFile)
      }
      if (profileFile) {
        payload.append('profileImage', profileFile)
      }

      // Add brand bio
      payload.append('brandBio', data.brandBio)

      await updateBrandsProfile(payload as unknown as DynamicMutationPayload)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  // Populate form with existing user data
  useEffect(() => {
    if (user) {
      // Set images
      if (user.profileMedia?.profileBanner) {
        setValue("bannerImage", user.profileMedia.profileBanner)
      }
      if (user.profileMedia?.profileImage) {
        setValue("profileImage", user.profileMedia.profileImage)
      }

      // Set brand bio
      if (user.brandBio) {
        setValue("brandBio", user.brandBio)
      }
    }
  }, [user, setValue])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center mt-6 px-4 pb-32 space-y-12">
            <div className="w-full">
                <div>
                    <h3 className="font-semibold text-black mb-4">Profile Banner*</h3>
                    {watchedBannerImage ? (
                        <div className="relative rounded-lg overflow-hidden min-h-[120px]">
                            <Image
                                src={watchedBannerImage}
                                alt="Banner preview"
                                fill
                                className="object-cover"
                            />

                            <button
                                type="button"
                                onClick={handleRemoveBanner}
                                className="absolute top-2 right-2 flex items-center bg-theme-blue hover:bg-black/70 text-white rounded-full p-1.5 transition-colors duration-200 z-10"
                                title="Remove banner image"
                            >
                                <X size={16} />
                            </button>

                            <div
                                onClick={handleBannerUpload}
                                className="absolute inset-0 bg-black/0 hover:bg-black/30 flex items-center justify-center transition-all duration-200 cursor-pointer group"
                            >
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center text-white">
                                    <Upload size={20} className="mb-1" />
                                    <span className="text-xs font-medium">Change Banner</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            onClick={handleBannerUpload}
                            className="border-2 border-dashed border-theme-primary rounded-lg p-8 flex flex-col items-center justify-center bg-gray-50 min-h-[120px] cursor-pointer hover:bg-gray-100 transition-colors"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                                <ImageIcon className="w-6 h-6 text-blue-600" />
                            </div>
                            <p className="text-sm font-medium text-gray-800">Tap to add Image</p>
                            <p className="text-xs text-gray-500 mt-1">JPG / PNG Max Size 50kb</p>
                        </div>
                    )}
                    <input
                        ref={bannerInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleBannerFileChange}
                        className="hidden"
                    />
                    <input
                        type="hidden"
                        {...register("bannerImage", {
                            required: "Banner image is required"
                        })}
                    />
                    {errors.bannerImage && (
                        <p className="text-red-500 text-sm mt-2">{errors.bannerImage.message}</p>
                    )}
                </div>

                <div>
                    <h3 className=" font-semibold text-black mb-3 mt-6">Profile Image*</h3>
                    <div className="flex justify-center">
                        <div className="relative">
                            {watchedProfileImage ? (
                                <>
                                    <div className="w-24 h-24 rounded-full overflow-hidden relative">
                                        <Image
                                            src={watchedProfileImage}
                                            alt="Profile preview"
                                            fill
                                            className="object-cover"
                                        />

                                        <div
                                            onClick={handleProfileUpload}
                                            className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center transition-all duration-200 cursor-pointer group rounded-full"
                                        >
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center text-white">
                                                <Upload size={16} className="mb-1" />
                                                <span className="text-xs font-medium">Change</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleRemoveProfile}
                                        className="absolute top-1 -right-1 w-6 h-6 bg-theme-blue text-white rounded-full flex items-center justify-center transition-colors duration-200 z-10"
                                        title="Remove profile image"
                                    >
                                        <X size={12} />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div
                                        onClick={handleProfileUpload}
                                        className="w-24 h-24 rounded-full flex items-center border border-dashed border-gray-200 relative justify-center overflow-hidden cursor-pointer"
                                    >
                                        <Image src="/images/user/influencer.svg" alt="Profile" fill className="object-contain" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleProfileUpload}
                                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-white rounded-full flex items-center justify-center border-2 border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    <input
                        ref={profileInputRef}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        onChange={handleProfileFileChange}
                        className="hidden"
                    />
                    <input
                        type="hidden"
                        {...register("profileImage", {
                            required: "Profile image is required"
                        })}
                    />
                    {errors.profileImage && (
                        <p className="text-red-500 text-sm mt-2 text-center">{errors.profileImage.message}</p>
                    )}
                </div>

                {/* Brand Bio Section */}
                <div>
                    <h3 className="font-semibold text-black mb-3 mt-6">Brand Bio</h3>
                    <div className="relative">
                        <textarea
                            {...register("brandBio", {
                                required: "Brand bio is required",
                                minLength: {
                                    value: 20,
                                    message: "Brand bio must be at least 20 characters"
                                },
                                maxLength: {
                                    value: 1000,
                                    message: "Brand bio cannot exceed 1000 characters"
                                }
                            })}
                            placeholder="Tell us about your brand..."
                            className={`w-full p-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 ${
                                errors.brandBio ? 'border-red-500' : 'border-gray-300'
                            }`}
                            maxLength={1000}
                        />
                        <span className="absolute -bottom-3 right-0 text-xs text-gray-500">
                            {watch("brandBio")?.length || 0}/1000
                        </span>
                    </div>
                    {errors.brandBio && (
                        <p className="text-red-500 text-sm mt-4">{errors.brandBio.message}</p>
                    )}
                </div>
            </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E4E4E4]">
            <ArrowFilledButton
              text={updateBrandsLoading ? "Saving..." : "Save Changes"}
              textCenter={true}
              disabled={updateBrandsLoading}
            />
        </div>
      </form>
    </FormProvider>
  )
}

export default EditBrandsProfileScreen