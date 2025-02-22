import FeaturedTitles from "@/components/nettrom/trang-chu/featured-titles";
import NewUpdates from "@/components/nettrom/trang-chu/new-updates";
import ReadingHistory from "@/components/nettrom/trang-chu/reading-history";
import RecentComments from "@/components/nettrom/trang-chu/recent-comments";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-[40px]">
      <FeaturedTitles />
      <div className="grid grid-cols-1 gap-[40px] lg:grid-cols-3">
        <div className="lg:col-span-2">
          <NewUpdates />
        </div>
        <div className="flex flex-col gap-[20px]">
          <ReadingHistory />
          <TopTitles />
          <RecentComments />
        </div>
      </div>
    </div>
  );
}
