import useSWR from 'swr'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useParams, useRouter } from 'next/navigation'

import { axios } from '@/api/app'
import routes from '@/routes'

export const useAuth = ({ middleware, redirectIfAuthenticated }: { middleware?: string, redirectIfAuthenticated?: string }) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', async () => {
        try {
            const { data } = await axios.get("/api/user")
            return data
        } catch (error) {
            return null
        }
    }

    )

    const csrf = () => axios.get('/sanctum/csrf-cookie')

    const register = async ({ ...props }) => {
        await csrf()

        axios
            .post('/register', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response.status !== 422) throw error
            })
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

        console.log("Hello")

        toast("Đăng xuất thành công")

        await mutate()
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user) {
            toast("Đã đăng nhập, chuyển hướng...")
            router.push(redirectIfAuthenticated)
        }

        if (middleware === 'auth' && !user?.email_verified_at)
            router.push('/verify-email')

        if (
            window.location.pathname === '/verify-email' &&
            user?.email_verified_at
        )
            router.push(redirectIfAuthenticated || routes.nettrom.index)
        if (middleware === 'auth' && error) logout()
    }, [user, error])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
