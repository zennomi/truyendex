import { Link } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import Iconify from "@/components/iconify";

export default function AvatarUpdate() {
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
