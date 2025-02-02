import { AppApi } from "@/api";
import { CommentRepliesResponse } from "@/types";
import useSWRInfinite from "swr/infinite";

export const useCommentReplyList = (firstLastId: number | null) => {
  const getKey = (
    _: number,
    previousPageData: CommentRepliesResponse | null,
  ) => {
    if (!firstLastId) return null;
    if (previousPageData && previousPageData.replies.length === 0) return null; // Stop fetching if no next cursor
    return [
      {
        lastId: previousPageData
          ? previousPageData.replies[previousPageData.replies.length - 1].id
          : firstLastId,
      },
    ];
  };

  return useSWRInfinite(
    getKey, // Pass both URL and body
    ([body]) => AppApi.Comment.getCommentReplyList(body), // Fetcher uses both URL and body
  );
};
