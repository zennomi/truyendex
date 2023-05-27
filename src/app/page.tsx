import { redirect } from 'next/navigation';

export default function Home() {
  redirect("nettrom")
  return (
    <div>Đang trộm...</div>
  )
}
