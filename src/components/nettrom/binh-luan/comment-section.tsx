"use client";

import { useAuth } from "@/hooks/useAuth";
import CommentEditor from "./comment-editor";
import Iconify from "@/components/iconify";
import { useCommentList } from "@/hooks/core";
import { useEffect, useState } from "react";
import Pagination from "../Pagination";
import { Utils } from "@/utils";
import Markdown from "../Markdown";
import { CommentResponse } from "@/types";

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
  const { data, mutate } = useCommentList({ type, typeId, page: page + 1 });

  useEffect(() => {
    if (data)
      setPageTotal(
        Math.floor(data.comments.total / data.comments.per_page) + 1,
      );
  }, [data, setPageTotal]);

  return (
    <div>
      <ul className="nav nav-tabs main-tab lazy-module">
        <li className="active">
          <a data-toggle="tab" href="#nt_comments">
            <Iconify className="mr-2 inline" icon="fa:comments" />
            Bình luận
          </a>
        </li>
      </ul>
      <div className="comment-wrapper">
        {user ? (
          <CommentEditor
            typeId={typeId}
            type={type}
            afterComment={() => mutate()}
          />
        ) : (
          <></>
        )}
        <div className="comment-list comment-default">
          {data?.comments.data.map((comment) => (
            <CommentItem comment={comment} typeId={typeId} type={type} />
          ))}
        </div>
        <Pagination
          forcePage={page}
          pageCount={pageTotal}
          onPageChange={(event) => setPage(event.selected)}
        />
      </div>
    </div>
  );
}

export function CommentItem({
  comment,
  type,
  typeId,
}: {
  comment: CommentResponse;
  typeId: string;
  type: "series" | "chapter";
}) {
  const [openReply, setOpenReply] = useState(false);
  return (
    <div className="item clearfix pb-0" key={comment.id}>
      <figure className="avatar avatar-wrap">
        <img
          src={"/nettruyen/images/default-avatar.jpg"}
          alt={comment.user.name}
          className="lazy"
        />
      </figure>
      <div className="summary">
        <div className="info">
          <div className="comment-header">
            <span className="authorname name-1">{comment.user.name}</span>
            <span className="cmchapter" />
          </div>
          <div className="comment-content">
            <Markdown content={comment.content} />
          </div>
        </div>
        <ul className="comment-footer">
          <li>
            <span onClick={() => setOpenReply(!openReply)}>
              <i className="fa fa-comment"> </i> Trả lời
            </span>
          </li>
          <li>
            <abbr>
              <i className="fa fa-clock-o"> </i>{" "}
              {Utils.Date.formatNowDistance(new Date(comment.created_at))}
            </abbr>
          </li>
        </ul>
        {openReply && (
          <CommentEditor type={type} typeId={typeId} parentId={comment.id} />
        )}
      </div>
    </div>
  );
}
