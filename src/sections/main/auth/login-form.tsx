"use client"

import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import routes from "@/routes";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "react-toastify";

// Define the form input types
interface ILoginForm {
    email: string;
    password: string;
    shouldRemember: boolean;
}

// Define the validation schema using yup
const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    shouldRemember: yup.boolean().default(true),
});

export default function LoginForm() {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: routes.nettrom.index,
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema),
    });

    const onSubmit: SubmitHandler<ILoginForm> = async (data) => {
        try {
            await login(data);
        } catch (error) {
            console.error(error)
            toast("Sai email hoặc mật khẩu!", { type: "error" })
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
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="name@example.com"
                        {...register("email")}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="font-semibold " htmlFor="LoginPassword">
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
                <div className="flex justify-between mb-4">
                    <div className="flex items-center mb-0">
                        <input
                            className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2"
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
                    <p className="text-slate-400 mb-0">
                        <a href="auth-re-password.html" className="text-slate-400">
                            Quên mật khẩu?
                        </a>
                    </p>
                </div>
                <div className="mb-4">
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                    >
                        {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"}
                    </button>
                </div>
                <div className="text-center">
                    <span className="text-slate-400 me-2">
                        Chưa có tài khoản?
                    </span>{" "}
                    <Link
                        href={routes.signup}
                        className="text-black dark:text-white font-bold inline-block"
                    >
                        Đăng ký ngay
                    </Link>
                </div>
            </div>
        </form>
    )
}