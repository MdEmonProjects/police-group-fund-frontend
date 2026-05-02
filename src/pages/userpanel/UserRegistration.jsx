import { Buffer } from 'buffer';
import { useEffect, useState } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import DefaultInput from '../../components/Forms/DefaultInput';
// import { fetchResultFieldData } from '../../features/studentResultPublicView/studentResultPublicViewSlice';
import {
  useGetSoftwareLinkUserPanelQuery,
  usePostUserEmailMutation,
  usePostUserRegisterMutation,
  usePostVerifyTokenMutation,
} from '../../features/userPanel/userRegistration/userRegistrationQuerySlice';
import Swal from 'sweetalert2';
// Multi-step hook
export function useMultistepForm(steps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  function next() {
    setCurrentStepIndex((i) => (i >= steps.length - 1 ? i : i + 1));
  }
  function back() {
    setCurrentStepIndex((i) => (i <= 0 ? i : i - 1));
  }
  function goToStep(index) {
    if (index < 0 || index >= steps.length) return;
    setCurrentStepIndex(index);
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    steps,
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === steps.length - 1,
    next,
    back,
    goToStep,
  };
}

const CheckIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
  </svg>
);
const EmailIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h16v16H4V4Zm0 0 8 9 8-9" />
  </svg>
);
const LockIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14v3m-4-7V7a4 4 0 1 1 8 0v3M5 10h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1Z" />
  </svg>
);
const FormIcon = () => (
  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 4h3a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h3m0 3h6m-6 7 2 2 4-4m-5-9v4h4V3h-4Z" />
  </svg>
);

