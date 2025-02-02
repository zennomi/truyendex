import { AppApi } from "@/api";
import useSWR from "swr";

export default function useRecentComments() {
  return useSWR("recent-comments", () =>
    AppApi.Comment.getRecentCommentList({ limit: 15 }),
  );
}
