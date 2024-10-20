"use client"

import { useAuth } from "@/hooks/useAuth"

export default function LogoutButton() {
    const { logout } = useAuth({ middleware: 'auth' })

    return (
        <div className="mt-6">
            <button
                onClick={logout}
                className="py-2 px-5 inline-block tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigobg-indigo-700 text-white rounded-md"
            >
                Đăng xuất
            </button>
        </div>
    )
}