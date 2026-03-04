"use client";

import { twMerge } from "tailwind-merge";

import useRecentComments from "@/hooks/core/useRecentCommentList";
import { FaComment } from "react-icons/fa";
import Markdown from "../Markdown";
import { RecentCommentResponse } from "@/types";
import Link from "next/link";
import { Constants } from "@/constants";
import { Utils } from "@/utils";
import ReadMore from "../see-more";
import Skeleton from "react-loading-skeleton";
import { ErrorDisplay } from "../error-display";
import { Clock, ChevronRight, MessageSquare } from "lucide-react";

export default function RecentComments() {
  const { data, error, isLoading, mutate } = useRecentComments();
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between pb-2">
        <h2 className="flex items-center gap-2.5 text-xl font-bold tracking-tight text-foreground">
          <FaComment className="text-primary" />
          Bình luận gần đây
        </h2>
      </div>

      <div className="flex flex-col gap-4">
        {isLoading
          ? [...Array(10)].map((_, index) => <CommentSkeleton key={index} />)
          : data?.comments
              .slice(0, 10)
              .map((comment) => <Comment key={comment.id} comment={comment} />)}
      </div>

      {error && <ErrorDisplay error={error} refresh={mutate} />}
    </div>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <Skeleton circle className="size-10 shrink-0" />
        <div className="flex w-full max-w-[200px] flex-col gap-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div>
        <Skeleton count={2} className="h-4 w-full" />
      </div>
      <div className="mt-1 h-9 w-full rounded-md">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
    </div>
  );
}

function Comment({ comment }: { comment: RecentCommentResponse }) {
  const type =
    comment.commentable_type === "App\\Models\\Chapter" ? "chapter" : "manga";

  const userBanned = comment.user.display_roles.includes(
    Constants.Roles.BANNED,
  );
  return (
    <div className="group relative flex flex-col gap-3 rounded-xl border bg-card p-4 text-card-foreground shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <img
            alt={comment.user.name}
            className={twMerge(
              "size-10 shrink-0 rounded-full object-cover shadow-sm ring-1 ring-border",
              userBanned && "blur-sm",
            )}
            src={Utils.Url.getAvatarUrl(comment.user.avatar_path)}
            loading="lazy"
          />
          <div className="flex flex-col items-start gap-1">
            <div
              className={twMerge(
                "text-sm font-semibold leading-none tracking-tight",
                userBanned && "text-muted-foreground line-through",
              )}
              title={comment.user.name}
            >
              {comment.user.name}
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
              <Clock className="size-3" />
              {Utils.Date.formatNowDistance(new Date(comment.created_at))} trước
            </div>
          </div>
        </div>
      </div>

      <div className="break-words text-sm leading-relaxed text-foreground/90">
        {userBanned ? (
          <div className="italic text-muted-foreground">
            Bình luận đã bị xoá
          </div>
        ) : (
          <ReadMore maxHeight={150}>
            <Markdown content={comment.content} />
          </ReadMore>
        )}
      </div>

      <div className="mt-1 flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-muted group-hover:text-foreground">
        <MessageSquare className="size-3.5 shrink-0 opacity-70" />
        <div className="flex flex-wrap items-center gap-1.5 leading-snug">
          {comment.commentable.series && (
            <>
              <Link
                href={Constants.Routes.nettrom.manga(
                  comment.commentable.series.uuid,
                )}
                className="line-clamp-1 transition-colors hover:text-primary hover:underline"
                title={comment.commentable.series.title}
              >
                {comment.commentable.series.title}
              </Link>
              <ChevronRight className="size-3 shrink-0 opacity-50" />
            </>
          )}
          <Link
            href={
              type === "chapter"
                ? Constants.Routes.nettrom.chapter(comment.commentable.uuid)
                : Constants.Routes.nettrom.manga(comment.commentable.uuid)
            }
            className="line-clamp-1 transition-colors hover:text-primary hover:underline"
            title={comment.commentable.title}
          >
            {comment.commentable.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
