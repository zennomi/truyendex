"use client";

import { useAuth } from "@/hooks/useAuth";
import { Alert } from "./Alert";
import Link from "next/link";
import { Constants } from "@/constants";
import { Button } from "./Button";

export default function VerifyMailAlert() {
  const { user } = useAuth();
  if (!user || user.email_verified_at) return null;
  return (
    <div className="container my-2">
      <Alert
        classNames={{
          alert: "[&>svg]:text-red-500 text-red-500 bg-red-100",
        }}
        title="Xác nhận email để sử dụng đầy đủ chức năng."
        description="Lưu ý: Dùng TRÌNH DUYỆT HIỆN TẠI để mở email và nhấn vào liên kết xác nhận."
        action={
          <Link
            className="no-underline hover:no-underline"
            href={Constants.Routes.verifyEmail}
          >
            <Button className="bg-red-500 hover:bg-red-600">
              Chưa nhận được mail?
            </Button>
          </Link>
        }
      />
    </div>
  );
}
