import { Constants } from "@/constants";
import { ScanlationGroup } from "@/types/mangadex";
import Link from "next/link";

export default function ScanlationGroupInformation({
  group,
  canNext,
}: {
  group: ScanlationGroup;
  canNext: boolean;
}) {
  return (
    <div className="my-4 rounded-lg px-2 py-2">
      {!canNext && (
        <div className="text-center text-lg text-gray-500">
          Mãi không thấy chương mới? Giục tại đây 👇🏻
        </div>
      )}
      <div className="flex flex-col items-baseline justify-center gap-0 md:flex-row md:gap-3">
        <div>Nhóm dịch</div>
        <Link
          href={Constants.Routes.nettrom.scanlationGroup(group.id)}
          className="text-[20px] font-bold text-orange-500"
        >
          {group.attributes.name}
        </Link>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {group.attributes.website && (
          <Link
            className="btn bg-orange-500"
            href={group.attributes.website}
            target="_blank"
          >
            Website
          </Link>
        )}
        {group.attributes.discord && (
          <Link
            className="btn bg-orange-500"
            href={`https://discord.gg/${group.attributes.discord}`}
            target="_blank"
          >
            Discord
          </Link>
        )}
        {group.attributes.twitter && (
          <Link
            className="btn bg-orange-500"
            href={group.attributes.twitter}
            target="_blank"
          >
            Twitter
          </Link>
        )}
      </div>
    </div>
  );
}
