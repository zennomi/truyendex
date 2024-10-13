# TruyenDex

<p align="center">
  <img src="./src/app/opengraph-image.jpg" />
</p>

> TruyenDex đang trong giai đoạn phát triển, website [TruyenDex.com](https://truyendex.com/) chỉ là phiên bản thử nghiệm.

TruyenDex - Từ một dự án troll NetTruyen đến trở thành một dự án nghiêm túc, TruyenDex sẽ trở thành website đọc truyện đầy đủ chức năng phù hợp với độc giả Việt Nam.

Lời đầu tiên, TruyenDex xin gửi lời cảm ơn sâu sắc đến đội ngũ chuyên nghiệp [MangaDex](https://mangadex.org/) đã cung cấp API công khai với kho dữ liệu truyện tranh khổng lồ kèm các tài liệu chi tiết để TruyenDex có thể xây dựng một giao diện đọc truyện thân thiện với độc giả Việt Nam. Tiếp theo là cảm ơn các bạn uploader đã và đang ngày đêm đưa truyện bản dịch Việt lên MangaDex.

Để có thể sử dụng API của MangaDex, cũng như trở thành nơi sinh hoạt của cộng đồng nhóm dịch/độc giả Việt, TruyenDex đã đặt ra các tiêu chí sau:

- Không gắn quảng cáo trong website
- Ghi nguồn nhóm dịch đầy đủ
- Tôn trọng quyền tự quyết sản phẩm của nhóm dịch

## Chức năng dự kiến

- Theo dõi truyện
- Bình luận: Theo truyện, theo chương (trang)
- Diễn đàn thảo luận
- Lượt đọc (toàn thời gian, tháng, tuần,...)
- Xếp hạng người dùng (Tu tiên phi thăng...)
- Liên kết truyện bản quyền

## FAQs

- Tại sao lại không có quảng cáo? Tiền duy trì ở đâu ra?

  Tất cả các dữ liệu liên quan đến truyện tranh sẽ được lấy từ MangaDex, các nhóm dịch sẽ đăng chương mới tại MangaDex. Thế nên chi phí vận hành website là rất ít. **TruyenDex không lưu trữ bất cứ dữ liệu truyện tranh nào**.

- Ăn trộm data của MangaDex à?

  TruyenDex sẽ tuân thủ yêu cầu của MangaDex để được sử dụng API của họ, bao gồm: Không gắn quảng cáo, kiếm lợi nhuận, ghi nguồn nhóm dịch, cho họ quyền được tự quyết công sức của họ,...

- Liệu có bị nhà mạng chặn rồi phải dùng tên miền TruyenDexZ, TruyenDexCo,... không?

  TruyenDex chỉ lưu trữ dữ liệu người dùng, bình luận,... và cung cấp giao diện đọc truyện từ API của MangaDex, không hề lưu trữ bất cứ trang truyện nào. Đồng thời không có quảng cáo phạm pháp, và TruyenDex sẽ hạn chế xuất hiện trên kết quả tìm kiếm Google.

- Sao không dùng thẳng MangaDex?

  MangaDex rất tuyệt vời, nguồn lực rất mạnh, được phát triển bởi đội ngũ bài bản và chuyên nghiệp. Tuy nhiên giao diện và trải nghiệm người dùng của MangaDex không phù hợp với thị hiếu người VN, như lúc đọc truyện, bình luận, chương mới,... TruyenDex sẽ tạo ra giao diện thân thiện với độc giả VN, và là sân chơi dành riêng cho độc giả VN.

## Development (English)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### Getting Started

First, set up enviroment variables

```bash
cp -f .env.example .env.local
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

### Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Contributors

- Anh Gián admin Hako
- Zennomi
