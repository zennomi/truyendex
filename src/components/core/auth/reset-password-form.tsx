"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";

// Define the form input types
interface ISignupForm {
  email: string;
  password: string;
  confirmPassword: string;
}

// Define the validation schema using yup
const signupSchema = yup.object().shape({
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
});

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth({
    middleware: "guest",
  });
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ISignupForm>({
    resolver: yupResolver(signupSchema),
    defaultValues: {
      email: searchParams.get("email") || "",
    },
  });

  const onSubmit: SubmitHandler<ISignupForm> = async (data) => {
    try {
      await resetPassword({
        ...data,
        password_confirmation: data.confirmPassword,
        token: searchParams.get("token") || "",
      });
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
          <button
            type="submit"
            className="inline-block w-full rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi yêu cầu..." : "Đổi mật khẩu"}
          </button>
        </div>
        <div className="text-center">
          <span className="me-2 text-slate-400">Đã nhớ mật khẩu? </span>{" "}
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
