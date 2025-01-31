"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";
import TurnstileWidget from "@/components/turnstile-widget";

// Define the form input types
interface ILoginForm {
  email: string;
  password: string;
  shouldRemember: boolean;
  "cf-turnstile-response": string;
}

// Define the validation schema using yup
const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email không hợp lệ")
    .required("Vui lòng điền email"),
  password: yup
    .string()
    .min(6, "Mật khẩu ít nhất 6 ký tự")
    .required("Vui lòng điền mật khẩu"),
  shouldRemember: yup.boolean().default(true),
  "cf-turnstile-response": yup
    .string()
    .required("Vui lòng xác minh bạn không phải robot"),
});

export default function LoginForm() {
  const searchParams = useSearchParams();

  const { login } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated:
      searchParams.get("redirectUrl") || Constants.Routes.nettrom.index,
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error(error);
      toast("Sai email hoặc mật khẩu!", { type: "error" });
    }
  };

  return (
    <form className="text-start" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1">
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
        <div className="mb-4 flex justify-between">
          <TurnstileWidget
            onVerify={(token) => setValue("cf-turnstile-response", token)}
          />
          {errors["cf-turnstile-response"] && (
            <p>{errors["cf-turnstile-response"].message}</p>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <div className="mb-0 flex items-center">
            <input
              className="form-checkbox me-2 rounded border-gray-200 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 focus:ring-offset-0 dark:border-gray-800"
              type="checkbox"
              id="RememberMe"
              {...register("shouldRemember")}
            />
            <label
              className="form-checkbox-label text-slate-400"
              htmlFor="RememberMe"
            >
              Tự động đăng nhập
            </label>
          </div>
          <p className="mb-0 text-slate-400">
            <Link
              href={Constants.Routes.forgotPassword}
              className="text-slate-400"
            >
              Quên mật khẩu?
            </Link>
          </p>
        </div>
        <div className="mb-4">
          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-block w-full rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
          >
            {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </div>
        <div className="text-center">
          <span className="me-2 text-slate-400">Chưa có tài khoản?</span>{" "}
          <Link
            href={Constants.Routes.signup}
            className="inline-block font-bold text-black dark:text-white"
          >
            Đăng ký ngay
          </Link>
        </div>
      </div>
    </form>
  );
}
