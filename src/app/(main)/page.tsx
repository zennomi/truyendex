import Image from "next/image";
import Link from "next/link";
import Iconify from "@/components/iconify";
import BannerImage from "@/app/opengraph-image.jpg";
import Collapse from "@/components/collapse";
import { Constants } from "@/constants";
import TopNav from "@/components/sections/main/top-nav";

export default async function Home() {
  return (
    <div className="text-base text-black dark:bg-slate-900 dark:text-white">
      <TopNav />
      <section className="relative z-1 table w-full overflow-hidden py-20 lg:py-44">
        <div className="container">
          <div className="relative mt-10 grid grid-cols-1 items-center gap-[30px] md:grid-cols-12">
            <div className="md:col-span-7">
              <div className="md:mr-6">
                <h4 className="relative mb-5 text-4xl font-bold leading-normal text-black dark:text-white lg:text-5xl lg:leading-normal">
                  NetTruyen + MangaDex ={" "}
                  <span className="relative text-indigo-600 after:absolute after:bottom-3 after:left-0 after:right-0 after:h-2 after:w-auto after:rounded-md after:bg-indigo-600/30 after:lg:h-3">
                    TruyenDex
                  </span>
                </h4>
                <p className="max-w-xl text-lg text-slate-400">
                  Rạng sáng ngày 08/10/2024, BlogTruyen chính thức ra đi và đề
                  lại cộng đồng dịch manga bơ vơ chỉ còn nơi nương tựa duy nhất
                  là MangaDex. Dự án Da NetTrom Hồn MangaDex được tái sinh.
                </p>
                <div className="relative mt-8">
                  <Link
                    href={Constants.Routes.nettrom.index}
                    className="btn mr-2 rounded-md border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700"
                  >
                    Trải nghiệm Demo
                  </Link>
                  <a
                    href="https://github.com/zennomi/truyendex"
                    target="_blank"
                    data-id="yba7hPeTSjk"
                    className="btn btn-icon lightbox rounded-full border-indigo-600 bg-indigo-600 text-white hover:border-indigo-700 hover:bg-indigo-700"
                  >
                    <Iconify icon="eva:github-outline" className="text-lg" />
                  </a>
                  <small className="ml-2 align-middle text-sm font-semibold uppercase">
                    Source Code
                  </small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="md:col-span-5">
              <div className="relative after:absolute after:-bottom-20 after:-left-24 after:-z-1 after:h-[30rem] after:w-[75rem] after:rotate-[130deg] after:rounded-[20rem] after:bg-indigo-600 after:shadow-2xl after:shadow-indigo-600/40 after:content-[''] after:md:-left-20 after:md:bottom-12 after:md:h-[55rem] after:lg:-left-0">
                <img
                  src={"/images/logo.png"}
                  className="md:max-w-md lg:max-w-none"
                  alt=""
                />
              </div>
            </div>
            {/*end col*/}
            <div className="overflow-hidden after:absolute after:left-0 after:top-16 after:-z-1 after:h-32 after:w-32 after:animate-[spin_10s_linear_infinite] after:rounded-3xl after:bg-indigo-600/5 after:content-['']" />
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
      </section>
      <section
        className="relative bg-gray-50 py-16 dark:bg-slate-800 md:py-24"
        id="features"
      >
        <div className="lg container mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
              Tại sao lại là TruyenDex
            </h3>
            <p className="mx-auto max-w-xl text-slate-400">
              Để có thể sử dụng API của{" "}
              <a href="https://mangadex.org/" target="_blank">
                MangaDex
              </a>{" "}
              và trở thành mái nhà bền vững của cộng đồng nhóm dịch/độc giả
              Việt, {Constants.APP_NAME} đã đặt ra các tiêu chí sau:
            </p>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-3">
            <div className="group relative mt-4 overflow-hidden rounded-xl text-center transition duration-500 ease-in-out lg:px-6">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="mx-auto h-28 w-28 rotate-[30deg] text-indigo-600/5"
                />
                <div className="absolute left-0 right-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 transition duration-500 ease-in-out">
                  <Iconify icon="icon-park-outline:respect" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium duration-500 ease-in-out hover:text-indigo-600">
                  Tôn trọng nhóm dịch
                </span>
                <p className="mt-3 text-slate-400 transition duration-500 ease-in-out">
                  Các nhóm dịch được ghi nguồn đầy đủ và khuyến khích người đọc
                  biết tới nhóm dịch. Họ toàn quyền quyết định đối với công sức
                  mà họ tạo ra.
                </p>
              </div>
            </div>
            <div className="group relative mt-4 overflow-hidden rounded-xl text-center transition duration-500 ease-in-out lg:px-6">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="mx-auto h-28 w-28 rotate-[30deg] text-indigo-600/5"
                />
                <div className="absolute left-0 right-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 transition duration-500 ease-in-out">
                  <Iconify icon="uil:money-bill-slash" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium duration-500 ease-in-out hover:text-indigo-600">
                  Không gắn quảng cáo
                </span>
                <p className="mt-3 text-slate-400 transition duration-500 ease-in-out">
                  Thứ nhất là vì yêu cầu của MangaDex, thứ hai là để không bị
                  nhà mạng chặn. Bởi vì phí duy trì TruyenDex rất thấp nên không
                  cần kiếm lợi nhuận.
                </p>
              </div>
            </div>
            <div className="group relative mt-4 overflow-hidden rounded-xl text-center transition duration-500 ease-in-out lg:px-6">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="mx-auto h-28 w-28 rotate-[30deg] text-indigo-600/5"
                />
                <div className="absolute left-0 right-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 transition duration-500 ease-in-out">
                  <Iconify icon="fluent-mdl2:add-group" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium duration-500 ease-in-out hover:text-indigo-600">
                  Sống dai nhất có thể
                </span>
                <p className="mt-3 text-slate-400 transition duration-500 ease-in-out">
                  TruyenDex sẽ hạn chế xuất hiện công khai trên kết quả tìm
                  kiếm, không gắn quảng cáo, không kiếm lợi nhuận, không tàng
                  trữ dữ liệu phạm pháp,...
                </p>
              </div>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container mt-16 md:mt-24">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
              Hoàn cảnh lịch sử
            </h3>
            <p className="mx-auto max-w-xl text-slate-400">
              TruyenDex - Từ một dự án troll NetTruyen đến trở thành một dự án
              nghiêm túc, TruyenDex sẽ trở thành website đọc truyện đầy đủ chức
              năng phù hợp với độc giả Việt Nam...
            </p>
          </div>
          <div className="grid grid-cols-1 items-center gap-[30px] md:grid-cols-2">
            <div className="relative order-2 md:order-1">
              <img
                src="/images/home-page/nettrom-an-cut.jpg"
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
            </div>
            <div className="order-1 mt-8 md:order-2 md:mt-0 lg:ml-8">
              <h4 className="mb-4 text-2xl font-semibold leading-normal md:leading-normal">
                Khủng hoảng truyện l*u
              </h4>
              <p className="text-slate-400">
                NetTruyen bốc hơi trước. Các website đọc manga lớn khác như
                BlogTruyen, TruyenQQ, OtakuSan,... cũng lần lượt bị sập hoặc đổi
                chủ. Cộng đồng náo loạn di tản sang MangaDex, CuuTruyen,...
                Nhưng...
              </p>
              <ul className="mt-4 list-none text-slate-400">
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  MangaDex giao diện chưa thân thiện với người dùng Việt Nam
                </li>
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  CuuTruyen chưa backup kịp hàng nghìn đầu truyện của BlogTruyen
                </li>
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  Cộng đồng không có một nơi sinh hoạt cố định
                </li>
              </ul>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container mt-16 md:mt-24">
          <div className="grid grid-cols-1 items-center gap-[30px] md:grid-cols-2">
            <div className="mt-10 md:mt-0 lg:mr-8">
              <h4 className="mb-4 text-2xl font-semibold leading-normal">
                NetTrom
              </h4>
              <p className="text-slate-400">
                TruyenDex (trước đó là NetTrom) vốn là một dự án sinh ra để
                troll NetTruyen, nhưng không ngờ lại được nhiều người kỳ vọng
                vào một website mới sẽ thay thế cho người anh BlogTruyen. Tuy
                nhiên TruyenDex lúc này còn nhiều hạn chế:
              </p>
              <ul className="mt-4 list-none text-slate-400">
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  Chưa có chức năng đăng nhập, theo dõi, bình luận
                </li>
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  Giao diện trộm giật từ NetTruyen chưa thực sự tối ưu
                </li>
                <li className="mb-1 flex items-start gap-x-1">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="w-[24px] text-xl text-indigo-600"
                    />{" "}
                  </div>
                  Phụ thuộc quá nhiều vào MangaDex API
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -bottom-10 right-0 w-60 rounded-lg bg-white p-6 shadow-md dark:bg-slate-900 dark:shadow-gray-800 md:w-80">
                <h5 className="mb-3 text-lg font-semibold">MangaDex API</h5>
                <p className="text-slate-400">
                  TruyenDex không hề sở hữu bất cứ dữ liệu manga nào
                </p>
                <div className="mb-2 mt-3 flex justify-between">
                  <span className="text-slate-400">Hoàn thiện</span>
                  <span className="text-slate-400">30%</span>
                </div>
                <div className="h-[6px] w-full rounded-full bg-gray-100 dark:bg-gray-800">
                  <div
                    className="h-[6px] rounded-full bg-indigo-600"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
              <div className="md:mr-10">
                <img
                  src={"/images/home-page/mangadex-homepage.png"}
                  className="rounded-lg shadow-md dark:shadow-gray-800"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
        <div className="container mt-16 md:mt-24">
          <div className="grid grid-cols-1 items-center gap-[30px] md:grid-cols-2">
            <div className="relative order-2 md:order-1">
              <Image
                src={BannerImage}
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
              {/* <div className="overflow-hidden absolute lg:h-[400px] h-[320px] lg:w-[400px] w-[320px] bg-indigo-600/5 dark:bg-indigo-600/20 bottom-0 left-0 rotate-45 -z-1 rounded-3xl" /> */}
            </div>
            <div className="order-1 md:order-2 lg:ml-8">
              <h4 className="mb-4 text-2xl font-semibold leading-normal">
                Chính thức khởi động
              </h4>
              <p className="text-slate-400">
                Sau khi khởi động lại dự án NetTrom bản demo khá mượt dù đỉnh
                điểm lên tới 2000 người dùng trong 1 phút, bàn bạc với với anh
                Gián admin Hako và tham khảo ý kiến nhiều bên như anh Afang cựu
                mod Blogtruyen, anh em hay hoạt động bên MangaDex, đánh tiếng
                với CuuTruyen-senpai, và không thể thiếu sự ủng hộ của nhiều bạn
                độc giả ở phần bình luận, mình quyết định sẽ đưa TruyenDex thành
                dự án nghiêm túc.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.facebook.com/Zennomi/posts/pfbid0rFPrK9ey3KS54Yb6oQeQjcQawZrrsjiC8153ZwvAMcESyknrTASyZA5peey6T6oRl"
                  target="_blank"
                  className="btn btn-link text-indigo-600 duration-500 ease-in-out after:bg-indigo-600 hover:text-indigo-600"
                >
                  Bài viết công bố dự án{" "}
                  <Iconify icon="uil:angle-right-b" className="inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
              Chức năng trong tương lai
            </h3>
            <p className="mx-auto max-w-xl text-slate-400">
              TruyenDex sẽ bổ sung thêm các chức năng gì?
            </p>
          </div>
          {/*end grid*/}
          <div className="mt-8 grid grid-cols-1 gap-[30px] md:grid-cols-2 lg:grid-cols-4">
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-chart-line" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Đăng nhập
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Cá nhân hóa trải nghiệm sử dụng TruyenDex
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-crosshairs" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Theo dõi truyện
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Cập nhật chương mới nhất của các bộ truyện bạn theo dõi!
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-airplay" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Bình luận
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Bình luận tại một đầu truyện, tại một chương, thậm chí là tại
                  một trang truyện!
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-rocket" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Diễn đàn thảo luận
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Nơi cộng đồng sinh hoạt, mọi người tương tác với nhau
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-clock" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  BXH Truyện
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Top truyện hot toàn thời gian, toàn tháng, toàn tuần,...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-users-alt" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Xếp hạng người dùng
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Người dùng thi đua tương tác để leo hạng...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-file-alt" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Liên kết MangaDex
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Liên kết với tài khoản MangaDex để nhận role nhóm trưởng, dịch
                  giả,...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative overflow-hidden rounded-xl bg-white p-6 text-center shadow duration-500 hover:bg-indigo-600 hover:shadow-md dark:bg-slate-900 dark:shadow-gray-800 dark:hover:bg-indigo-600 dark:hover:shadow-gray-700">
              <div className="relative -m-3 overflow-hidden text-transparent">
                <i
                  data-feather="hexagon"
                  className="mx-auto size-24 fill-indigo-600/5 group-hover:fill-white/10"
                />
                <div className="absolute end-0 start-0 top-2/4 mx-auto flex -translate-y-2/4 items-center justify-center rounded-xl align-middle text-3xl text-indigo-600 duration-500 group-hover:text-white">
                  <i className="uil uil-search" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium duration-500 group-hover:text-white"
                >
                  Ủng hộ bản quyền
                </a>
                <p className="mt-3 text-slate-400 duration-500 group-hover:text-white/50">
                  Ủng hộ truyện bản quyền với tất cả thiện chí
                </p>
              </div>
            </div>
            {/*end feature*/}
          </div>
        </div>
        {/*end container*/}
        <div className="container relative mt-16 md:mt-24">
          <div className="grid grid-cols-1 items-center gap-[30px]">
            <div className="">
              <div className="mb-4 flex">
                <span className="mb-0 text-2xl font-bold text-indigo-600">
                  <span
                    className="counter-value text-6xl font-bold"
                    data-target={15}
                  >
                    0
                  </span>
                  ₫
                </span>
                <span className="ms-2 self-end font-medium">
                  vốn <br /> phát triển
                </span>
              </div>
              <h3 className="mb-6 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
                Ủng hộ dự án?
              </h3>
              <p className="max-w-xl text-slate-400">
                Dự án không nhận tiền, chỉ nhận hiện vật (Proxy, Server, VPS, hỗ
                trợ xây cộng đồng,...). Nếu bạn thực sự muốn ủng hộ dự án, hay
                chia sẻ dự án tới nhiều người hơn.
              </p>
              <div className="mt-6">
                <a
                  href={Constants.Routes.report}
                  target="_blank"
                  className="me-2 mt-2 inline-block rounded-md border border-indigo-600 bg-indigo-600 px-5 py-2 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
                >
                  <i className="uil uil-envelope" /> Liên hệ
                </a>
              </div>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
      </section>

      <section className="relative py-16 md:py-24">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 text-2xl font-semibold leading-normal md:text-3xl md:leading-normal">
              FAQs
            </h3>
            <p className="mx-auto max-w-xl text-slate-400">
              Chắc chắn sẽ có nhiều thắc mắc...
            </p>
          </div>
          {/*end grid*/}
          <div className="relative mt-8 grid grid-cols-1 items-center gap-[30px] md:grid-cols-12">
            <div className="md:col-span-6">
              <Collapse
                title="Tại sao lại không có quảng cáo? Tiền duy trì ở đâu ra?"
                content={
                  <>
                    Tất cả các dữ liệu liên quan đến manga sẽ được lấy từ
                    MangaDex, các nhóm dịch sẽ đăng chương mới tại MangaDex. Thế
                    nên chi phí vận hành website là rất ít.{" "}
                    <b>
                      TruyenDex không lưu trữ bất cứ dữ liệu truyện tranh nào.
                    </b>
                  </>
                }
              />
            </div>
            {/*end col*/}
            <div className="md:col-span-6">
              <Collapse
                title="Ăn trộm data của MangaDex à?"
                content={
                  <>
                    TruyenDex sẽ tuân thủ yêu cầu của MangaDex để được sử dụng
                    API của họ, bao gồm: Không gắn quảng cáo, kiếm lợi nhuận,
                    ghi nguồn nhóm dịch, cho họ quyền được tự quyết công sức của
                    họ,...
                  </>
                }
              />
            </div>
            {/*end col*/}
            <div className="md:col-span-6">
              <Collapse
                title="Liệu TruyenDex có nối gót những người đi trước..."
                content={
                  <>
                    TruyenDex chỉ lưu trữ dữ liệu người dùng, bình luận,... và
                    cung cấp giao diện đọc truyện từ API của MangaDex, không hề
                    lưu trữ bất cứ trang truyện nào. Đồng thời không có quảng
                    cáo phạm pháp, và TruyenDex sẽ hạn chế xuất hiện trên kết
                    quả tìm kiếm Google.
                  </>
                }
              />
            </div>
            <div className="md:col-span-6">
              <Collapse
                title="Sao không dùng thẳng MangaDex?"
                content={
                  <>
                    MangaDex rất tuyệt vời, nguồn lực rất mạnh, được phát triển
                    bởi đội ngũ bài bản và chuyên nghiệp. Tuy nhiên giao diện và
                    trải nghiệm người dùng của MangaDex không phù hợp với thị
                    hiếu người VN, như lúc đọc truyện, bình luận, chương mới,...
                    TruyenDex sẽ tạo ra giao diện thân thiện với độc giả VN, và
                    là sân chơi dành riêng cho độc giả VN.
                  </>
                }
              />
            </div>
            <div className="md:col-span-6">
              <Collapse
                title="Chi phí duy trì TruyenDex"
                content={
                  <>
                    Tên miền
                    <br />
                    Proxy Server
                    <br />
                    Proxy Pool
                    <br />
                    Data Server
                    <br />
                  </>
                }
              />
            </div>
          </div>
          {/*end grid*/}
        </div>
      </section>
    </div>
  );
}
