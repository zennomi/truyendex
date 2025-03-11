import { useHengpt } from "./contexts";
import { HentagTag } from "./hentag-tag";

export default function HentaiSearch() {
  const { tags } = useHengpt();

  if (tags.length === 0) {
    return null;
  }

  return (
    <div>
      <h1 className="mb-2 text-lg font-semibold">Kết quả tìm kiếm</h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <HentagTag key={tag.value} tag={tag} />
        ))}
      </div>
    </div>
  );
}
