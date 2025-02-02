import Link from "next/link";
import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "../Alert";
import { Button } from "../Button";

const ALERTS = [
  <Alert
    classNames={{
      alert: "[&>svg]:text-blue-500 text-blue-500 bg-blue-100",
    }}
    title=" TruyenDex là một website mã nguồn mở, trong quá trình trải nghiệm
            rất mong nhận được phản hồi từ mọi người!"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={Constants.Routes.report}
        target="_blank"
        rel="nofollow"
      >
        <Button className="bg-blue-500 hover:bg-blue-600">
          Góp ý/Phản hồi
        </Button>
      </Link>
    }
  ></Alert>,
  <Alert
    classNames={{
      alert: "[&>svg]:text-purple-500 text-purple-500 bg-purple-100",
    }}
    title=" Chính thức triển khai chức năng bình luận/theo dõi truyện"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={Constants.Routes.signup}
      >
        <Button className="bg-purple-500 hover:bg-purple-600">
          Mở tài khoản ngay
        </Button>
      </Link>
    }
  ></Alert>,
];

export default function RandomAlert() {
  const { user } = useAuth();
  if (user === null) return ALERTS[1];
  return ALERTS[0];
}
