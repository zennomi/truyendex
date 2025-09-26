import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Điều khoản Dịch vụ - TruyenDex",
  description: "Điều khoản và điều kiện sử dụng dịch vụ TruyenDex",
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="rounded-lg bg-white p-8 shadow-lg">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Điều khoản Dịch vụ
          </h1>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                1. Giới thiệu
              </h2>
              <p className="leading-relaxed text-gray-700">
                Chào mừng bạn đến với TruyenDex. Bằng việc truy cập và sử dụng
                dịch vụ của chúng tôi, bạn đồng ý tuân thủ các điều khoản và
                điều kiện được nêu dưới đây. Nếu bạn không đồng ý với bất kỳ
                điều khoản nào, vui lòng không sử dụng dịch vụ của chúng tôi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                2. Sử dụng Dữ liệu từ MangaDex API
              </h2>
              <div className="mb-4 border-l-4 border-blue-400 bg-blue-50 p-4">
                <p className="font-medium text-blue-800">
                  TruyenDex tuân thủ đầy đủ Chính sách Sử dụng của MangaDex
                </p>
              </div>
              <p className="mb-4 leading-relaxed text-gray-700">
                TruyenDex sử dụng proxy để truy xuất dữ liệu từ MangaDex API một
                cách hợp pháp và tuân thủ các quy định của MangaDex. Chúng tôi
                cam kết:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>Không gắn quảng cáo trong website</li>
                <li>Ghi nguồn nhóm dịch đầy đủ và chính xác</li>
                <li>Tôn trọng quyền tự quyết sản phẩm của nhóm dịch</li>
                <li>Không kiếm lợi nhuận từ việc sử dụng API</li>
                <li>Tuân thủ tất cả các yêu cầu khác của MangaDex</li>
              </ul>
              <p className="leading-relaxed text-gray-700">
                Để biết thêm chi tiết về chính sách sử dụng API của MangaDex,
                vui lòng tham khảo tài liệu chính thức tại{" "}
                <a
                  href="https://api.mangadex.org/docs/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://api.mangadex.org/docs/
                </a>
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                3. Miễn trừ Trách nhiệm về Nội dung
              </h2>
              <div className="mb-4 border-l-4 border-yellow-400 bg-yellow-50 p-4">
                <p className="font-medium text-yellow-800">
                  TruyenDex không chịu trách nhiệm về nội dung từ MangaDex
                </p>
              </div>
              <p className="mb-4 leading-relaxed text-gray-700">
                TruyenDex chỉ đóng vai trò là cầu nối giữa người dùng và nội
                dung được phân phối bởi MangaDex. Chúng tôi:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>
                  Không kiểm soát, chỉnh sửa hoặc xác minh nội dung từ MangaDex
                </li>
                <li>Không lưu trữ bất cứ dữ liệu truyện tranh nào</li>
                <li>
                  Không chịu trách nhiệm về tính chính xác, đầy đủ hoặc hợp pháp
                  của nội dung
                </li>
                <li>
                  Không chịu trách nhiệm về vấn đề bản quyền liên quan đến nội
                  dung
                </li>
                <li>
                  Không chịu trách nhiệm về chất lượng hình ảnh hoặc bản dịch
                </li>
              </ul>
              <p className="leading-relaxed text-gray-700">
                Mọi vấn đề liên quan đến nội dung, bản quyền, hoặc chất lượng
                truyện tranh nên được giải quyết trực tiếp với MangaDex hoặc các
                nhóm dịch tương ứng.
              </p>
              <p className="leading-relaxed text-gray-700">
                Bạn có thể xem thêm Terms & Policies của MangaDex tại{" "}
                <a
                  href="https://mangadex.org/compliance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  https://mangadex.org/compliance
                </a>
                .
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                4. Sử dụng Dịch vụ
              </h2>
              <p className="mb-4 leading-relaxed text-gray-700">
                Khi sử dụng TruyenDex, bạn đồng ý:
              </p>
              <ul className="mb-4 list-disc space-y-2 pl-6 text-gray-700">
                <li>
                  Sử dụng dịch vụ một cách hợp pháp và phù hợp với mục đích
                </li>
                <li>Không sử dụng dịch vụ để vi phạm bất kỳ luật pháp nào</li>
                <li>
                  Không cố gắng can thiệp hoặc làm gián đoạn hoạt động của dịch
                  vụ
                </li>
                <li>
                  Tôn trọng quyền sở hữu trí tuệ của các nhóm dịch và tác giả
                </li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                5. Thay đổi Điều khoản
              </h2>
              <p className="leading-relaxed text-gray-700">
                Chúng tôi có quyền cập nhật hoặc thay đổi các điều khoản này bất
                kỳ lúc nào mà không cần thông báo trước. Việc tiếp tục sử dụng
                dịch vụ sau khi có các thay đổi đồng nghĩa với việc bạn chấp
                nhận các điều khoản mới. Chúng tôi khuyến khích bạn thường xuyên
                kiểm tra trang này để cập nhật các thay đổi.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                6. Liên hệ
              </h2>
              <p className="leading-relaxed text-gray-700">
                Nếu bạn có bất kỳ câu hỏi hoặc thắc mắc nào về các điều khoản
                này, vui lòng liên hệ với chúng tôi thông qua:
              </p>
              <ul className="list-disc space-y-2 pl-6 text-gray-700">
                <li>
                  GitHub:{" "}
                  <a
                    href="https://github.com/zennomi/truyendex"
                    className="text-blue-600 underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/zennomi/truyendex
                  </a>
                </li>
                <li>
                  Website:{" "}
                  <a
                    href="https://truyendex.com"
                    className="text-blue-600 underline hover:text-blue-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://truyendex.com
                  </a>
                </li>
              </ul>
            </section>

            <div className="mt-8 border-t pt-6">
              <p className="text-center text-sm text-gray-500">
                TruyenDex - Nền tảng đọc truyện tranh thân thiện với độc giả
                Việt Nam
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
