import routes from "@/routes";
import Link from "next/link";

export default function SignUpForm() {
    return (
        <form action="auth-signup-success.html" className="text-start">
            <div className="grid grid-cols-1">
                <div className="mb-4">
                    <label className="font-semibold" htmlFor="RegisterName">
                        Your Name:
                    </label>
                    <input
                        id="RegisterName"
                        type="text"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Harry"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginEmail">
                        Email Address:
                    </label>
                    <input
                        id="LoginEmail"
                        type="email"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="name@example.com"
                    />
                </div>
                <div className="mb-4">
                    <label className="font-semibold" htmlFor="LoginPassword">
                        Password:
                    </label>
                    <input
                        id="LoginPassword"
                        type="password"
                        className="form-input mt-3 w-full py-2 px-3 h-10 bg-transparent dark:bg-slate-900 dark:text-slate-200 rounded outline-none border border-gray-200 focus:border-indigo-600 dark:border-gray-800 dark:focus:border-indigo-600 focus:ring-0"
                        placeholder="Password:"
                    />
                </div>
                <div className="mb-4">
                    <div className="flex items-center w-full mb-0">
                        <input
                            className="form-checkbox rounded border-gray-200 dark:border-gray-800 text-indigo-600 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50 me-2"
                            type="checkbox"
                            defaultValue=""
                            id="AcceptT&C"
                        />
                        <label className="form-check-label text-slate-400" htmlFor="AcceptT&C">
                            I Accept{" "}
                            <a href="" className="text-indigo-600">
                                Terms And Condition
                            </a>
                        </label>
                    </div>
                </div>
                <div className="mb-4">
                    <input
                        type="submit"
                        className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md w-full"
                        defaultValue="Register"
                    />
                </div>
                <div className="text-center">
                    <span className="text-slate-400 me-2">Đã có tài khoản? </span>{" "}
                    <Link
                        href={routes.login}
                        className="text-black dark:text-white font-bold inline-block"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </form>
    )
}