function StepIndicator({ currentStepIndex }) {
  const steps = [
    { icon: <EmailIcon /> },
    { icon: <LockIcon /> },
    { icon: <FormIcon /> },
  ];

  return (
    <ol className="flex items-center w-full max-w-[280px] mx-auto mb-6">
      {steps.map((s, i) => {
        const isDone = i < currentStepIndex;
        const isActive = i === currentStepIndex;
        const isLast = i === steps.length - 1;

        return (
          <li
            key={i}
            className={
              !isLast
                ? "flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block after:ms-3 after:rounded-full " +
                (isDone || isActive ? 'after:border-blue-500' : 'after:border-gray-300')
                : 'flex items-center'
            }
          >
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 border-2 transition-all
                ${isDone
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : isActive
                    ? 'bg-blue-600 border-blue-600 text-white'
                    : 'bg-white border-gray-300 text-gray-400'
                }`}
            >
              {isDone ? <CheckIcon /> : s.icon}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

export function StepOne({ emailSent, otpTimer, onResend, sentEmail }) {
  return (
    <>
      {!emailSent ? (
        <DefaultInput
          registerKey="email"
          label="Email Address"
          placeholder="Enter your email"
          type="email"
          required
        />
      ) : (
        <div>
          <p className="text-gray-500 text-sm mb-1">OTP sent to:</p>
          <p className="text-gray-800 font-medium bg-gray-100 border border-gray-300 rounded-md py-2 px-3 mb-2">
            {sentEmail}
          </p>
          <p className="text-blue-600 text-sm mb-3">
            উপরের ইমেইলে OTP পাঠানো হয়েছে। Time left:{' '}
            <strong>{otpTimer}s</strong>
          </p>
          <DefaultInput
            registerKey="otp"
            label="OTP"
            placeholder="Enter OTP"
            type="number"
            required
          />
          {otpTimer === 0 && (
            <button
              onClick={onResend}
              type="button"
              className="mt-1 text-sm text-blue-600 underline"
            >
              Resend OTP
            </button>
          )}
        </div>
      )}
    </>
  );
}

export function StepTwo() {
  return (
    <>
      <DefaultInput
        registerKey="name"
        label="Full Name"
        placeholder="Enter your full name"
        type="text"
        required
      />
      <DefaultInput
        registerKey="password"
        label="Password"
        placeholder="Enter password"
        type="password"
        required
      />
    </>
  );
}

export function StepThree() {
  const { register, formState: { errors } } = useFormContext();

  return (
    <>
      <DefaultInput
        registerKey="phone_number"
        label="Phone Number"
        placeholder="Enter your Phone Number"
        type="phone"
        require={"Phone Number Require"}
      />
      <DefaultInput
        registerKey="district"
        label="District"
        placeholder="Enter your district"
        type="text"
        required
      />
      <DefaultInput
        registerKey="area"
        label="Area"
        placeholder="Enter your area"
        type="text"
        required
      />
      <DefaultInput
        registerKey="address"
        label="Address"
        placeholder="Enter full address"
        type="text"
        required
      />

      {/* GenderID */}
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Gender <span className="text-red-500">*</span>
        </label>
        <select
          {...register('genderID', { required: 'Gender is required' })}
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
        required
      />
    </>
  );
}

export default function UserRegistration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [getUserEmail] = usePostUserEmailMutation();
  const [verifyOtp] = usePostVerifyTokenMutation();
  const [registerUserPanel] = usePostUserRegisterMutation();
  const { data } = useGetSoftwareLinkUserPanelQuery();
  const mobileAppInstallLink = data?.MobileAppInstall;

  const methods = useForm({ shouldUnregister: false });
  const { handleSubmit, getValues } = methods;

  const TOTAL_STEPS = 3;
  const { steps, currentStepIndex, isFirstStep, isLastStep, next, back } =
    useMultistepForm(Array(TOTAL_STEPS).fill(null)); // length-only placeholder

  const [sentEmail, setSentEmail] = useState('');  // email OTP was sent to
  const [otpTimer, setOtpTimer] = useState(0);

  // ── OTP countdown ──
  useEffect(() => {
    if (otpTimer <= 0) return;
    const interval = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [otpTimer]);

  // ── Send OTP ──
  async function requestOtp(email) {
    const res = await getUserEmail({ email }).unwrap();
    setSentEmail(res.email);
    setOtpTimer(600); // 10 min
  }

  // ── Submit handler ─────────────────────────────────────────────────────────
  async function onSubmit(data) {

    // STEP 0 — Email & OTP
    if (currentStepIndex === 0) {
      if (!sentEmail) {
        // First click: send OTP
        try {
          await requestOtp(data.email);
        } catch (error) {
          Swal.fire({
            icon: 'warning',
            title: 'Oops!',
            text: error?.data?.error || 'Something went wrong. Please try again.',
            confirmButtonText: 'OK',
          });
        }
      } else {
        // Second click: verify OTP
        try {
          const res = await verifyOtp({ email: data.email, otp: data.otp }).unwrap();
          localStorage.setItem('user_panel_token', res.token);
          next();
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Invalid OTP',
            text: error?.data?.error || 'OTP verification failed.',
            confirmButtonText: 'OK',
          });
        }
      }
      return;
    }

    // STEP 1 — Name + Password (just go next)
    if (currentStepIndex === 1) {
      next();
      return;
    }

    // STEP 2 — Submit all data
    if (currentStepIndex === 2) {
      try {
        const res = await registerUserPanel({
          name: data.name,
          password: data.password,
          District: data.district,
          Area: data.area,
          Address: data.address,
          GenderID: data.genderID,
          DOB: data.dob,
          phone_number: data.phone_number,
        }).unwrap();

        localStorage.setItem('user_panel_token', res.token);
        navigate('/user/dashboard');
      } catch (error) {
        toast.error(error?.data?.error || 'Registration failed');
      }
    }
  }

  return (
    <section className="h-[100svh] md:h-screen w-full flex items-center justify-center bg-gradient-to-b from-white to-blue-100 sm:px-6 lg:px-8 overflow-hidden">
      <div className="w-full h-full sm:h-auto md:max-w-md bg-[#ddeffe] flex flex-col">
        {/* Header */}
        <div className="bg-[#007af7] p-6 sm:p-8 md:p-6 text-center sm:rounded-t-xl rounded-b-[40px] md:rounded-b-none relative min-h-[150px] flex flex-col items-center justify-center">
          <h1 className="text-white text-2xl font-bold">Create Account</h1>
          <p className="text-blue-100 text-sm mt-1">Step {currentStepIndex + 1} of {TOTAL_STEPS}</p>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="max-w-sm mx-auto mt-6 w-full px-4 pb-6"
          >
            {/* Step Indicator */}
            <StepIndicator currentStepIndex={currentStepIndex} />

            {/* Step Content */}
            <div>
              {currentStepIndex === 0 && (
                <StepOne
                  emailSent={!!sentEmail}
                  sentEmail={sentEmail}
                  otpTimer={otpTimer}
                  onResend={() => requestOtp(getValues('email'))}
                />
              )}
              {currentStepIndex === 1 && <StepTwo />}
              {currentStepIndex === 2 && <StepThree />}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 gap-4">
              {!isFirstStep && (
                <button
                  type="button"
                  onClick={back}
                  className="px-6 py-2 rounded-md border border-blue-600 text-blue-600 bg-white hover:bg-blue-50"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                {isLastStep ? 'Submit' : currentStepIndex === 0 && !sentEmail ? 'Send OTP' : 'Next'}
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-gray-300" />
              <span className="px-3 text-sm text-gray-500">OR</span>
              <div className="flex-grow h-px bg-gray-300" />
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
              <Link to="/login" className="text-blue-600 font-medium hover:underline hover:text-blue-700">
                লগইন করুন
              </Link>
            </p>
            {mobileAppInstallLink && (
              <p className="text-center text-sm text-gray-600 mt-2">
                <Link target="_blank" to={mobileAppInstallLink} className="text-blue-600 font-medium hover:underline hover:text-blue-700">
                  রেজিস্ট্রেশন না করতে পারলে ভিডিও দেখুন।
                </Link>
              </p>
            )}
          </form>
        </FormProvider>
      </div>
    </section>
  );
}
