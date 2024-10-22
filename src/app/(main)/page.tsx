import Image from "next/image";
import Link from "next/link";
import TopNav from "@/sections/main/top-nav";
import routes from "@/routes";
import Iconify from "@/components/iconify";

import LaptopIllustration from "@/assets/images/laptop.png";
import MangaDexHomepage from "@/assets/images/mangadex-homepage.png";
import BannerImage from "@/app/opengraph-image.jpg";
import EatShit from "@/assets/images/nettrom-an-cut.jpg";
import Collapse from "@/components/collapse";
import config from "@/config";

export default async function Home() {
  return (
    <div className=" text-base text-black dark:text-white dark:bg-slate-900">
      <TopNav />
      <section className="relative table w-full py-20 lg:py-44 overflow-hidden z-1">
        <div className="container">
          <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="md:col-span-7">
              <div className="md:mr-6">
                <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white relative">
                  NetTruyen + MangaDex ={" "}
                  <span className="after:absolute after:right-0 after:left-0 after:bottom-3 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-indigo-600/30 relative text-indigo-600">
                    TruyenDex
                  </span>
                </h4>
                <p className="text-slate-400 text-lg max-w-xl">
                  Rạng sáng ngày 08/10/2024, BlogTruyen chính thức ra đi và đề
                  lại cộng đồng dịch manga bơ vơ chỉ còn nơi nương tựa duy nhất
                  là MangaDex. Dự án Da NetTrom Hồn MangaDex được tái sinh.
                </p>
                <div className="relative mt-8">
                  <Link
                    href={routes.nettrom.index}
                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mr-2"
                  >
                    Trải nghiệm Demo
                  </Link>
                  <a
                    href="https://github.com/zennomi/truyendex"
                    target="_blank"
                    data-id="yba7hPeTSjk"
                    className="btn btn-icon bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-full lightbox"
                  >
                    <Iconify icon="eva:github-outline" className="text-lg" />
                  </a>
                  <small className="text-sm font-semibold uppercase align-middle ml-2">
                    Source Code
                  </small>
                </div>
              </div>
            </div>
            {/*end col*/}
            <div className="md:col-span-5">
              <div className="relative after:content-[''] after:absolute after:md:bottom-12 after:-bottom-20 after:lg:-left-0 after:md:-left-20 after:-left-24 after:bg-indigo-600 after:shadow-2xl after:shadow-indigo-600/40 after:-z-1 after:rotate-[130deg] after:w-[75rem] after:md:h-[55rem] after:h-[30rem] after:rounded-[20rem]">
                <Image
                  src={LaptopIllustration}
                  className="lg:max-w-none md:max-w-md"
                  alt=""
                />
              </div>
            </div>
            {/*end col*/}
            <div className="overflow-hidden after:content-[''] after:absolute after:h-32 after:w-32 after:bg-indigo-600/5 after:top-16 after:left-0 after:-z-1 after:rounded-3xl after:animate-[spin_10s_linear_infinite]" />
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
      </section>
      <section
        className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800"
        id="features"
      >
        <div className="container lg mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Tại sao lại là TruyenDex
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Để có thể sử dụng API của{" "}
              <a href="https://mangadex.org/" target="_blank">
                MangaDex
              </a>{" "}
              và trở thành mái nhà bền vững của cộng đồng nhóm dịch/độc giả
              Việt, {config.appName} đã đặt ra các tiêu chí sau:
            </p>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]"
                />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="icon-park-outline:respect" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  Tôn trọng nhóm dịch
                </span>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  Các nhóm dịch được ghi nguồn đầy đủ và khuyến khích người đọc
                  biết tới nhóm dịch. Họ toàn quyền quyết định đối với công sức
                  mà họ tạo ra.
                </p>
              </div>
            </div>
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]"
                />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="uil:money-bill-slash" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  Không gắn quảng cáo
                </span>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  Thứ nhất là vì yêu cầu của MangaDex, thứ hai là để không bị
                  nhà mạng chặn. Bởi vì phí duy trì TruyenDex rất thấp nên không
                  cần kiếm lợi nhuận.
                </p>
              </div>
            </div>
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify
                  icon="tabler:hexagon-filled"
                  className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]"
                />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="fluent-mdl2:add-group" />
                </div>
              </div>
              <div className="mt-6">
                <span className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out">
                  Sống dai nhất có thể
                </span>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
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
        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Hoàn cảnh lịch sử
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              TruyenDex - Từ một dự án troll NetTruyen đến trở thành một dự án
              nghiêm túc, TruyenDex sẽ trở thành website đọc truyện đầy đủ chức
              năng phù hợp với độc giả Việt Nam...
            </p>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="relative order-2 md:order-1">
              <Image
                src={EatShit}
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
            </div>
            <div className="lg:ml-8 mt-8 md:mt-0 order-1 md:order-2">
              <h4 className="mb-4 text-2xl md:leading-normal leading-normal font-semibold">
                Khủng hoảng truyện l*u
              </h4>
              <p className="text-slate-400">
                NetTruyen bốc hơi trước. Các website đọc manga lớn khác như
                BlogTruyen, TruyenQQ, OtakuSan,... cũng lần lượt bị sập hoặc đổi
                chủ. Cộng đồng náo loạn di tản sang MangaDex, CuuTruyen,...
                Nhưng...
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
                    />{" "}
                  </div>
                  MangaDex giao diện chưa thân thiện với người dùng Việt Nam
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
                    />{" "}
                  </div>
                  CuuTruyen chưa backup kịp hàng nghìn đầu truyện của BlogTruyen
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
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
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="lg:mr-8 mt-10 md:mt-0">
              <h4 className="mb-4 text-2xl leading-normal font-semibold">
                NetTrom
              </h4>
              <p className="text-slate-400">
                TruyenDex (trước đó là NetTrom) vốn là một dự án sinh ra để
                troll NetTruyen, nhưng không ngờ lại được nhiều người kỳ vọng
                vào một website mới sẽ thay thế cho người anh BlogTruyen. Tuy
                nhiên TruyenDex lúc này còn nhiều hạn chế:
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
                    />{" "}
                  </div>
                  Chưa có chức năng đăng nhập, theo dõi, bình luận
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
                    />{" "}
                  </div>
                  Giao diện trộm giật từ NetTruyen chưa thực sự tối ưu
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div>
                    <Iconify
                      icon="heroicons-outline:x-circle"
                      className="text-indigo-600 text-xl w-[24px]"
                    />{" "}
                  </div>
                  Phụ thuộc quá nhiều vào MangaDex API
                </li>
              </ul>
            </div>
            <div className="relative">
              <div className="absolute -bottom-10 right-0 p-6 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 md:w-80 w-60">
                <h5 className="text-lg font-semibold mb-3">MangaDex API</h5>
                <p className="text-slate-400">
                  TruyenDex không hề sở hữu bất cứ dữ liệu manga nào
                </p>
                <div className="flex justify-between mt-3 mb-2">
                  <span className="text-slate-400">Hoàn thiện</span>
                  <span className="text-slate-400">30%</span>
                </div>
                <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-[6px]">
                  <div
                    className="bg-indigo-600 h-[6px] rounded-full"
                    style={{ width: "30%" }}
                  />
                </div>
              </div>
              <div className="md:mr-10">
                <Image
                  src={MangaDexHomepage}
                  className="rounded-lg shadow-md dark:shadow-gray-800"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
        {/*end container*/}
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="relative order-2 md:order-1">
              <Image
                src={BannerImage}
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
              {/* <div className="overflow-hidden absolute lg:h-[400px] h-[320px] lg:w-[400px] w-[320px] bg-indigo-600/5 dark:bg-indigo-600/20 bottom-0 left-0 rotate-45 -z-1 rounded-3xl" /> */}
            </div>
            <div className="lg:ml-8 order-1 md:order-2">
              <h4 className="mb-4 text-2xl leading-normal font-semibold">
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
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  Bài viết công bố dự án{" "}
                  <Iconify icon="uil:angle-right-b" className="inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container relative">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Chức năng trong tương lai
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              TruyenDex sẽ bổ sung thêm các chức năng gì?
            </p>
          </div>
          {/*end grid*/}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 mt-8 gap-[30px]">
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-chart-line" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Đăng nhập
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Cá nhân hóa trải nghiệm sử dụng TruyenDex
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-crosshairs" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Theo dõi truyện
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Cập nhật chương mới nhất của các bộ truyện bạn theo dõi!
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-airplay" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Bình luận
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Bình luận tại một đầu truyện, tại một chương, thậm chí là tại
                  một trang truyện!
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-rocket" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Diễn đàn thảo luận
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Nơi cộng đồng sinh hoạt, mọi người tương tác với nhau
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-clock" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  BXH Truyện
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Top truyện hot toàn thời gian, toàn tháng, toàn tuần,...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-users-alt" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Xếp hạng người dùng
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Người dùng thi đua tương tác để leo hạng...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-file-alt" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Liên kết MangaDex
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Liên kết với tài khoản MangaDex để nhận role nhóm trưởng, dịch
                  giả,...
                </p>
              </div>
            </div>
            {/*end feature*/}
            <div className="group relative p-6 shadow dark:shadow-gray-800 hover:shadow-md dark:hover:shadow-gray-700 hover:bg-indigo-600 dark:hover:bg-indigo-600 duration-500 rounded-xl bg-white dark:bg-slate-900 overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <i
                  data-feather="hexagon"
                  className="size-24 fill-indigo-600/5 group-hover:fill-white/10 mx-auto"
                />
                <div className="absolute top-2/4 -translate-y-2/4 start-0 end-0 mx-auto text-indigo-600 rounded-xl group-hover:text-white duration-500 text-3xl flex align-middle justify-center items-center">
                  <i className="uil uil-search" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href=""
                  className="text-lg font-medium group-hover:text-white duration-500"
                >
                  Ủng hộ bản quyền
                </a>
                <p className="text-slate-400 group-hover:text-white/50 duration-500 mt-3">
                  Ủng hộ truyện bản quyền với tất cả thiện chí
                </p>
              </div>
            </div>
            {/*end feature*/}
          </div>
        </div>
        {/*end container*/}
        <div className="container relative md:mt-24 mt-16">
          <div className="grid grid-cols-1 items-center gap-[30px]">
            <div className="">
              <div className="flex mb-4">
                <span className="text-indigo-600 text-2xl font-bold mb-0">
                  <span
                    className="counter-value text-6xl font-bold"
                    data-target={15}
                  >
                    0
                  </span>
                  ₫
                </span>
                <span className="self-end font-medium ms-2">
                  vốn <br /> phát triển
                </span>
              </div>
              <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
                Ủng hộ dự án?
              </h3>
              <p className="text-slate-400 max-w-xl">
                Dự án không nhận tiền, chỉ nhận hiện vật (Proxy, Server, VPS, hỗ
                trợ xây cộng đồng,...). Nếu bạn thực sự muốn ủng hộ dự án, hay
                chia sẻ dự án tới nhiều người hơn.
              </p>
              <div className="mt-6">
                <a
                  href={routes.report}
                  target="_blank"
                  className="py-2 px-5 inline-block font-semibold tracking-wide border align-middle duration-500 text-base text-center bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md me-2 mt-2"
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

      <section className="relative md:py-24 py-16">
        <div className="container">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              FAQs
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Chắc chắn sẽ có nhiều thắc mắc...
            </p>
          </div>
          {/*end grid*/}
          <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-8 gap-[30px]">
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
