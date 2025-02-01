import { Suspense } from "react";
import ResetPasswordForm from "@/components/core/auth/reset-password-form";

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
