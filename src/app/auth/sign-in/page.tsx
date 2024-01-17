"use client";
import InputField from "../../../components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "../../../components/checkbox";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

function SignInDefault() {
  const { push } = useRouter();
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isPassInvalid, seIsPassInvalid] = useState<boolean>(false);
  const [invalidUser, setInvalidUser] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    {
      email: "",
      password: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value }: { name: string; value: string } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      console.log(res);
      if (res?.status != 200) {
        seIsPassInvalid(true);
        setInvalidUser(true);
        console.log("Wrong user or password");
      } else {
        setIsLogged(true);
      }
    } catch (error) {
      console.log("signIn had an error", error);
    }
  };
  useEffect(() => {
    if (isPassInvalid) {
      setTimeout(() => {
        seIsPassInvalid(false);
      }, 1400);
    }
    if (invalidUser) {
      setTimeout(() => {
        setInvalidUser(false);
      }, 1400);
    }
    if (isLogged) {
      setTimeout(() => {
        push("/admin");
      }, 1400);
    }
  }, [isPassInvalid, invalidUser, isLogged]);
  return (
    <div className="mt-[20vh] py-7 px-16 border-white rounded-2xl border-slate-600 bg-slate-600">
      <div className="flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
        {/* Sign in section */}
        <div className="w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
          <h3 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
            Sign In
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
          {/* Email */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Email*"
            placeholder="mail@simmmple.com"
            id="email"
            type="text"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

          {/* Password */}
          <InputField
            variant="auth"
            extra="mb-3"
            label="Password*"
            placeholder="Min. 8 characters"
            id="password"
            type="password"
            name="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          {/* Checkbox */}
          <div className="mb-4 flex items-center justify-between px-2">
            <div className="mt-2 flex items-center">
              <Checkbox color="cyan" />
              <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
                Keep me logged In
              </p>
            </div>
            <a
              className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-cyan"
              href=" "
            >
              Forgot Password?
            </a>
          </div>
          <button
            className="linear w-full rounded-xl bg-brand-500 py-3 text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200 bg-cyan-300"
            onClick={(e: any) => onSubmit(e)}
          >
            Sign In
          </button>
          <div className="mt-4">
            <span className="text-sm font-medium text-navy-700 dark:text-white-500">
              Not registered yet?
            </span>
            <a
              href="/auth/sign-up/default"
              className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-cyan"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignInDefault;
