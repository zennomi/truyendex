"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Utils } from "@/utils";

export default function SearchInput() {
  const params = useSearchParams();
  const router = useRouter();
  const [title, setTitle] = useState(params.get("title") || "");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const options = Utils.Mangadex.normalizeParams(params);
    options.title = title;
    router.push(Utils.Url.getSearchNetTromUrl(options));
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        className="searchinput form-control"
        placeholder="Tìm truyện..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <div className="input-group-btn">
        <input
          type="submit"
          value=""
          className="searchbutton btn btn-default"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}
