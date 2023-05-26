import FeaturedTitles from "../../sections/nettrom/featuredTitles";
import NewUpdates from "../../sections/nettrom/newUpdates";

export const metadata = {
    title: 'Đọc Truyện Tranh Online - Website chính thức - NetTrom',
    description: 'Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại NetTrom',
};

export default function Nettrom() {
    return (
        <>
            <FeaturedTitles />
            <div className="row">
            <NewUpdates />
            </div>
        </>
    )
}