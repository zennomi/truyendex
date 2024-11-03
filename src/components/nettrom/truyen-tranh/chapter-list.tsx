import { useMemo, useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

import { useChapterList } from "@/hooks/mangadex";
import { Utils } from "@/utils";
import { Constants } from "@/constants";
import { DataLoader } from "@/components/DataLoader";

export default function ListChapter({ mangaId }: { mangaId: string }) {
  const [page, setPage] = useState(0);
  const { data, chapters } = useChapterList(mangaId, {
    offset: page * Constants.Mangadex.CHAPTER_LIST_LIMIT,
  });
  const chapterListData = useMemo(() => data?.data, [data]);

  return (
    <div id="nt_listchapter">
      <h2 className="mb-4 flex items-center gap-4 text-[20px] font-medium text-web-title">
        <i className="fa fa-list"></i>
        <span>Danh sách chương</span>
      </h2>
      <DataLoader isLoading={!data} loadingText="Đang tải danh sách chương">
        <div className="rounded-xl border border-muted-foreground p-4">
          <div className="heading grid grid-cols-[5fr_4fr_3fr] border-b border-muted-foreground pb-4 text-muted-foreground">
            <div className="no-wrap">Tên chương</div>
            <div className="no-wrap text-center">Cập nhật</div>
            <div className="no-wrap text-right">Nhóm dịch</div>
          </div>
          <nav>
            <ul className="flex flex-col gap-2 py-2 text-[12px]">
              {chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="grid grid-cols-[5fr_4fr_3fr] gap-2 py-2"
                >
                  <div className="" key={chapter.id}>
                    <Link
                      className="text-web-title transition hover:text-web-titleLighter"
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
            </ul>
          </nav>
        </div>
      </DataLoader>
      <div className="flex items-center justify-between gap-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event) => {
            setPage(event.selected);
          }}
          pageRangeDisplayed={5}
          pageCount={
            Math.floor(
              (chapterListData?.total || 0) /
                Constants.Mangadex.CHAPTER_LIST_LIMIT,
            ) + 1
          }
          previousLabel="<"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          pageClassName="text-center"
          containerClassName="pagination my-4"
          activeClassName="active"
          previousClassName="text-center"
          nextClassName="text-center"
          breakClassName="text-center"
          forcePage={page}
        />
        <p className="mb-0 text-muted-foreground">
          Đã hiển thị{" "}
          <span className="text-foreground">
            {(chapterListData?.offset || 0) +
              (chapterListData?.data.length || 0)}{" "}
            / {chapterListData?.total}
          </span>{" "}
          chương
        </p>
      </div>
    </div>
  );
}
