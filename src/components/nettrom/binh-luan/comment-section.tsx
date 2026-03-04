"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { last } from "lodash";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { useAuth } from "@/hooks/useAuth";
import Iconify from "@/components/iconify";
import { useCommentList, useCommentReplyList } from "@/hooks/core";
import { CommentResponse, UserResponse } from "@/types";
import { Utils } from "@/utils";
import { AppApi } from "@/api";
import { Constants } from "@/constants";

import Pagination from "../Pagination";
import Markdown from "../Markdown";
import CommentEditor from "./comment-editor";
import RoleBadge from "../role-badge";
import ReadMore from "../see-more";

export default function CommentSection({
  typeId,
  type,
}: {
  typeId: string;
  type: "series" | "chapter";
}) {
  const { user } = useAuth();
  const [page, setPage] = useState(0);
  const [pageTotal, setPageTotal] = useState(1);
  const commentListRef = useRef<HTMLDivElement>(null);
  const { data, mutate } = useCommentList({ type, typeId, page: page + 1 });

  const onSubmitComment = useCallback(
    async (content: string) => {
      try {
        await AppApi.Comment.storeComment({
          content,
          type,
          typeId,
          parentId: 0,
        });
        toast("Bình luận thành công!");
        mutate();
      } catch (error) {
        Utils.Error.handleError(error);
      }
    },
    [mutate, typeId, type],
  );

  useEffect(() => {
    if (data)
      setPageTotal(
        Math.floor(data.comments.total / data.comments.per_page) + 1,
      );
  }, [data, setPageTotal]);

  return (
    <div ref={commentListRef} className="mt-8 flex flex-col gap-6">
      <div className="flex items-center gap-3 border-b border-neutral-200 pb-3 dark:border-neutral-800">
        <Iconify className="text-xl text-primary" icon="fa6-solid:comments" />
        <h3 className="text-xl font-bold uppercase text-primary">Bình luận</h3>
      </div>
      <div className="flex flex-col gap-6">
        {user ? <CommentEditor onSumbit={onSubmitComment} /> : null}
        <div className="flex flex-col gap-6">
          {data?.comments.data.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              typeId={typeId}
              type={type}
              user={user}
              refresh={() => mutate()}
            />
          ))}
        </div>
        <Pagination
          forcePage={page}
          pageCount={pageTotal}
          onPageChange={(event) => {
            setPage(event.selected);
            commentListRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
        />
      </div>
    </div>
  );
}

