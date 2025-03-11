import { HentagTag as THengtagTag } from "./types";

export function HentagTag({ tag }: { tag: THengtagTag }) {
  return (
    <div className="flex items-center justify-center rounded-lg bg-purple-600 px-2 py-1">
      <span className="text-sm font-semibold">{tag.value}</span>
    </div>
  );
}
