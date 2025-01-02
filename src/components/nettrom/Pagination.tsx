import ReactPaginate, { ReactPaginateProps } from "react-paginate";

export default function Pagination(props: ReactPaginateProps) {
  if (!props.pageCount || props.pageCount <= 1) return <></>;
  return (
    <div id="ctl00_mainContent_ctl00_divPager" className="pagination-outter">
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        pageRangeDisplayed={5}
        previousLabel="<"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
        pageClassName="text-center"
        containerClassName="pagination"
        activeClassName="active"
        previousClassName="text-center"
        nextClassName="text-center"
        breakClassName="text-center"
        {...props}
      />
    </div>
  );
}
