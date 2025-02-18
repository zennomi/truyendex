import Link from "next/link";
import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import { Alert } from "../Alert";
import { Button } from "../Button";
import { FaCat, FaGithub, FaSync } from "react-icons/fa";
import { useMemo } from "react";
import { sample } from "lodash";

const REGISTER_ALERT = (
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
  ></Alert>
);

const ALERTS = [
  <Alert
    classNames={{
      alert: "[&>svg]:text-blue-500 text-blue-500 bg-blue-100",
    }}
    title=" TruyenDex đang trong quá trình phát triển và có nhiều lỗi phát sinh, trong quá trình trải nghiệm
            rất mong nhận được phản hồi từ mọi người!"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={Constants.Routes.report}
        target="_blank"
        rel="nofollow"
      >
        <Button className="bg-blue-500 hover:bg-blue-600">Báo lỗi</Button>
      </Link>
    }
  />,
  <Alert
    classNames={{
      alert: "[&>svg]:text-emerald-500 text-emerald-500 bg-emerald-100",
    }}
    title=" Giao diện TruyenDex là một dự án mã nguồn mở, nếu không ưng ý giao diện, bạn hoàn toàn có thể đóng góp phát triển giao diện!"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={Constants.Routes.github}
        target="_blank"
        rel="nofollow"
      >
        <Button className="bg-emerald-500 hover:bg-emerald-600">Github</Button>
      </Link>
    }
    icon={<FaGithub className="inline text-[20px]" />}
  />,
  <Alert
    classNames={{
      alert: "[&>svg]:text-orange-500 text-orange-500 bg-orange-100",
    }}
    title=" TruyenDex lấy dữ liệu từ MangaDex, hoàn toàn miễn phí, không có quảng cáo, nếu bạn thích TruyenDex, hãy kêu gọi các nhóm dịch đăng truyện tại MangaDex!"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={"https://mangadex.org"}
        target="_blank"
        rel="nofollow"
      >
        <Button className="bg-orange-500 hover:bg-orange-600">MangaDex</Button>
      </Link>
    }
    icon={<FaCat className="inline text-[20px]" />}
  />,
  <Alert
    classNames={{
      alert: "[&>svg]:text-orange-500 text-orange-500 bg-orange-100",
    }}
    title=" Bạn có thể đồng bộ truyện theo dõi từ nhiều nguồn CManga (NetTruyen, TruyenQQ), MangaDex, CuuTruyen sang TruyenDex"
    action={
      <Link
        className="no-underline hover:no-underline"
        href={Constants.Routes.nettrom.sync}
      >
        <Button className="bg-orange-500 hover:bg-orange-600">
          Đồng bộ ngay
        </Button>
      </Link>
    }
    icon={<FaSync className="inline text-[20px]" />}
  />,
];

export default function RandomAlert() {
  const { user } = useAuth();
  return useMemo(
    () => (user === null ? REGISTER_ALERT : sample(ALERTS)),
    [user === null],
  );
}
