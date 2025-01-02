import { AppApi } from "@/api";
import useSWR from "swr";

export const useCommentList = (params: {
  type: "chapter" | "series" | "page";
  typeId: string;
  page: number;
}) => {
  return useSWR(["comment-list", params], () =>
    AppApi.Comment.getCommentList(params),
  );
};
