import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { toast } from "react-toastify";

import Iconify from "@/components/iconify";
import { Utils } from "@/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { AppApi } from "@/api";
import { useAuth } from "@/hooks/useAuth";

const changePasswordSchema = yup.object().shape({
  name: yup
    .string()
    .required("Vui lòng nhập tên")
    .min(6, "Tên ít nhất 6 ký tự")
    .max(25, "Tên không quá 25 ký tự"),
});

interface IChangePasswordForm {
  name: string;
}

export default function UsernameUpdate() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IChangePasswordForm>({
    resolver: yupResolver(changePasswordSchema),
  });

  const { mutate } = useAuth();

  const onSubmit: SubmitHandler<IChangePasswordForm> = async (data) => {
    try {
      await AppApi.User.changeName({
        name: data.name,
      });
      await mutate();
      toast.success("Đã cập nhật tên mới");
    } catch (error) {
      Utils.Error.handleError(error);
    }
  };

  return (
    <div className="mt-5 rounded-md bg-white p-6 shadow dark:bg-slate-900 dark:shadow-gray-800">
      <h6 className="mb-4 text-lg font-semibold">Đổi tên người dùng</h6>
      <div>
        <label className="form-label font-medium">
          Tên mới : <span className="text-red-600">*</span>
        </label>
        <div className="form-icon relative my-2">
          <Iconify
            icon="feather:user"
            className="absolute start-4 top-3 size-4"
          />
          <input
            type="text"
            className="form-input h-10 w-full rounded border border-gray-200 bg-transparent px-3 py-2 ps-12 outline-none focus:border-indigo-600 focus:ring-0 dark:border-gray-800 dark:bg-slate-900 dark:text-slate-200 dark:focus:border-indigo-600"
            placeholder="Tên mới"
            id="name"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="mt-2 text-red-600">{errors.name.message}</p>
        )}

        <button
          disabled={isSubmitting}
          onClick={handleSubmit(onSubmit)}
          className="mt-5 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          {isSubmitting ? "Đang cập nhật" : "Lưu"}
        </button>
      </div>
    </div>
  );
}
