import { Metadata } from "next";
import { Suspense } from "react";
import SearchMangaForm from "@/components/nettrom/tim-kiem/search-manga-form";
import MangaResults from "@/components/nettrom/tim-kiem/manga-results";
import { Constants } from "@/constants";

export const metadata: Metadata = {
  title: `Tìm truyện đọc tại ${Constants.APP_NAME}`,
};

export default function AdvancedSearch() {
  return (
    <>
      <div className="row">
        <div className="full-width col-sm-12">
          <div className="Module Module-239">
            <div className="ModuleContent"></div>
          </div>
          <div className="Module Module-222">
            <div className="ModuleContent">
              <div className="comic-filter mrb10">
                <h1 className="text-center">Tìm truyện nâng cao</h1>
              </div>
              <Suspense>
                <SearchMangaForm />
              </Suspense>
            </div>
          </div>
          <Suspense>
            <MangaResults />
          </Suspense>
        </div>
      </div>
    </>
  );
}
