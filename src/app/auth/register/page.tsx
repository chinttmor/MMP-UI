"use client";
import InputField from "../../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../../../components/checkbox";
import {
  FieldErrors,
  FieldValues,
  SubmitErrorHandler,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { NameRegex } from "@/constants/Regex/name.regex";
import { EmailRegex } from "@/constants/Regex/email.regex";
import { PasswordRegex } from "@/constants/Regex/password.regex";
import { Phone_NumberRegex } from "@/constants/Regex/phone-number.regex";
import { toast } from "react-toastify";
import axios from "axios";
import { NextResponse } from "next/server";
import { ErrorMessage } from "@hookform/error-message";
// import { RegisterForm } from "@/type/registerform.type";

function SignUpDefault() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
          phone: data.phone,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return toast.success(`Data input is ok , sign in with your new account`);
    } catch {
      return toast.error(`Unknow errors`);
    }
  };

  return (
    <div className="flex mt-[20vh] w-full items-center justify-center py-7 px-16 border-white rounded-2xl border-slate-600 bg-slate-600">
      <div className="flex h-full w-full mb-[3vh] items-center justify-center px-2 ">
        {/* Sign in section */}
        <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign Up
          </h3>
          <p className="mb-9 ml-1 text-base text-gray-600">
            Enter your email and password to sign in!
          </p>
          <div className="mb-6 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl bg-lightPrimary hover:cursor-pointer dark:bg-navy-800 dark:text-white bg-cyan-300">
            <div className="border-white rounded-full text-xl">
              <FcGoogle />
            </div>
            <p className="text-sm font-medium text-navy-700 dark:text-white">
              Sign In with Google
            </p>
          </div>
          <div className="mb-6 flex items-center">
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
            <div className="h-px w-full bg-gray-200 dark:!bg-navy-700" />
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
              className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 bg-cyan-300"
              type="submit"
            >
              Sign In
            </button>
          </form>
          <div className="mt-4">
            <span className="text-sm font-medium text-navy-700 dark:text-white-500">
              Already have a account ?
            </span>
            <a
              href="/auth/sign-in"
              className="ml-1 text-sm font-bold text-brand-500 hover:text-brand-600 dark:text-white"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUpDefault;
