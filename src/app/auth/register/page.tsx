'use client';
import InputField from '../../../components/fields/InputField';
import { FcGoogle } from 'react-icons/fc';
import { FieldValues, useForm } from 'react-hook-form';
import { NameRegex } from 'constants/Regex/name.regex';
import { EmailRegex } from 'constants/Regex/email.regex';
import { PasswordRegex } from 'constants/Regex/password.regex';
import { Phone_NumberRegex } from 'constants/Regex/phone-number.regex';
import { toast } from 'react-toastify';
import { ErrorMessage } from '@hookform/error-message';
import instance from 'config/axios.config';

function SignInDefault() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await instance.post(
        `auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      return toast.success(`Data input is ok , sign in with your new account`);
    } catch {
      return toast.error(`Unknow errors`);
    }
  };

  return (
    <div
      className="border-slate-600 bg-slate-600 mt-[20vh] flex w-full items-center justify-center rounded-2xl border-white px-16 py-7"
      style={{ backgroundColor: '#475569' }}
    >
      <div className="mb-[3vh] flex h-full w-full items-center justify-center px-2 ">
        {/* Sign in section */}
        <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="mb-2.5 text-4xl font-bold text-navy-700 text-white">
            Sign Up
          </h3>
          <p className="mb-9 ml-1 text-base text-white">
            Enter your email and password to sign in!
          </p>
          <div
            className="hover:cursor-pointerbg-navy-800 mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-cyan-300 bg-lightPrimary text-white"
            style={{ backgroundColor: '#67e8f9' }}
          >
            <div className="rounded-full border-white text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 text-white">
              Sign Up with Google
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <div className="h-px w-full !bg-navy-700 bg-gray-200" />
            <div className="h-px w-full !bg-navy-700 bg-gray-200" />
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Name */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Name*"
              placeholder="name"
              id="name"
              type="text"
              name="name"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={NameRegex}
            />

            <ErrorMessage errors={errors} name="name" />
            {/* Email */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Email*"
              placeholder="mail@simmmple.com"
              id="email"
              type="text"
              name="email"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={EmailRegex}
            />
            <ErrorMessage errors={errors} name="email" />
            {/* Password */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Password*"
              placeholder="password"
              id="password"
              type="password"
              name="password"
              register={register}
              maxLength={50}
              minLength={6}
              pattern={PasswordRegex}
            />
            <ErrorMessage errors={errors} name="password" />

            {/* Phone Number */}
            <InputField
              variant="auth"
              extra="mb-3"
              label="Phone*"
              placeholder="phone number"
              id="phone"
              type="text"
              name="phone"
              register={register}
              maxLength={11}
              minLength={0}
              pattern={Phone_NumberRegex}
            />
            <ErrorMessage errors={errors} name="phone" />
            <button
              className="linear w-full rounded-xl bg-cyan-300 py-3 text-base font-medium text-white text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:hover:bg-brand-300 dark:active:bg-brand-200"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <span className="text-white-700 text-sm font-medium">
              Already have a account ?
            </span>
            <a
              href="/auth/sign-in"
              className="ml-1 text-sm font-bold text-cyan-300 hover:text-brand-600"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInDefault;
