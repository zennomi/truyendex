import useSWR from "swr";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
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
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR("/api/user", async () => {
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
  }) => {
    await csrf();

    await axios({
      method: "POST",
      url: "/login",
      data: props,
    });

    await mutate();
  };

  const forgotPassword = async ({ email }: { email: string }) => {
    await csrf();

    axios.post("/forgot-password", { email }).catch((error) => {
      if (error.response.status !== 422) throw error;
    });
  };

  const resetPassword = async ({ ...props }) => {
    await csrf();

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response) =>
        router.push("/login?reset=" + btoa(response.data.status)),
      )
      .catch((error) => {
        if (error.response.status !== 422) throw error;
      });
  };

  const resendEmailVerification = () => {
    axios.post("/email/verification-notification");
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
