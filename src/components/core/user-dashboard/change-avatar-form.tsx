import { AppApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";
import { Utils } from "@/utils";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AvatarUpload() {
  const { mutate } = useAuth();
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        setError("Kích thước ảnh phải nhỏ hơn 1MB.");
        setImage(null);
        setPreview(null);
        return;
      }
      setError("");
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    try {
      await AppApi.User.changeAvatar(image);
      toast.success("Đổi ảnh đại diện thành công.");
      await mutate();
    } catch (error) {
      Utils.Error.handleError(error);
    }
  };

  return (
    <div className="mt-5 rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
      <h6 className="mb-4 text-lg font-semibold">Đổi ảnh đại diện</h6>
      <div>
        <label className="form-label font-medium" htmlFor="avatar_url">
          Tải ảnh : <span className="text-red-600">*</span>
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full rounded border border-gray-300 p-2"
        />
        {error && <p className="mt-2 text-red-600">{error}</p>}
        {preview && (
          <img src={preview} className="mt-2 h-20 w-20 rounded" alt="" />
        )}
        <button
          disabled={!image}
          onClick={handleUpload}
          className="mt-5 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          Lưu
        </button>
      </div>
      <div className="mt-5">
        <div className="font-bold">Chú ý:</div>
        <ul>
          <li>- Kích thước ảnh phải nhỏ hơn 1MB.</li>
          <li>- Để ảnh nhạy cảm sẽ bị ban vĩnh viễn.</li>
        </ul>
      </div>
    </div>
  );
}
