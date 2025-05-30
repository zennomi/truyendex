import Link from "next/link";

import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";
import { ChapterList, ExtendChapter } from "@/types/mangadex";
import Pagination from "../Pagination";

export default function ListChapter({
  mangaId,
  ...props
}: {
  mangaId: string;
  onPageChange?: (page: number) => void;
  page: number;
  data?: ChapterList;
  items: ExtendChapter[];
}) {
  return (
    <div id="nt_listchapter">
      <h2 className="mb-4 flex items-center gap-4 text-[20px] font-medium text-web-title">
        <i className="fa fa-list"></i>
        <span>Danh sách chương</span>
      </h2>
      <DataLoader
        isLoading={!props.data}
        loadingText="Đang tải danh sách chương"
      >
        <div className="rounded-xl border border-muted-foreground p-4">
          <div className="heading grid grid-cols-[5fr_4fr_3fr] border-b border-muted-foreground pb-4 text-muted-foreground">
            <div className="no-wrap">Tên chương</div>
            <div className="no-wrap text-center">Cập nhật</div>
            <div className="no-wrap text-right">Nhóm dịch</div>
          </div>
          <nav>
            <ul className="flex flex-col gap-2 py-2 text-[12px]">
              {props.items.map((chapter) => (
                <li
                  key={chapter.id}
                  className="grid grid-cols-[5fr_4fr_3fr] gap-2 py-2"
                >
                  <div className="" key={chapter.id}>
                    <Link
                      className="text-web-title transition visited:text-web-titleDisabled hover:text-web-titleLighter"
                      href={Constants.Routes.nettrom.chapter(chapter.id)}
                    >
                      {Utils.Mangadex.getChapterTitle(chapter)}
                    </Link>
                  </div>
                  <div className="no-wrap text-center text-muted-foreground">
                    {Utils.Date.formatDateTime(
                      new Date(chapter.attributes.readableAt),
                    )}
                  </div>
                  {chapter.scanlation_group?.attributes && (
                    <Link
                      href={Constants.Routes.nettrom.scanlationGroup(
                        chapter.scanlation_group.id,
                      )}
                      className="text-right text-web-title transition hover:text-web-titleLighter"
                    >
                      {chapter.scanlation_group.attributes.name}
                    </Link>
                  )}
                </li>
              ))}
              {props.items.length === 0 && (
                <li className="py-3 text-center text-muted-foreground">
                  Không có chương nào. Bạn hãy thử đổi ngôn ngữ trong phần cài
                  đặt.
                  <br />
                  Hoặc tệ hơn, bộ truyện này đã bị gỡ khỏi MangaDex.
                </li>
              )}
            </ul>
          </nav>
        </div>
      </DataLoader>
      <div className="flex items-center justify-between gap-4">
        <Pagination
          onPageChange={(event) => {
            props.onPageChange?.(event.selected);
          }}
          pageCount={
            Math.floor(
              (props.data?.total || 0) / Constants.Mangadex.CHAPTER_LIST_LIMIT,
            ) + 1
          }
          forcePage={props.page}
        />
        <p className="mb-0 ml-auto py-4 text-muted-foreground">
          Đã hiển thị{" "}
          <span className="text-foreground">
            {(props.data?.offset || 0) + (props.data?.data.length || 0)} /{" "}
            {props.data?.total}
          </span>{" "}
          chương
        </p>
      </div>
    </div>
  );
}
