import { Suspense } from "react";
import LoginForm from "@/sections/main/auth/login-form";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
