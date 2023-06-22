import '../../assets/scss/tailwind.scss'
import { Inter } from 'next/font/google'
import { MangadexContextProvider } from '../../contexts/mangadex'

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Gtag from '../../components/gtag';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Đọc Truyện Tranh Online - Website chính thức - NetTrom',
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
    <html lang="vi" className='dark'>
      <body className={`${inter.className}`}>
        <MangadexContextProvider>
          {children}
        </MangadexContextProvider>
        <Gtag />
      </body>
    </html>
  )
}
