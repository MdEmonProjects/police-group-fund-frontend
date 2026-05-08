import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsQuery, useUpdateUserProfileMutation } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import { formatToDDMMYYYY } from '../../utils/dateFormat';
import useTranslate from '../../utils/Translate';
import { FormProvider, useForm } from 'react-hook-form';
import DefaultImageUpload from '../../components/Forms/DefaultImageUpload';
import { useGetDistrictsQuery, useGetPoliceStationsQuery } from '../../features/settings/settingsQuerySlice';
import DefaultInput from '../../components/Forms/DefaultInput';
import DefaultSelect from '../../components/Forms/DefaultSelect';
import Button from '../../components/Button/Button';
import Swal from 'sweetalert2';
const API_URL = import.meta.env.VITE_SERVER_URL;
export default function UserProfileEdit() {
  const [openSettings, setOpenSettings] = useState(false);
  const methods = useForm();
  const { watch, register, setValue, formState: { errors, touchedFields, isSubmitted } } = methods;
  const settingsRef = useRef();
  const { schoolid } = useParams();
  const translate = useTranslate();

  const [profilePreviewUrl, setProfilePreviewUrl] = useState(null);
  const [nidFrontPreviewUrl, setNidFrontPreviewUrl] = useState(null);
  const [nidBackPreviewUrl, setNidBackPreviewUrl] = useState(null);

  const {
    data: userDetails,
    isLoading,
    isError: isuserDetailsError,
    isSuccess
  } = useGetUserDetailsQuery();

  const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http://') || path.startsWith('https://')) return path;
    if (path.startsWith('//')) return `${window.location.protocol}${path}`;
    if (path.startsWith('/')) {
      if (API_URL) return `${API_URL.replace(/\/$/, '')}${path}`;
      return `${window.location.origin}${path}`;
    }
    if (API_URL) return `${API_URL.replace(/\/$/, '')}/${path}`;
    return path;
  };

  const DistrictID = watch('DistrictID');
  const { data: districts = [] } = useGetDistrictsQuery();
  const { data: policeStations = [] } = useGetPoliceStationsQuery(DistrictID, {
    skip: !DistrictID,
  });

  const [updateUserInfo, { isLoading: uploadLoading, isError: uploadError, error },] = useUpdateUserProfileMutation();


  useEffect(() => {
    if (userDetails) {
      setValue('DistrictID', userDetails?.District);
      setProfilePreviewUrl(getImageUrl(userDetails?.profile_image));
      setNidFrontPreviewUrl(getImageUrl(userDetails?.NidFront));
      setNidBackPreviewUrl(getImageUrl(userDetails?.NidBack));
    }
  }, [userDetails, setValue]);

  useEffect(() => {
    if (userDetails?.Area) {
      setValue('permanentPoliceStationID', userDetails.Area);
    }
  }, [policeStations, setValue, userDetails]);

  // Close on outside click

  const onSubmit = async (formData) => {
    const formDataToSend = new FormData();
    console.log(formData);
    
    Object.entries(formData).forEach(([key, value]) => {
      const isImageField = ['profile_image', 'nid_font_image', 'nid_back_image'].includes(key);
      
      // Only include File objects for image fields, skip strings/URLs
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else if (!isImageField && value !== undefined && value !== null && typeof value !== 'object') {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await updateUserInfo(formDataToSend).unwrap();

      Swal.fire({
        icon: response?.success ? 'success' : 'success',
        title: response?.message || 'Profile updated successfully',
        text: response?.message || 'Your profile has been updated.',
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err?.data?.error || err?.message || 'Something went wrong!',
      });
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem('user_panel_token');
    window.location.href = `/${schoolid}/login`;
  };
  if (isLoading) {
    return <UserProfileSkeleton />;
  }
  return (
    <div className="bg-white shadow-xl relative mb-16 ">
      {/* Settings Button */}

      {/* Banner */}
      <div className="w-full h-[100px]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          className="w-full h-full object-cover"
          alt="profile background"
        />
      </div>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-2 ">
          <DefaultImageUpload
            label="Upload Profile Image"
            registerKey="profile_image"
            image={profilePreviewUrl}
            setPreviewUrl={setProfilePreviewUrl}
            previewUrl={profilePreviewUrl}
            imagePreiewClass="w-full h-[200px] object-contain mx-auto"
          />
          <DefaultImageUpload
            label="Upload NID Front Image"
            registerKey="nid_font_image"
            image={nidFrontPreviewUrl}
            setPreviewUrl={setNidFrontPreviewUrl}
            previewUrl={nidFrontPreviewUrl}
            imagePreiewClass="w-full h-[200px] object-contain mx-auto"
          />
          <DefaultImageUpload
            label="Upload NID Back Image"
            registerKey="nid_back_image"
            image={nidBackPreviewUrl}
            setPreviewUrl={setNidBackPreviewUrl}
            previewUrl={nidBackPreviewUrl}
            imagePreiewClass="w-full h-[200px] object-contain mx-auto"
          />
          <div className="my-1 flex flex-col  space-y-4 2xl:space-y-0 2xl:space-x-4 min-h-screen">
            {/* LEFT PANEL */}
            <div className="w-full flex flex-col mx-auto">
              {/* Personal Info */}

              <DefaultInput
                registerKey="phone_number"
                label="Phone Number"
                placeholder="Enter your Phone Number"
                type="phone"
                require={"Phone Number Require"}
                defaultValue={userDetails?.phone_number}
              />
              <DefaultInput
                registerKey="Nid"
                label="NID"
                placeholder="Enter your NID Number"
                type="number"
                required
                defaultValue={userDetails?.Nid}
              />

              <DefaultSelect
                label="জেলা"
                type="number"
                options={districts}
                registerKey="DistrictID"
                valueField="DistrictID"
                nameField="DistrictName"
                require={"District Is Required"}
              />
              <DefaultSelect
                label="থানা"
                type="number"
                options={policeStations}
                registerKey="permanentPoliceStationID"
                valueField="PoliceStationID"
                nameField="PoliceStationName"
                require={"Police Station Is Required"}
              />


              <DefaultInput
                registerKey="address"
                label="Address"
                placeholder="Enter full address"
                type="text"
                required
                defaultValue={userDetails?.Address}
              />

              {/* GenderID */}
              <div className="mb-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  {...register('genderID', { required: 'Gender is required' })} defaultValue={userDetails?.GenderID}
                  className="w-full border border-gray-300 rounded-md py-2 px-3 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
                {errors.genderID && (
                  <p className="text-red-500 text-xs mt-1">{errors.genderID.message}</p>
                )}
              </div>

              {/* DOB */}
              <DefaultInput
                registerKey="dob"
                label="Date of Birth"
                placeholder=""
                type="date"
                required={"Date of Birth is required"}
                defaultValue={userDetails?.DOB ? new Date(userDetails.DOB).toISOString().split('T')[0] : ''}
              />

              <Button type='submit' className='mt-4'>Submit</Button>

            </div>


          </div>
        </form>
      </FormProvider>



    </div>
  );
}
function UserProfileSkeleton() {
  return (
    <div className="bg-white shadow-xl relative mb-16 animate-pulse">
      {/* Banner Skeleton */}
      <div className="w-full h-[100px] bg-gray-200" />

      {/* Profile Skeleton */}
      <div className="flex flex-col items-center -mt-20">
        <div className="w-40 h-40 rounded-full bg-gray-300 border-4 border-white" />

        <div className="h-6 w-48 bg-gray-300 rounded mt-4" />
        <div className="h-4 w-56 bg-gray-200 rounded mt-2" />
      </div>

      {/* Content Skeleton */}
      <div className="my-4 px-4">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4" />

        <ul className="space-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i} className="flex items-center border-b pb-2">
              <div className="w-32 h-4 bg-gray-300 rounded" />
              <div className="mx-2">:</div>
              <div className="flex-1 h-4 bg-gray-200 rounded" />
            </li>
          ))}

          {/* Logout Button Skeleton */}
          <li className="flex justify-center pt-4">
            <div className="h-10 w-32 bg-gray-300 rounded" />
          </li>
        </ul>
      </div>
    </div>
  );
}
