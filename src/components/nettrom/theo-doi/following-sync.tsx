import { useState } from "react";
import { Button } from "../Button";
import Iconify from "@/components/iconify";
import useHostname from "@/hooks/useHostname";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { toast } from "react-toastify";
import Link from "next/link";
import { Constants } from "@/constants";

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
          className="form-select"
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
      </ul>
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
      <div>Sao chép script phía dưới và patse vào tab Console.</div>
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
    </div>
  );
}

function Step5({ source }: { source: string }) {
  return (
    <div>
      <div>
        Làm theo hướng dẫn của script. Nếu gặp bất cứ vấn đề nào, hãy nhắn tin
        để mình có thể hỗ trợ.
      </div>
      <Link href={Constants.Routes.report} target="_blank">
        <Button icon={<Iconify icon="fa:comment" />}>Hỗ trợ</Button>
      </Link>
    </div>
  );
}
