import { Suspense } from "react";
import ForgotPasswordForm from "@/components/core/auth/forgot-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  );
}
