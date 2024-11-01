import FeaturedTitles from "@/components/nettrom/trang-chu/FeaturedTitles";
import NewUpdates from "@/components/nettrom/trang-chu/NewUpdates";
import ReadingHistory from "@/components/nettrom/trang-chu/ReadingHistory";
import TopTitles from "@/components/nettrom/trang-chu/TopTitles";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-[40px]">
      <FeaturedTitles />
      <div className="grid gap-[40px] lg:grid-cols-[2fr_1fr]">
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
