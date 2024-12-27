"use client";

import { useAuth } from "@/hooks/useAuth";
import CommentEditor from "./comment-editor";
import Iconify from "@/components/iconify";
import { useCommentList } from "@/hooks/core";

export default function CommentSection({
  typeId,
  type,
}: {
  typeId: string;
  type: "series" | "chapter";
}) {
  const { user } = useAuth();
  const { data } = useCommentList({ type, typeId });
  return (
    <div>
      <ul className="nav nav-tabs main-tab lazy-module">
        <li className="active">
          <a data-toggle="tab" href="#nt_comments">
            <Iconify className="mr-2 inline" icon="fa:comments" />
            NetTruyen
          </a>
        </li>
      </ul>
      <div className="comment-wrapper">
        {user ? <CommentEditor typeId={typeId} type={type} /> : <></>}
        <div className="comment-list comment-default">
          <div className="item clearfix" id="comment_3259">
            <figure className="avatar avatar-wrap">
              <img
                src="https://nettruyenrr.com/public/assets/images/avatar-comment-default.jpg"
                alt="Culi Nettruyen"
                className="lazy"
                data-original="https://nettruyenrr.com/public/assets/images/avatar-comment-default.jpg"
              />
            </figure>
            <div className="summary">
              <div className="info">
                <div className="comment-header">
                  <span className="authorname name-1">CuLi Nettruyen</span>
                  <span className="cmchapter" />
                </div>
                <div className="comment-content">
                  Bình luận ở bên dưới, click vào Xem thêm bình luận để xem!
                </div>
              </div>
              <ul className="comment-footer">
                <li>
                  <span>
                    <i className="fa fa-comment"> </i> Trả lời
                  </span>
                </li>
                <li>
                  <span className="vote-up">
                    <i className="fa fa-thumbs-up"> </i>
                    <span className="vote-up-count">0</span>
                  </span>
                </li>
                <li className="comment-more-wrap">
                  <span className="more-action">
                    <i className="fa fa-ellipsis-h"> </i>
                  </span>
                  <ul className="comment-more hidden">
                    <li>
                      <span>Xóa</span>
                    </li>
                  </ul>
                </li>
                <li>
                  <abbr title="2024-07-16 11:08:18">
                    <i className="fa fa-clock-o"> </i> 0 phút trước
                  </abbr>
                </li>
              </ul>
              <div id="comment_form_3259" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
