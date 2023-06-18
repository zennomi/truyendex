export const metadata = {
    title: 'Nhóm dịch',
    description: 'Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 triệu thành viên tại NetTrom',
    other: {
        referrer: "same-origin"
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode,

}) {
    return (
        <div className="text-base text-black dark:text-white dark:bg-slate-900">
            {children}
        </div>
    )
}
