import { useState } from "react";
import { toast } from "react-toastify";

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
          Tải ảnh : <span className="text-red-600">*</span>
        </label>
        <div className="text-gray-500">Sẽ có trong phiên bản tới...</div>
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
          disabled={true}
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
