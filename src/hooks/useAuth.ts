import useSWR from 'swr'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'
import { isAxiosError } from 'axios'

import { axios } from '@/api/app'
import routes from '@/routes'

export const useAuth = ({ middleware, redirectIfAuthenticated }: { middleware?: string, redirectIfAuthenticated?: string }) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', async () => {
        try {
            const { data } = await axios.get("/api/user")
            if (!data.email_verified_at) {
                router.push(routes.verifyEmail)
            }
            return data
        } catch (error) {
            if (isAxiosError(error)) {
                if (error.status === 409) {
                    router.push(routes.verifyEmail)
                }
            }
            return null
        }
    }

    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const signup = async ({ ...props }: { email: string, password: string, name: string, password_confirmation: string }) => {
        await csrf()

        await axios.post('/register', props)

        await mutate()

    }

    const login = async ({ ...props }: { email: string, password: string, shouldRemember: boolean }) => {
        await csrf()

        await axios({
            method: "POST",
            url: "/login",
            data: props,
        })

        await mutate()
    }

    const forgotPassword = async ({ email }: { email: string }) => {
        await csrf()

        axios
            .post('/forgot-password', { email })
            .catch(error => {
                if (error.response.status !== 422) throw error

            })
    }

    const resetPassword = async ({ ...props }) => {
        await csrf()

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error


            })
    }

    const resendEmailVerification = () => {
        axios
            .post('/email/verification-notification')
    }

    const logout = async () => {
        await axios.post('/logout')

        toast("Đăng xuất thành công")

        await mutate()
    }

    useEffect(() => {
        console.log(middleware, user, window.location.pathname)
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            toast("Đã đăng nhập, chuyển hướng...")
            if (user.email_verified_at)
                router.push(redirectIfAuthenticated);
            else router.push(routes.verifyEmail);
        }

        if (middleware === 'auth' && user && !user.email_verified_at)
            router.push(routes.verifyEmail)

        if (
            window.location.pathname === routes.verifyEmail &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated || routes.nettrom.index)

        if (window.location.pathname === routes.verifyEmail && !user) {
            router.push("/")
        }
        if (middleware === 'auth' && error) logout()
    }, [user, error, middleware])

    return {
        user,
        signup,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
