"use client";

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

import routes from "@/routes";
import { useAuth } from "@/hooks/useAuth";

// Define the form input types
interface ISignupForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
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
});

export default function SignUpForm() {
  const { signup } = useAuth({
    middleware: "guest",
  });

  const {
    register,
    handleSubmit,
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
        <div className="mb-4">
          <label className="font-semibold" htmlFor="RegisterName">
            Tên:
          </label>
          <input
            id="RegisterName"
            type="text"
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
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
            className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
            placeholder=""
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
        </div>
        <div className="mb-4">
          <div className="flex items-center w-full mb-0">
            <input
              className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2"
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
          <button
            type="submit"
            className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
          </button>
        </div>
        <div className="text-center">
          <span className="text-slate-400 me-2">Đã có tài khoản? </span>{" "}
          <Link
            href={routes.login}
            className="text-black dark:text-white font-bold inline-block"
          >
            Đăng nhập
          </Link>
        </div>
      </div>
    </form>
  );
}
