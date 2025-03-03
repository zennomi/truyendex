import { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import Image from "next/image";

import Iconify from "@/components/iconify";
import useHostname from "@/hooks/useHostname";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Constants } from "@/constants";

import OpenDevToolsImage from "@/assets/sync-guide/open-dev-tools.jpg";
import OpenConsoleImage from "@/assets/sync-guide/open-console.jpg";
import CMangaSyncImage from "@/assets/sync-guide/cmanga-sync.png";

import { Button } from "../Button";

const headingClassName = "text-3xl text-orange-500 mt-3";

export default function FollowingSync() {
  const [source, setSource] = useState<string>("");
  return (
    <div>
      <div>
        Hướng dẫn đồng danh sách theo dõi truyện từ CManga, MangaDex, CuuTruyen
        sang TruyenDex
      </div>
      <div className="text-base text-gray-300">
        <b>Lưu ý:</b> Các thao tác phía dưới chỉ thực hiện được trên thiết bị
        máy tính/laptop.
      </div>
      <div className={headingClassName}>Bước 1:</div>

      <div className="flex items-center gap-2">
        <div>Chọn nguồn muốn đồng bộ:</div>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="form-select text-black"
        >
          <option value="">Chọn nguồn</option>
          <option value="cmanga">CManga</option>
          <option value="mangadex">MangaDex</option>
          <option value="cuutruyen">CuuTruyen</option>
        </select>
      </div>

      <div className="text-base text-gray-300">
        <b>Lưu ý:</b> Bạn có thể đồng bộ NetTruyen, TruyenQQ sang CManga, rồi
        đồng bộ CManga sang TruyenDex.
      </div>

      <div className={headingClassName}>Bước 2:</div>
      {source ? (
        <Step2 source={source} />
      ) : (
        <div>Vui lòng chọn nguồn đồng bộ</div>
      )}

      <div className={headingClassName}>Bước 3:</div>
      {source ? (
        <Step3 source={source} />
      ) : (
        <div>Vui lòng chọn nguồn đồng bộ</div>
      )}

      <div className={headingClassName}>Bước 4:</div>
      {source ? (
        <Step4 source={source} />
      ) : (
        <div>Vui lòng chọn nguồn đồng bộ</div>
      )}

      <div className={headingClassName}>Bước 5:</div>
      {source ? (
        <Step5 source={source} />
      ) : (
        <div>Vui lòng chọn nguồn đồng bộ</div>
      )}
    </div>
  );
}

function Step2({ source }: { source: string }) {
  return (
    <div>
      Truy cập {source} và <b>đăng nhập</b>.
      {source === "cmanga" && (
        <>
          <div>
            Sau khi đăng nhập vào CManga, bạn có thể đồng bộ truyện từ NetTruyen
            và TruyenQQ sang CManga trước.
          </div>
          <Image className="mt-1" src={CMangaSyncImage} alt="CManga" />
        </>
      )}
    </div>
  );
}

function Step3({ source }: { source: string }) {
  return (
    <div>
      <div>Tại website của {source}, mở tab Console của Developer Tools:</div>
      <ul>
        <li>Windows: Ctrl + Shift + J</li>
        <li>Mac: Command (⌘) + Option (⌥) + J</li>
        <li>Hoặc làm thủ công theo bước dưới để mở Developer Tools:</li>
      </ul>
      <Image
        className="mt-1"
        src={OpenDevToolsImage}
        alt="Mở Developer Tools"
      />
    </div>
  );
}

function Step4({ source }: { source: string }) {
  const hostname = useHostname();
  const script = `fetch("https://${hostname}/api/sync-script").then((r)=>r.text()).then((c)=>{eval(c)})`;
  const [_, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        toast.success("Đã sao chép script!");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <div>
      <div>
        Mở tab Console, sao chép script phía dưới, dán vào Console và bấm Enter.
      </div>
      <pre className="whitespace-pre-wrap break-words rounded bg-gray-800 p-4 text-white">
        <code className="whitespace-pre-wrap break-words">{script}</code>
      </pre>
      <Button
        className=""
        icon={<Iconify icon="fa:copy" />}
        onClick={handleCopy(script)}
      >
        Sao chép
      </Button>
      <Image className="mt-1" src={OpenConsoleImage} alt="Mở Console" />
    </div>
  );
}

function Step5({ source }: { source: string }) {
  return (
    <div>
      <div>
        Làm theo các hướng dẫn còn lại. Nếu gặp bất cứ vấn đề nào, hãy nhắn tin
        để mình có thể hỗ trợ.
      </div>
      <Link href={Constants.Routes.report} target="_blank">
        <Button icon={<Iconify icon="fa:comment" />}>Hỗ trợ</Button>
      </Link>
    </div>
  );
}
