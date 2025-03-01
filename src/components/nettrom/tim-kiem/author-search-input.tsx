import { MangadexApi } from "@/api";
import { UseFormSetValue } from "react-hook-form";
import MultiSelectDropdown from "../multiselect-dropdown";
import { useCallback } from "react";

export default function AuthorSearchInput({
  values,
  setValue,
  type,
}: {
  values: MangadexApi.Manga.GetSearchMangaRequestOptions;
  setValue: UseFormSetValue<MangadexApi.Manga.GetSearchMangaRequestOptions>;
  type: "author" | "artist";
}) {
  const handleAuthorSearch = useCallback(async (query: string) => {
    const { data } = await MangadexApi.Author.getAuthor({
      name: query,
    });
    return data.data.map((author) => ({
      label: author.attributes.name,
      value: author.id,
    }));
  }, []);
  return (
    <div>
      <label>{type === "author" ? "Tác giả" : "Hoạ sĩ"}</label>
      <MultiSelectDropdown
        onChange={(authors) => {
          setValue(type === "author" ? "authors" : "artists", authors);
        }}
        options={[]}
        selectedValues={values[type === "author" ? "authors" : "artists"] || []}
        onSearch={handleAuthorSearch}
        anyLabel={type === "author" ? "Tất cả tác giả" : "Tất cả hoạ sĩ"}
      />
    </div>
  );
}
