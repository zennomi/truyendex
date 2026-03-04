import ReactPaginate, { ReactPaginateProps } from "react-paginate";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

export default function Pagination(props: ReactPaginateProps) {
  if (!props.pageCount || props.pageCount <= 1) return null;
  return (
    <div
      id="ctl00_mainContent_ctl00_divPager"
      className="flex w-full items-center justify-center"
    >
      <ReactPaginate
        breakLabel={
          <span className="flex h-9 w-9 items-center justify-center text-muted-foreground/70 sm:h-10 sm:w-10">
            <MoreHorizontal className="h-4 w-4" />
          </span>
        }
        nextLabel={
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        }
        previousLabel={
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
        }
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        containerClassName="flex items-center justify-center gap-1 sm:gap-2 rounded-full border border-border/40 bg-background/40 p-1.5 shadow-sm backdrop-blur-md"
        pageLinkClassName="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
        activeLinkClassName="!text-primary-foreground !bg-primary shadow-md shadow-primary/25 border-transparent pointer-events-none scale-105"
        previousLinkClassName="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 hover:bg-muted hover:border-border transition-all duration-200 text-foreground"
        nextLinkClassName="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/50 bg-background/50 hover:bg-muted hover:border-border transition-all duration-200 text-foreground"
        disabledClassName="opacity-50 cursor-not-allowed pointer-events-none"
        breakLinkClassName="flex items-center justify-center"
        {...props}
      />
    </div>
  );
}