export function CommentItem({
  comment,
  type,
  typeId,
  user,
  refresh,
}: {
  comment: CommentResponse;
  typeId: string;
  type: "series" | "chapter";
  user?: UserResponse | null;
  refresh: () => void;
}) {
  const [openReply, setOpenReply] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [viewMore, setViewMore] = useState(false);

  const { data, size, setSize, isLoading } = useCommentReplyList(
    viewMore && comment.reply_count > 2 && comment.replies
      ? last(comment.replies)!.id
      : null,
  );

  const replies = data ? data.flatMap((page) => page.replies) : [];
  const isReachingEnd = comment.reply_count <= replies.length + 2;

  const onSubmitReply = useCallback(
    async (content: string) => {
      try {
        await AppApi.Comment.storeComment({
          content,
          type:
            comment.commentable_type === "App\\Models\\Series"
              ? "series"
              : "chapter",
          typeId: comment.commentable.uuid,
          parentId: comment.id,
        });
        toast("Trả lời bình luận thành công!");
        refresh();
        setOpenReply(false);
      } catch (error) {
        Utils.Error.handleError(error);
      }
    },
    [comment.id, type, typeId],
  );

  const onDeleteComment = useCallback(async () => {
    try {
      await AppApi.Comment.deleteComment({
        id: comment.id,
      });
      toast("Xoá lời bình luận thành công!");
      refresh();
    } catch (error) {
      Utils.Error.handleError(error);
    }
  }, [comment.id]);

  const onSubmitEditedComment = useCallback(
    async (content: string) => {
      try {
        await AppApi.Comment.updateComment({
          content,
          id: comment.id,
        });
        toast("Sửa lời bình luận thành công!");
        refresh();
        setEditMode(false);
      } catch (error) {
        Utils.Error.handleError(error);
      }
    },
    [comment.id],
  );

  const userBanned = comment.user.display_roles.includes(
    Constants.Roles.BANNED,
  );

  return (
    <div className="group flex gap-3 md:gap-4" key={comment.id}>
      <div className="flex-shrink-0">
        <img
          src={Utils.Url.getAvatarUrl(comment.user.avatar_path)}
          alt={comment.user.name}
          className={twMerge(
            "h-10 w-10 rounded-full object-cover shadow-sm md:h-12 md:w-12",
            userBanned && "blur",
          )}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        {editMode ? (
          <CommentEditor
            content={comment.content}
            onSumbit={onSubmitEditedComment}
          />
        ) : (
          <div className="rounded-2xl rounded-tl-none bg-neutral-100 px-4 pb-4 pt-2 dark:bg-neutral-800/50">
            <div className="mb-2 flex items-center gap-2">
              <div
                className={twMerge(
                  "truncate text-sm font-semibold text-neutral-900 md:text-base dark:text-neutral-100",
                  userBanned &&
                    "text-neutral-500 line-through dark:text-neutral-400",
                )}
              >
                {comment.user.name}
              </div>
              {comment.user.display_roles.map((role) => (
                <RoleBadge key={role} role={role} />
              ))}
              {type === "series" &&
                comment.commentable_type === "App\\Models\\Chapter" &&
                comment.parent_id === 0 && (
                  <div className="truncate text-xs text-neutral-500 md:text-sm">
                    tại chương{" "}
                    <Link
                      href={Constants.Routes.nettrom.chapter(
                        comment.commentable.uuid,
                      )}
                      className="font-medium text-primary hover:underline"
                    >
                      {comment.commentable.title}
                    </Link>
                  </div>
                )}
            </div>
            <div className="prose prose-sm dark:prose-invert md:prose-base prose-p:my-1 max-w-none text-neutral-700 dark:text-neutral-300">
              {userBanned ? (
                <div className="italic text-neutral-500">
                  Bình luận đã bị xoá
                </div>
              ) : (
                <ReadMore>
                  <Markdown content={comment.content} />
                </ReadMore>
              )}
            </div>
          </div>
        )}
        <div className="mt-2 flex items-center gap-4 px-2 text-xs font-medium text-neutral-500 md:text-sm">
          {user && comment.parent_id === 0 && (
            <button
              onClick={() => setOpenReply(!openReply)}
              className="flex items-center gap-1.5 transition-colors hover:text-primary"
            >
              <Iconify icon="lucide:reply" className="h-4 w-4" />
              Trả lời
            </button>
          )}

          <div className="flex items-center gap-1.5">
            <Iconify icon="lucide:clock" className="h-4 w-4" />
            {Utils.Date.formatNowDistance(new Date(comment.created_at))} trước
          </div>

          {user && user.id === comment.user.id && (
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1.5 outline-none transition-colors hover:text-primary focus:outline-none">
                <Iconify icon="lucide:more-horizontal" className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-40">
                <DropdownMenuItem
                  onClick={() => setEditMode(!editMode)}
                  className="cursor-pointer gap-2 px-4 py-2"
                >
                  <Iconify
                    icon={editMode ? "lucide:x" : "lucide:edit-2"}
                    className="h-4 w-4"
                  />
                  {editMode ? "Thoát sửa" : "Sửa"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => onDeleteComment()}
                  className="cursor-pointer gap-2 px-4 py-2 text-red-600 focus:text-red-700 dark:text-red-400 focus:dark:text-red-300"
                >
                  <Iconify icon="lucide:trash-2" className="h-4 w-4" />
                  Xoá
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {openReply && (
          <div className="mt-4">
            <CommentEditor onSumbit={onSubmitReply} />
          </div>
        )}

        {((comment.replies && comment.replies.length > 0) ||
          replies.length > 0) && (
          <div className="mt-4 flex flex-col gap-4">
            {comment.replies &&
              comment.replies.map((replyComment) => (
                <CommentItem
                  key={replyComment.id}
                  comment={replyComment}
                  refresh={refresh}
                  type={type}
                  typeId={typeId}
                  user={user}
                />
              ))}
            {replies.map((replyComment) => (
              <CommentItem
                key={replyComment.id}
                comment={replyComment}
                refresh={refresh}
                type={type}
                typeId={typeId}
                user={user}
              />
            ))}
          </div>
        )}

        {!isReachingEnd &&
          comment.parent_id === 0 &&
          comment.reply_count > 2 && (
            <button
              onClick={() =>
                !viewMore ? setViewMore(true) : setSize(size + 1)
              }
              disabled={isLoading}
              className="mt-4 flex items-center gap-2 self-start rounded-full bg-neutral-100 px-4 py-1.5 text-sm font-semibold text-primary transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              <Iconify
                icon={isLoading ? "lucide:loader-2" : "lucide:chevron-down"}
                className={twMerge("h-4 w-4", isLoading && "animate-spin")}
              />
              {isLoading ? "Đang tải..." : "Xem thêm câu trả lời"}
            </button>
          )}
      </div>
    </div>
  );
}
