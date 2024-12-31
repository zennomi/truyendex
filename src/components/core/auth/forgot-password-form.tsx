"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";
import Link from "next/link";
import { isAxiosError } from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/hooks/useAuth";
import { Constants } from "@/constants";

interface IForgotPasswordForm {
  email: string;
}

// Define the validation schema using yup
const resetPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Không đúng định dạng email")
    .required("Vui lòng điền email"),
});

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth({ middleware: "guest" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IForgotPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const onSubmit: SubmitHandler<IForgotPasswordForm> = async (data) => {
    try {
      await forgotPassword(data);
      toast("Gửi yêu cầu thành công! Vui lòng kiểm tra mail của bạn!");
    } catch (error) {
      let message = "Đã có lỗi xảy ra";
      if (isAxiosError(error)) {
        message = error.response?.data.message || message;
      }
      toast(message, { type: "error" });
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
          <input
            disabled={isSubmitting}
            type="submit"
            className="inline-block w-full rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
            value="Gửi"
          />
        </div>

        <div className="text-center">
          <span className="me-2 text-slate-400">Lại nhớ password rồi hử?</span>
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
