import { Metadata } from "next";
import HistoryList from "@/components/nettrom/lich-su/history-list";
import TopTitles from "@/components/nettrom/trang-chu/top-titles";
import { Constants } from "@/constants";

export const metadata: Metadata = {
  title: `Lịch sử đọc truyện tại ${Constants.APP_NAME}`,
  metadataBase: new URL(Constants.APP_URL),
};

export default function History() {
  return (
    <>
      <div id="ctl00_Breadcrumbs_pnlWrapper"></div>
      <div className="row">
        <div id="ctl00_divCenter" className="center-side col-md-8">
          <div className="mrb10 Module Module-233">
            <div className="ModuleContent">
              <h1 className="page-title">
                Lịch sử đọc truyện <em className="fa fa-angle-right" />
              </h1>
              <div className="mrt15 visited-tab">
                <ul
                  className="comment-nav text-center"
                  style={{ fontSize: 16, marginBottom: 15 }}
                >
                  <li className="active">
                    <a>Từ thiết bị</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <HistoryList />
        </div>
        <div id="ctl00_divRight" className="right-side col-md-4 cmszone">
          <TopTitles />
        </div>
      </div>
    </>
  );
}
