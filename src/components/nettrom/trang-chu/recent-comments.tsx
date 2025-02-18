"use client";

import { DataLoader } from "@/components/DataLoader";
import useRecentComments from "@/hooks/core/useRecentCommentList";
import { FaComment } from "react-icons/fa";
import Markdown from "../Markdown";
import { RecentCommentResponse } from "@/types";
import Link from "next/link";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import ReadMore from "../see-more";

export default function RecentComments() {
  const { data, error, isLoading } = useRecentComments();
  return (
    <div>
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="flex items-center gap-4 text-[20px] font-medium text-web-title">
          <FaComment />
          Bình luận gần đây
        </h2>
      </div>
      <DataLoader isLoading={isLoading} error={error}>
        {data?.comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </DataLoader>
    </div>
  );
}

function Comment({ comment }: { comment: RecentCommentResponse }) {
  const type =
    comment.commentable_type === "App\\Models\\Chapter" ? "chapter" : "manga";
  return (
    <div key={comment.id}>
      <div className="mb-2">
        <div>
          <Link
            href={
              type === "chapter"
                ? Constants.Routes.nettrom.chapter(comment.commentable.uuid)
                : Constants.Routes.nettrom.manga(comment.commentable.uuid)
            }
            className="font-bold"
          >
            {comment.commentable.title}
          </Link>
          {comment.commentable.series && (
            <>
              {" - "}
              <Link
                href={Constants.Routes.nettrom.manga(
                  comment.commentable.series.uuid,
                )}
                className="font-bold"
              >
                {comment.commentable.series.title}
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="overflow-hidden">
        <ReadMore maxHeight={150}>
          <Markdown content={comment.content} />
        </ReadMore>
      </div>
      <div className="mt-2 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-full"
            src={Utils.Url.getAvatarUrl(comment.user.avatar_path)}
          />
          <div className="max-w-[200px] truncate font-bold">
            {comment.user.name}
          </div>
        </div>
        <div className="whitespace-nowrap text-lg text-gray-500">
          {Utils.Date.formatNowDistance(new Date(comment.created_at))} trước
        </div>
      </div>
      <div className="mb-2 mt-3 w-full border-b border-gray-700"></div>
    </div>
  );
}
