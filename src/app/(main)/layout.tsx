import '../../assets/scss/tailwind.scss'
import { Metadata } from 'next';
import { Inter } from 'next/font/google'
import { MangadexContextProvider } from '../../contexts/mangadex'

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Gtag from '../../components/gtag';
import config from '../../config';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NetTrom - Web đọc truyện cao cả nhất Việt Nam',
  description: 'Web đọc truyện tranh online lớn nhất được cập nhật liên tục mỗi ngày - Cùng tham gia đọc truyện và thảo luận với hơn 💚10 tỷ thành viên tại NetTrom',
  applicationName: 'NetTrom',
  authors: [{ name: 'Zennomi', url: 'https://www.facebook.com/Zennomi' }],
  keywords: ['truyện tranh', 'manga', 'nettruyen', 'nettrom', 'blogtruyen'],
  metadataBase: new URL(config.appUrl),
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
