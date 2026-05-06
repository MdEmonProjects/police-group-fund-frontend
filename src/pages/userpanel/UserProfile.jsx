import { Buffer } from 'buffer';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useGetUserDetailsByIDQuery, useGetUserDetailsQuery } from '../../features/userPanel/userInfo/userInfoQuerySlice';
import { formatToDDMMYYYY } from '../../utils/dateFormat';
import useTranslate from '../../utils/Translate';
export default function UserProfile() {
  const [openSettings, setOpenSettings] = useState(false);
  const settingsRef = useRef();
  const { schoolid, id } = useParams();
  const translate = useTranslate();

  const currentSession = useSelector(
    (state) => state.sessionChange.currentSession
  );

  const {
    data: userDetails,
    isLoading,
    isError: isuserDetailsError,
  } = useGetUserDetailsByIDQuery(id);

  console.log(userDetails, 'userDetails');

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setOpenSettings(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const bufferConveter = (bufferData) => {
    if (!bufferData) {
      return '/logo.png';
    }
    const buffer = Buffer.from(bufferData);
    const base64String = buffer.toString('base64');
    const imageSrc = `data:image/png;base64,${base64String}`;
    return imageSrc;
  };

  const handleLogOut = () => {
    localStorage.removeItem('user_panel_token');
    window.location.href = `/${schoolid}/login`;
  };
  if (isLoading) {
    return <UserProfileSkeleton />;
  }
  return (
    <div className="bg-white shadow-xl relative mb-16">
      {/* Settings Button */}

      {/* Banner */}
      <div className="w-full h-[100px]">
        <img
          src="https://vojislavd.com/ta-template-demo/assets/img/profile-background.jpg"
          className="w-full h-full object-cover"
          alt="profile background"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col items-center -mt-20">
        <img
          src={`https://qmmsoft.com/avatar.png`}
          className="w-40 h-40 object-cover border-4 border-white rounded-full"
          alt="profile"
        />
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-2xl">{userDetails?.name}</p>
        </div>
           <p className="text-gray-700">
          {userDetails?.Address}, {userDetails?.areaInfo.PoliceStationName}, {userDetails?.districtInfo.DistrictName}
        </p>
        {/* <p className="text-sm text-gray-500">New York, USA</p> */}
      </div>

      <div className="my-1 flex flex-col  space-y-4 2xl:space-y-0 2xl:space-x-4 ">
        {/* LEFT PANEL */}
         <div className="w-full flex flex-col mx-auto min-h-screen">
          {/* Personal Info */}
          <div className="flex-1 bg-white rounded-lg p-4 pt-2">
            <h4 className="text-xl text-gray-900 font-bold">ইউজার তথ্য</h4>
            <ul className="mt-2 text-gray-700">
        
              <li className="flex border-b py-2">
                <span className="font-bold w-26">বাবার নাম</span>
                <span className="mx-2">:</span>
                <span className="text-gray-700">
                  {userDetails?.FatherName}
                </span>
              </li>

         
              <li className="flex border-b py-2">
                <span className="font-bold w-26">মোবাইল</span>
                <span className="mx-2">:</span>

                <span className="text-gray-700">{userDetails?.phone_number}</span>
              </li>

              <li className="flex border-b py-2">
                <span className="font-bold w-26">জন্ম তারিখ</span>
                <span className="mx-2">:</span>

                <span className="text-gray-700">
                  {translate(formatToDDMMYYYY(userDetails?.DOB))}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-26">গ্রাম</span>
                <span className="mx-2">:</span>

                <span className="text-gray-700">
                  {userDetails?.Address}
                </span>
              </li>
                {/* <li className="flex border-b py-2">
                  <span className="font-bold w-26">ডাক</span>
                  <span className="mx-2">:</span>

                  <span className="text-gray-700">
                    {userDetails?.permanentPost}
                  </span>
                </li> */}
              <li className="flex border-b py-2">
                <span className="font-bold w-26">থানা</span>
                <span className="mx-2">:</span>

                <span className="text-gray-700">
                  {userDetails?.areaInfo.PoliceStationName}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-26">জেলা</span>
                <span className="mx-2">:</span>

                <span className="text-gray-700">
                  {userDetails?.districtInfo.DistrictName}
                </span>
              </li>
           
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col w-full 2xl:w-2/3">
          {/* <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
                        <h4 className="text-xl text-gray-900 font-bold">About</h4>
                        <p className="mt-2 text-gray-700">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit...
                        </p>
                    </div> */}
        </div>
      </div>
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
