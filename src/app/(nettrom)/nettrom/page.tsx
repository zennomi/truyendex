import FeaturedTitles from "@/components/pages/trang-chu/FeaturedTitles";
import NewUpdates from "@/components/pages/trang-chu/NewUpdates";
import ReadingHistory from "@/components/pages/trang-chu/ReadingHistory";
import TopTitles from "@/components/pages/trang-chu/TopTitles";

export const metadata = {
  title: "Đọc Truyện Tranh Online - Website chính thức - NetTrom",
  description:
    "Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại NetTrom",
};

export default function Nettrom() {
  return (
    <div className="flex flex-col gap-[40px]">
      <FeaturedTitles />
      <div className="grid lg:grid-cols-[2fr_1fr] gap-[40px]">
        <div>
          <NewUpdates />
        </div>
        <div className="flex flex-col gap-[20px]">
          <ReadingHistory />
          <TopTitles />
        </div>
      </div>
    </div>
  );
}
