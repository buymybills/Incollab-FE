"use client"
import React, { useEffect, useState } from 'react'
import { useForm, FormProvider } from "react-hook-form"
import ArrowFilledButton from '@/components/buttons/ArrowFilledButton'
import useMutationApi from '@/hooks/useMutationApi'
import useFetchApi from '@/hooks/useFetchApi'
import { useAuthContext } from '@/auth/context/auth-provider'

export interface UserHeadquarterCountry {
  id: string
  name: string
  code: string
}

export interface UserHeadquarterCity {
  id: string
  name: string
  state: string
}

// Form data interface
interface EditBrandDetailFormData {
  headquarterCountry: string
  headquarterCity: string
  foundedYear: string
  websiteUrl: string
  activeRegions: string
}

interface CountryDataType {
  id: string
  name: string
  code: string
}

interface CityDataType {
  id: string
  name: string
  state: string
}

const EditBrandsDetailScreen = () => {
  const { user, refetchUser } = useAuthContext()
  const [countries, setCountries] = useState<CountryDataType[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [cities, setCities] = useState<CityDataType[]>([])

  const {mutateAsync: updateBrandDetails, isPending: updateDetailsLoading} = useMutationApi({
    endpoint: 'brand/profile',
    method: 'PUT',
    onSuccess: () => {
      refetchUser()
    }
  })

  // Initialize react-hook-form
  const methods = useForm<EditBrandDetailFormData>({
    defaultValues: {
      headquarterCountry: "",
      headquarterCity: "",
      foundedYear: "",
      websiteUrl: "",
      activeRegions: "",
    },
    mode: "onChange"
  })

  const { handleSubmit, register, formState: { errors }, setValue } = methods

  // Fetch countries data
  const {data: countriesData} = useFetchApi<CountryDataType[]>({
    endpoint: 'brand/dropdown-data/countries',
  })

  useEffect(() => {
    if (countriesData) {
      setCountries(countriesData)
    }
  }, [countriesData])

  // Fetch cities data based on selected country
  const {data: citiesData} = useFetchApi<CityDataType[]>({
    endpoint: `brand/dropdown-data/cities/${selectedCountry}`,
    retrieveOnMount: !!selectedCountry
  })

  useEffect(() => {
    if (citiesData) {
      setCities(citiesData)
    }
  }, [citiesData])

  // Generate years from 1900 to current year
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: currentYear - 1899 }, (_, i) => (currentYear - i).toString())

  const onSubmit = async (data: EditBrandDetailFormData) => {
    try {
      const payload = {
        headquarterCountryId: data.headquarterCountry,
        headquarterCityId: data.headquarterCity,
        foundedYear: data.foundedYear,
        websiteUrlUrl: data.websiteUrl,
        activeRegions: data.activeRegions,
      }

      await updateBrandDetails(payload)
    } catch (error) {
      console.error('Error updating brand details:', error)
    }
  }

  // Populate form with existing user data
  useEffect(() => {
    if (user?.companyInfo) {
      console.log('User companyInfo:', user.companyInfo)

      // Handle headquarter country - check both nested object and ID
      const countryId = user.companyInfo.headquarterCountryId ||
                       (user.companyInfo.headquarterCountry as UserHeadquarterCountry)?.id?.toString()
      if (countryId) {
        setValue("headquarterCountry", countryId)
        setSelectedCountry(countryId)
      }

      // Handle headquarter city - check both nested object and ID
      const cityId = user.companyInfo.headquarterCityId ||
                    (user.companyInfo.headquarterCity as UserHeadquarterCity)?.id?.toString()
      if (cityId) {
        setValue("headquarterCity", cityId)
      }

      // Handle founded year
      if (user.companyInfo.foundedYear) {
        setValue("foundedYear", user.companyInfo.foundedYear.toString())
      }

      // Handle website URL
      const websiteUrl = user.companyInfo.websiteUrl || user.companyInfo.website
      if (websiteUrl) {
        setValue("websiteUrl", websiteUrl)
      }

      // Handle active regions - can be array or string
      if (user.companyInfo.activeRegions) {
        const regions = Array.isArray(user.companyInfo.activeRegions)
          ? user.companyInfo.activeRegions.join(', ')
          : user.companyInfo.activeRegions
        setValue("activeRegions", regions)
      }
    }
  }, [user, setValue])

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center mt-6 px-4 pb-32 space-y-6">
          <div className="w-full">
            {/* Brand Headquarter Location */}
            <div>
              <h3 className="font-semibold text-black mb-3">Brand Headquarter Location*</h3>

              {/* Country Select */}
              <select
                {...register("headquarterCountry", {
                  required: "Country is required"
                })}
                onChange={(e) => {
                  setValue("headquarterCountry", e.target.value)
                  setSelectedCountry(e.target.value)
                  setValue("headquarterCity", "") // Reset city when country changes
                }}
                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-3 ${
                  errors.headquarterCountry ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Country</option>
                {countries.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>

              {/* City Select */}
              <select
                {...register("headquarterCity", {
                  required: "City is required"
                })}
                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.headquarterCity ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">City</option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>

              {(errors.headquarterCountry || errors.headquarterCity) && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.headquarterCountry?.message || errors.headquarterCity?.message}
                </p>
              )}
            </div>

            {/* Founded In */}
            <div className="mt-6">
              <h3 className="font-semibold text-black mb-3">Founded In*</h3>
              <select
                {...register("foundedYear", {
                  required: "Founded year is required"
                })}
                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.foundedYear ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              {errors.foundedYear && (
                <p className="text-red-500 text-sm mt-2">{errors.foundedYear.message}</p>
              )}
            </div>

            {/* Brand websiteUrl */}
            <div className="mt-6">
              <h3 className="font-semibold text-black mb-3">Brand website*</h3>
              <input
                {...register("websiteUrl", {
                  required: "websiteUrl is required",
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
                    message: "Please enter a valid websiteUrl URL"
                  }
                })}
                type="text"
                placeholder="Http.."
                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.websiteUrl ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.websiteUrl && (
                <p className="text-red-500 text-sm mt-2">{errors.websiteUrl.message}</p>
              )}
            </div>

            {/* Active Regions */}
            <div className="mt-6">
              <h3 className="font-semibold text-black mb-3">Active Regions (Campaigns)*</h3>
              <input
                {...register("activeRegions", {
                  required: "Active regions is required",
                  minLength: {
                    value: 3,
                    message: "Please enter at least 3 characters"
                  }
                })}
                type="text"
                placeholder="Eg. Asia, Europe etc."
                className={`w-full p-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.activeRegions ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.activeRegions && (
                <p className="text-red-500 text-sm mt-2">{errors.activeRegions.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#E4E4E4]">
          <ArrowFilledButton
            text={updateDetailsLoading ? "Saving..." : "Save Changes"}
            textCenter={true}
            disabled={updateDetailsLoading}
          />
        </div>
      </form>
    </FormProvider>
  )
}

export default EditBrandsDetailScreen
