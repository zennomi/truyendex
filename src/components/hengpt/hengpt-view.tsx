"use client";

import { HengptProvider } from "./contexts";
import HentaiSearch from "./hentai-search";
import TagSearch from "./tag-search";

const HenGptView = () => {
  return (
    <HengptProvider>
      <div className="h-screen bg-gray-100 dark:bg-slate-950">
        <div className="container">
          <TagSearch />
          <HentaiSearch />
        </div>
      </div>
    </HengptProvider>
  );
};

export default HenGptView;
