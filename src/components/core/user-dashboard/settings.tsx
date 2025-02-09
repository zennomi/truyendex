"use client";

import { useState } from "react";
import * as yup from "yup";
import { toast } from "react-toastify";
import Link from "next/link";

import Iconify from "@/components/iconify";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Utils } from "@/utils";
import { useAuth } from "@/hooks/useAuth";

export default function UserSettingsView() {
  return (
    <div>
      <PasswordUpdate />
      <AvatarUpdate />
    </div>
  );
}

const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .required("Vui lòng nhập mật khẩu cũ"),
  password: yup
    .string()
    .min(8, "Mật khẩu ít nhất 8 ký tự")
    .notOneOf(
      [yup.ref("oldPassword")],
      "Mật khẩu mới không được trùng với mật khẩu cũ",
    )
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Nhập lại mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

interface IChangePasswordForm {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

function PasswordUpdate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });

  const { changePassword } = useAuth();

  const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
    try {
      await changePassword({
        ...data,
      });
      toast.success("Đã cập nhật mật khẩu, bạn cần đăng nhập lại");
    } catch (error) {
      Utils.Error.handleError(error);
    }
  };

  return (
    <div className="mt-5 rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
      <h6 className="mb-4 text-lg font-semibold">Đổi mật khẩu</h6>
      <div>
        <label className="form-label font-medium">
          Mật khẩu cũ : <span className="text-red-600">*</span>
        </label>
        <div className="form-icon relative mt-2">
          <Iconify
            icon="feather:key"
            className="absolute start-4 top-3 size-4"
          />
          <input
            type="password"
            className="form-input h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 ps-12 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="Mật khẩu cũ"
            id="old-password"
            {...register("oldPassword")}
          />
        </div>
        {errors.oldPassword && (
          <p className="mt-2 text-red-600">{errors.oldPassword.message}</p>
        )}
        <label className="form-label mt-4 font-medium">
          Mật khẩu mới : <span className="text-red-600">*</span>
        </label>
        <div className="form-icon relative mt-2">
          <Iconify
            icon="feather:key"
            className="absolute start-4 top-3 size-4"
          />
          <input
            type="password"
            className="form-input h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 ps-12 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="Mật khẩu mới"
            id="new-password"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="mt-2 text-red-600">{errors.password.message}</p>
        )}
        <label className="form-label mt-4 font-medium">
          Xác nhận mật khẩu mới : <span className="text-red-600">*</span>
        </label>
        <div className="form-icon relative mt-2">
          <Iconify
            icon="feather:key"
            className="absolute start-4 top-3 size-4"
          />
          <input
            type="password"
            className="form-input h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 ps-12 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="Xác nhận mật khẩu mới"
            id="confirm-password"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="mt-2 text-red-600">{errors.confirmPassword.message}</p>
        )}
        <button
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="mt-5 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          {isSubmitting ? "Đang cập nhật mật khẩu" : "Lưu"}
        </button>
      </div>
    </div>
  );
}

function AvatarUpdate() {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const handleCheck = async () => {
    const result = await isValidImage(url);
    setIsValid(result);
    if (result) toast.success("Đã cập nhật ảnh đại diện");
  };
  return (
    <div className="mt-5 rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
      <h6 className="mb-4 text-lg font-semibold">Đổi ảnh đại diện</h6>
      <div>
        <label className="form-label font-medium" htmlFor="avatar_url">
          Link ảnh : <span className="text-red-600">*</span>
        </label>
        <div className="form-icon relative mt-2">
          <Iconify
            icon="feather:image"
            className="absolute start-4 top-3 size-4"
          />
          <input
            type="text"
            className="form-input h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 ps-12 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="https://i.imgur.com/..."
            id="avatar_url"
            name="url"
            onChange={(e) => {
              setUrl(e.target.value);
              setIsValid(null);
            }}
            value={url}
            autoComplete="off"
          />
        </div>
        {isValid === false && (
          <p className="mt-2 text-red-600">Link ảnh không hợp lệ</p>
        )}
        {url && (
          <img
            src={url}
            className="mt-2 h-20 w-20 rounded"
            alt="Ảnh không hợp lệ"
          />
        )}
        <button
          onClick={handleCheck}
          className="mt-5 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          Lưu
        </button>
      </div>
      <div className="mt-5">
        <div className="font-bold">Chú ý:</div>
        <ul>
          <li>- Kích thước ảnh phải nhỏ hơn 500KB.</li>
          <li>- Link ảnh phải là link trực tiếp dẫn đến ảnh.</li>
          <li>
            - Có thể lấy link ảnh từ{" "}
            <Link
              className="text-indigo-600 underline"
              href="https://imgur.com"
              target="_blank"
            >
              imgur (không cần đăng nhập)
            </Link>
            ,{" "}
            <Link
              className="text-indigo-600 underline"
              href="https://jpg5.su"
              target="_blank"
            >
              jpg5.su (cần đăng nhập)
            </Link>
            ,...
          </li>
        </ul>
      </div>
    </div>
  );
}

const isValidImage = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });

    if (!response.ok) return false;

    const contentType = response.headers.get("content-type");
    const contentLength = response.headers.get("content-length");

    if (!contentType || !contentType.startsWith("image/")) return false;

    const fileSize = contentLength ? parseInt(contentLength, 10) : Infinity;
    return fileSize <= 500 * 1024; // 500KB
  } catch {
    return false;
  }
};
