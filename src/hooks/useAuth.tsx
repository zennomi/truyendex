import useSWR from "swr";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";

import { axios } from "@/api/core";
import { GetUserResponse } from "@/types";
import { Constants } from "@/constants";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
  redirectIfNotAuthenticated,
}: {
  middleware?: string;
  redirectIfAuthenticated?: string;
  redirectIfNotAuthenticated?: string;
} = {}) => {
  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", async () => {
    if (!Constants.BACKEND_URL) {
      return null;
    }
    try {
      const { data } = await axios.get<GetUserResponse>("/api/user");
      if (!data.email_verified_at) {
        router.push(Constants.Routes.verifyEmail);
      }
      return data;
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.status === 409) {
          router.push(Constants.Routes.verifyEmail);
        }
      }
    }
    return null;
  });

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const signup = async ({
    ...props
  }: {
    email: string;
    password: string;
    name: string;
    password_confirmation: string;
    "cf-turnstile-response": string;
  }) => {
    await csrf();

    await axios.post("/register", props);

    await mutate();
  };

  const login = async ({
    ...props
  }: {
    email: string;
    password: string;
    shouldRemember: boolean;
    "cf-turnstile-response": string;
  }) => {
    await csrf();

    await axios({
      method: "POST",
      url: "/login",
      data: props,
    });

    await mutate();
  };

  const forgotPassword = async (data: {
    email: string;
    "cf-turnstile-response": string;
  }) => {
    await csrf();

    try {
      await axios.post("/forgot-password", data);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async ({
    ...props
  }: {
    email: string;
    password: string;
    password_confirmation: string;
    token: string;
  }) => {
    await csrf();

    await axios.post("/reset-password", { ...props });

    router.push(Constants.Routes.login);
  };

  const resendEmailVerification = async () => {
    await axios.post("/email/verification-notification");
  };

  const logout = useCallback(async () => {
    await axios.post("/logout");

    toast("Đăng xuất thành công");

    await mutate();
  }, [mutate]);

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user) {
      toast("Đã đăng nhập, chuyển hướng...");
      if (user.email_verified_at) router.push(redirectIfAuthenticated);
      else router.push(Constants.Routes.verifyEmail);
    }

    if (middleware === "auth" && user && !user.email_verified_at)
      router.push(Constants.Routes.verifyEmail);

    if (
      window.location.pathname === Constants.Routes.verifyEmail &&
      user?.email_verified_at
    )
      router.push(redirectIfAuthenticated || Constants.Routes.nettrom.index);

    if (window.location.pathname === Constants.Routes.verifyEmail && !user) {
      router.push("/");
    }

    if (middleware === "auth" && redirectIfNotAuthenticated && user === null) {
      router.push(redirectIfNotAuthenticated);
    }
    if (middleware === "auth" && error) logout();
  }, [
    user,
    error,
    middleware,
    logout,
    redirectIfAuthenticated,
    redirectIfNotAuthenticated,
    router,
  ]);

  return {
    user,
    signup,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
