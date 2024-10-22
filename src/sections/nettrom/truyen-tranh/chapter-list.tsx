import { useState } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";

import { useChapterList } from "@/hooks/mangadex";
import { ChapterList } from "@/types/mangadex";
import routes from "@/routes";
import { formatDateTime } from "@/utils/date-fns";
import Loading from "@/sections/nettrom/layout/loading";
import { getChapterTitle } from "@/utils/mangadex";
import { CHAPTER_LIST_LIMIT } from "@/constants";

export default function ListChapter({ mangaId }: { mangaId: string }) {
  const [page, setPage] = useState(0);
  const { data, chapters } = useChapterList(mangaId, {
    offset: page * CHAPTER_LIST_LIMIT,
  });
  if (!data?.data || !(data.data as ChapterList).data)
    return <Loading title="Đang tải danh sách chương..." />;
  const chapterListData = data.data as ChapterList;

  return (
    <div className="list-chapter mb-2" id="nt_listchapter">
      <h2 className="list-title clearfix">
        <i className="fa fa-list"></i> Danh sách chương
      </h2>
      <div className="row heading">
        <div className="col-xs-5 no-wrap">Tên chương</div>
        <div className="col-xs-4 no-wrap text-center">Cập nhật</div>
        <div className="col-xs-3 no-wrap text-center">Nhóm dịch</div>
      </div>
      <nav>
        <ul>
          {chapters.map((chapter) => (
            <li className="row" key={chapter.id}>
              <div className="col-xs-5 chapter" key={chapter.id}>
                <Link href={routes.nettrom.chapter(chapter.id)}>
                  {getChapterTitle(chapter)}
                </Link>
              </div>
              <div className="col-xs-4 text-center no-wrap small">
                {formatDateTime(new Date(chapter.attributes.readableAt))}
              </div>
              {chapter.scanlation_group?.attributes && (
                <Link
                  href={routes.nettrom.scanlationGroup(
                    chapter.scanlation_group.id,
                  )}
                  className="col-xs-3 text-center"
                >
                  {chapter.scanlation_group.attributes.name}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={(event) => {
          setPage(event.selected);
        }}
        pageRangeDisplayed={5}
        pageCount={Math.floor(chapterListData.total / CHAPTER_LIST_LIMIT) + 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageClassName="text-center"
        containerClassName="pagination"
        activeClassName="active"
        previousClassName="text-center"
        nextClassName="text-center"
        breakClassName="text-center"
        forcePage={page}
      />
    </div>
  );
}
