import Iconify from "@/components/iconify";
import LogoutButton from "@/sections/main/auth/logout-button";

export default function VerifyEmailPage() {

    return (
        <div>
            <section className="relative h-screen flex justify-center items-center bg-slate-50 dark:bg-slate-800">
                <div className="container relative">
                    <div className="md:flex justify-center">
                        <div className="lg:w-2/5">
                            <div className="relative overflow-hidden rounded-md bg-white dark:bg-slate-900 shadow dark:shadow-gray-700">
                                <div className="px-6 py-12 bg-emerald-600 text-center">
                                    <Iconify className="text-white text-8xl mx-auto" icon="uil:check-circle" />
                                    <h5 className="text-white text-xl tracking-wide uppercase font-semibold mt-2">
                                        Đăng ký thành công
                                    </h5>
                                </div>
                                <div className="px-6 py-12 text-center">
                                    <p className="text-black font-semibold text-xl dark:text-white">
                                        Chúc mừng! 🎉
                                    </p>
                                    <p className="text-slate-400 mt-4">
                                        Tài khoản của bạn đã được tạo thành công <br /> Vui lòng kiểm tra email (cả mục spam) để xác thực email và tiếp tục sử dụng TruyenDex!
                                    </p>
                                    <LogoutButton />
                                </div>
                                <div className="text-center p-6 border-t border-gray-100 dark:border-gray-700">
                                    <p className="mb-0 text-slate-400">
                                        © TruyenDex
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/*end container*/}
            </section>
        </div>
    )
}