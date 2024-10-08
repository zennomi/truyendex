import TopNav from "../../components/home/topNav";
import Image from "next/image";
import Link from "next/link";
import routes from "../../routes";
import Iconify from "../../components/iconify";

import LaptopIllustration from "../../assets/images/laptop.png"
import MangaDexHomepage from "../../assets/images/mangadex-homepage.png"
import ContextImage from "../../assets/images/context.png"
import EatShit from "../../assets/images/nettrom-an-cut.jpg"
import Collapse from "../../components/collapse";
import config from "@/config";
import LastUpdatedTitles from "@/sections/main/lastUpdatedTitles";
import { Manga } from "@/api";
import { Includes, Order } from "@/api/static";
import { MangaContentRating } from "@/api/manga";

export default async function Home() {
  const { data: { data: mangas } } = await Manga.getSearchManga({
    includes: [Includes.COVER_ART, Includes.ARTIST, Includes.AUTHOR],
    order: {
      latestUploadedChapter: Order.DESC,
    },
    contentRating: [MangaContentRating.SAFE, MangaContentRating.SUGGESTIVE],
    hasAvailableChapters: "true",
    availableTranslatedLanguage: ['vi'],
    limit: 12,
  })

  return (
    <div className=" text-base text-black dark:text-white dark:bg-slate-900">
      <TopNav />
      <section className="relative table w-full py-20 lg:py-44 overflow-hidden z-1">
        <div className="container">
          <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-10 gap-[30px]">
            <div className="md:col-span-7">
              <div className="md:mr-6">
                <h4 className="font-bold lg:leading-normal leading-normal text-4xl lg:text-5xl mb-5 text-black dark:text-white relative">
                  NetTruyen + MangaDex = {" "}
                  <span className="after:absolute after:right-0 after:left-0 after:bottom-3 after:lg:h-3 after:h-2 after:w-auto after:rounded-md after:bg-indigo-600/30 relative text-indigo-600">
                    TruyenDex
                  </span>
                </h4>
                <p className="text-slate-400 text-lg max-w-xl">
                  Rạng sáng ngày 08/10/2024, BlogTruyen chính thức ra đi và đề lại cộng đồng dịch manga bơ vơ chỉ còn nơi nương tựa duy nhất là MangaDex.
                  Dự án Da NetTrom Hồn MangaDex được tái sinh.
                </p>
                <div className="relative mt-8">
                  <Link
                    href={routes.nettrom.index}
                    className="btn bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700 text-white rounded-md mr-2"
                  >
                    Truy Cập Ngay
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
      <LastUpdatedTitles mangas={mangas} />
      <section
        className="relative md:py-24 py-16 bg-gray-50 dark:bg-slate-800"
        id="features"
      >
        <div className="container lg mx-auto">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-6 md:text-3xl text-2xl md:leading-normal leading-normal font-semibold">
              Ước mơ
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Tôi đã mơ. Một giấc chiêm bao về Website {config.appName}. Đó là nơi...
            </p>
          </div>
          {/*end grid*/}
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-[30px]">
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="icon-park-outline:respect" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Tôn trọng nhóm dịch
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  Ở đây, các nhóm dịch được đăng truyện và ghi nguồn đầy đủ.
                  Họ toàn quyền kiểm soát công sức mà họ tạo ra.
                  Họ nên được tôn trọng từ những quyền cơ bản nhất.
                </p>
              </div>
            </div>
            {/* Content */}
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="fluent-mdl2:add-group" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Sức mạnh cộng đồng
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  Ngoài nhóm dịch, mọi người có thể đóng góp xây dựng mọi thông tin xoay quanh một bộ truyện.
                  Tác giả, hình thức, thể loại... Giả sử tôi muốn đọc RomCom, sao lại lẫn cả NTR vào đây 😭
                </p>
              </div>
            </div>
            {/* Content */}
            {/* Content */}
            <div className="group relative lg:px-6 mt-4 transition duration-500 ease-in-out rounded-xl overflow-hidden text-center">
              <div className="relative overflow-hidden text-transparent -m-3">
                <Iconify icon="tabler:hexagon-filled" className="h-28 w-28 text-indigo-600/5 mx-auto rotate-[30deg]" />
                <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-indigo-600 rounded-xl transition duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                  <Iconify icon="uil:money-bill-slash" />
                </div>
              </div>
              <div className="mt-6">
                <a
                  href="#"
                  className="text-xl font-medium hover:text-indigo-600 duration-500 ease-in-out"
                >
                  Phi lợi nhuận
                </a>
                <p className="text-slate-400 transition duration-500 ease-in-out mt-3">
                  Nguồn tiền vừa đủ duy trì cộng đồng. Không có của cải dư thừa, không xuất hiện chế độ tư hữu.
                  Không có "trâu ăn" để "trâu buộc" ghét. Việc ai người đấy làm vì đam mê.
                </p>
              </div>
            </div>
            {/* Content */}
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center mt-16 gap-[30px]">
            <div className="relative order-2 md:order-1">
              <Image
                src={ContextImage}
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
            </div>
            <div className="lg:ml-8 mt-8 md:mt-0 order-1 md:order-2">
              <h4 className="mb-4 text-2xl md:leading-normal leading-normal font-semibold">
                Hoàn cảnh lịch sử
              </h4>
              <p className="text-slate-400">
                Đau xót trước cảnh BlogTruyen mất, cộng đồng tan rã, đồng thời nhìn thấy những mặt hạn chế của
                các phong trào chống NetTruyen đầu thế kỉ XXI, đã thôi thúc tôi ra đi tìm
                con đường cứu truyện mới cho cộng đồng.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.facebook.com/100063838084923/videos/550876680578076"
                  target="_blank"
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  Buồn của NetTruyen <Iconify icon="uil:angle-right-b" className="inline" />
                </a>
              </div>
            </div>
          </div>
          {/*end grid*/}
        </div>
        {/*end container*/}
        <div className="container md:mt-24 mt-16">
          <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-[30px]">
            <div className="lg:mr-8 mt-10 md:mt-0">
              <h4 className="mb-4 text-2xl leading-normal font-semibold">
                À đấy là 1 năm trước rồi...
              </h4>
              <p className="text-slate-400">
                NetTruyen bốc hơi không dấu vết.
                BlogTruyen trở lại nhưng cũng thọ thêm 1 năm và cho nhóm dịch/độc giả 3 ngày để backup truyện.
                Cộng đồng náo loạn di tản sang MangaDex, CuuTruyen,... Nhưng còn nhiều bất cập:
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div><Iconify icon="uil:check-circle" className="text-indigo-600 text-xl w-[24px]" />{" "}</div>
                  MangaDex giao diện chưa thân thiện với người dùng Việt Nam
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div><Iconify icon="uil:check-circle" className="text-indigo-600 text-xl w-[24px]" />{" "}</div>
                  CuuTruyen chưa backup kịp hàng nghìn đầu truyện của BlogTruyen
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div><Iconify icon="uil:check-circle" className="text-indigo-600 text-xl w-[24px]" />{" "}</div>
                  Các website khác cũng đang rén
                </li>
              </ul>
              <div className="mt-4">
                <Link
                  href={routes.nettrom.index}
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  Trải nghiệm NetTrom <Iconify icon="uil:angle-right-b" className="inline" />
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -bottom-10 right-0 p-6 rounded-lg shadow-md dark:shadow-gray-800 bg-white dark:bg-slate-900 md:w-80 w-60">
                <h5 className="text-lg font-semibold mb-3">MangaDex + NetTruyen</h5>
                <p className="text-slate-400">
                  Toàn bộ data manga là của MangaDex.
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
                src={EatShit}
                className="rounded-lg shadow-md dark:shadow-gray-800"
                alt=""
              />
              <div className="overflow-hidden absolute lg:h-[400px] h-[320px] lg:w-[400px] w-[320px] bg-indigo-600/5 dark:bg-indigo-600/20 bottom-0 left-0 rotate-45 -z-1 rounded-3xl" />
            </div>
            <div className="lg:ml-8 order-1 md:order-2">
              <h4 className="mb-4 text-2xl leading-normal font-semibold">
                Một phút tưởng niệm NetTruyen
              </h4>
              <p className="text-slate-400">
                Cả cộng đồng ngã ngửa khi biết thực ra NetTruyen ăn cắp là để che mắt triều đình.
                Cú plot twist vẹo gãy xương bọn anti-nettruyen.
              </p>
              <ul className="list-none text-slate-400 mt-4">
                <li className="mb-1 flex gap-x-1">
                  <div>
                    <Iconify icon="uil:check-circle" className="text-indigo-600 text-xl" />
                  </div>
                  <div>
                    Không ghi credit để triều đình không mò được tới nhóm dịch gốc
                  </div>
                </li>
                <li className="mb-1 flex gap-x-1 items-start">
                  <div><Iconify icon="uil:check-circle" className="text-indigo-600 text-xl" /></div>
                  <div>
                    Chạy SEO Google lấn át blogtruyen, cuutruyen,... hi sinh thân mình lấp kết quả tìm kiếm
                  </div>
                </li>
                <li className="mb-1 flex  gap-x-1 items-start">
                  <div><Iconify icon="uil:check-circle" className="text-indigo-600 text-xl" /></div>
                  <div>
                    Cắm quảng cáo thu lợi nhuận đánh lạc hướng NXB & Đơn Vị Bản Quyền
                  </div>
                </li>
              </ul>
              <div className="mt-4">
                <a
                  href="https://youtu.be/sACeJD8WnJ4?t=24"
                  target="_blank"
                  className="btn btn-link text-indigo-600 hover:text-indigo-600 after:bg-indigo-600 duration-500 ease-in-out"
                >
                  NetTruyen lên VTV <Iconify icon="uil:angle-right-b" className="inline" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative md:py-24 py-16">
        <div className="container md:mt-24 mt-16">
          <div className="grid grid-cols-1 pb-8 text-center">
            <h3 className="mb-4 md:text-3xl md:leading-normal text-2xl leading-normal font-semibold">
              Joke thôi, nói thật này
            </h3>
            <p className="text-slate-400 max-w-xl mx-auto">
              Thật ra NetTruyen không chỉ là NetTruyen.com, NetTruyenTo, NetTruyenZ, NetTruyenPlus, NetTruyenMax,...
              Nó ám chỉ cả một hệ tư tưởng ăn cắp truyện gắn quảng cáo.
            </p>
          </div>
          {/*end grid*/}
          <div className="relative grid md:grid-cols-12 grid-cols-1 items-center mt-8 gap-[30px]">
            <div className="md:col-span-6">
              <Collapse
                title="NetTrom liệu có thể thay thế NetTruyen?"
                content={
                  <>
                    NetTrom là một phiên bản demo cho thấy NetTruyen cần cải thiện điều gì.<br />
                    Tất nhiên NetTrom vẫn đầy đủ các tính năng để trải nghiệm đọc manga không quảng cáo,
                    tải chương với chất lượng ảnh gốc do nhóm dịch đăng tải, tìm truyện với đúng thể loại mong muốn,...
                  </>
                }
              />
            </div>
            {/*end col*/}
            <div className="md:col-span-6">
              <Collapse
                title="Nhóm dịch cũng dịch lậu mà, có gì hay ho mà chửi NetTruyen"
                content={
                  <>
                    Trước hết, bạn vào đây tức là đã và đang đọc truyện lậu nên chúng ta không bàn tới việc bản quyền.<br />
                    99% các nhóm dịch (fan-trans) đều bỏ công sức ra vì sở thích, vì đam mê, vì fame...
                    Vì lý do gì thì cũng chủ yếu là mục đích phi lợi nhuận, nhưng nhờ NetTruyen bê về site
                    họ (có chứa quảng cáo) nên mục đích ấy đã tiếp tay cho NetTruyen tạo lợi nhuận.
                    Mà đã tạo lợi nhuận thì sẽ thành cái gai trong mắt NXB và Đơn Vị Bản Quyền,
                    nên thành ra nhóm dịch vừa bị ăn cắp vừa bị đổ oan.
                  </>
                }
              />
            </div>
            {/*end col*/}
            <div className="md:col-span-6">
              <Collapse
                title="Kệ thôi, tao đọc đâu là việc của tao"
                content={
                  <>
                    Đúng rồi, việc của bạn mà. Mình chỉ muốn nhắc rằng
                    “Không có bữa ăn nào là miễn phí”, những trang truyện
                    mà bạn đã và đang đọc lậu đều là công sức của người dịch, người biên tập,...
                    đóng góp chứ không phải tự dưng nó xuất hiện trên NetTruyen.
                    Có biết ơn thì nên chọn đúng người.
                  </>
                }
              />
            </div>
            <div className="md:col-span-6">
              <Collapse
                title="Đăng nhập trên NetTrom?"
                content={
                  <>
                    Vì hạn chế của API MangaDex hiện tại và
                    mình lười nên chưa có chức năng đăng nhập và theo dõi hehe.
                    À chắc rảnh thì thêm chức năng lưu truyện trên thiết bị,
                    theo dõi theo nhóm dịch… Tương lai xa hơn nữa thì mong
                    API MangaDex có lẽ sẽ hỗ trợ đăng nhập.
                    Hiện tại mình đã tìm hiểu xong kha khá về NextJS 13 và chưa có gì muốn tìm hiểu thêm.
                  </>
                }
              />
            </div>
            <div className="md:col-span-6">
              <Collapse
                title="Bạn rảnh vkl thế"
                content={
                  <>
                    Tính ra mình code cái web này có 1 tuần,
                    chính xác theo tiếng thì chắc khoảng 50 tiếng thôi nên cũng khá rảnh.
                    Nhân dịp mình tìm hiểu về tech ấy mà (NextJS v13, Google Analytics, TailwindCSS,...)
                  </>
                }
              />
            </div>
            <div className="md:col-span-6">
              <Collapse
                title="Chi phí duy trì cái web này"
                content={
                  <>
                    Tên miền: $10.95/month<br />
                    Server: $7/month<br />
                    Khoảng 200k/tháng 🥺<br />

                  </>
                }
              />
            </div>
          </div>
          {/*end grid*/}
        </div>
      </section>
    </div>
  )
}
