"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import TurnstileWidget from "@/components/turnstile-widget";
import { Utils } from "@/utils";
import Iconify from "@/components/iconify";

// Define the form input types
interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  "cf-turnstile-response": string;
}

// Define the validation schema using yup
const signupSchema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên"),
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
  acceptTerms: yup
    .boolean()
    .oneOf([true], "Đồng ý điều khoản giùm")
    .required("Đồng ý điều khoản giùm"),
  "cf-turnstile-response": yup
    .string()
    .required("Vui lòng xác minh bạn không phải robot"),
});

export default function SignUpForm() {
  const { signup } = useAuth({
    middleware: "guest",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      await signup({ ...data, password_confirmation: data.confirmPassword });
    } catch (error) {
      console.error(error);
      let message = "Đã có lỗi xảy ra";
      if (isAxiosError(error)) {
        message = error.response?.data.message || message;
      }
      toast(message, { type: "error" });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-start">
      <div className="grid grid-cols-1">
        <div className="my-4">
          <Link
            href={Utils.Url.getGoogleAuthUrl()}
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
          >
            <Iconify icon="devicon-plain:google" />
            Đăng ký với Google
          </Link>
        </div>
        <div className="text-white-400 text-center">Hoặc đăng ký thủ công:</div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="RegisterName">
            Tên:
          </label>
          <input
            id="RegisterName"
            type="text"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="Zennomi"
            {...register("name")}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginEmail">
            Email:
          </label>
          <input
            id="LoginEmail"
            type="email"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="name@example.com"
            {...register("email")}
          />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">
            Mật khẩu:
          </label>
          <input
            id="LoginPassword"
            type="password"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="******"
            {...register("password")}
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label className="font-semibold" htmlFor="LoginPassword">
            Nhập lại mật khẩu:
          </label>
          <input
            id="LoginPassword"
            type="password"
            className="form-input mt-3 h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder=""
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="mb-4">
          <div className="mb-0 flex w-full items-center">
            <input
              className="form-checkbox me-2 rounded border-gray-200 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 dark:border-gray-800"
              type="checkbox"
              defaultValue=""
              id="AcceptT&C"
              {...register("acceptTerms")}
            />
            <label
              className="form-check-label text-slate-400"
              htmlFor="AcceptT&C"
            >
              Đồng ý với{" "}
              <a href="#" className="text-indigo-600">
                điều khoản của TruyenDex
              </a>
            </label>
          </div>
        </div>
        <div className="mb-4">
          <TurnstileWidget
            onVerify={(token) => setValue("cf-turnstile-response", token)}
          />
          {errors["cf-turnstile-response"] && (
            <p>{errors["cf-turnstile-response"].message}</p>
          )}
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="inline-block w-full rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>

        <div className="text-center">
          <span className="me-2 text-slate-400">Đã có tài khoản? </span>{" "}
          <Link
            href={Constants.Routes.login}
            className="inline-block font-bold text-black dark:text-white"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  );
}
