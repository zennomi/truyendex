import { AppApi } from "@/api";
import useSWR from "swr";

export const useCommentList = (params: {
  type: "chapter" | "series" | "page";
  typeId: string;
}) => {
  return useSWR(["comment-list", params], () =>
    AppApi.Comment.getCommentList(params),
  );
};
