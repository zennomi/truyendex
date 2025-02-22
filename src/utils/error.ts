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
      if (error.status === 429) {
        message = `Gửi quá nhiều yêu cầu đến MangaDex, vui lòng thử lại sau ${error.response?.headers["retry-after"] || 60} giây`;
      } else message = "Đã có lỗi xảy ra khi tải dữ liệu từ MangaDex";
    }
    if (typeof error === "string") {
      message = error;
    }
    toast.error(message);
  };
}
