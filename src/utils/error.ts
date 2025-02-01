import { MangadexApi } from "@/api";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

export class ErrorHandlerUtils {
  handleError = (error: any, message?: string) => {
    console.error(error);
    if (isAxiosError(error) && error.status === 409) {
      toast.error("Vui lòng xác thực email trước khi sử dụng chức năng này");
      return;
    }
    if (message) {
      toast.error(message);
      return;
    }
    message = "Đã có lỗi xảy ra";
    if (isAxiosError(error)) {
      message = error.response?.data.message || error.message;
    }
    if (error instanceof MangadexApi.Utils.MangaDexError) {
      message = "Đã có lỗi xảy ra khi tải dữ liệu từ MangaDex";
    }
    if (typeof error === "string") {
      message = error;
    }
    toast.error(message);
  };
}
