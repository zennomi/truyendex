import { CommentListResponse, CommentRepliesResponse } from "@/types";
import { axios } from "./axios";

export const storeComment = async (body: {
  content: string;
  type: "series" | "chapter";
  typeId: string;
  parentId: number;
}) => {
  const { data } = await axios({
    url: "/api/comment/store",
    method: "POST",
    data: {
      content: body.content,
      type: body.type,
      type_id: body.typeId,
      parent_id: body.parentId,
    },
  });
  return data;
};

export const updateComment = async (body: { content: string; id: number }) => {
  const { data } = await axios({
    url: "/api/comment/update",
    method: "POST",
    data: {
      content: body.content,
      id: body.id,
    },
  });
  return data;
};

export const deleteComment = async (body: { id: number }) => {
  const { data } = await axios({
    url: "/api/comment/delete",
    method: "POST",
    data: {
      id: body.id,
    },
  });
  return data;
};

export const getCommentList = async (params: {
  type: "chapter" | "series" | "page";
  typeId: string;
  page?: number;
  limit?: number;
}) => {
  const { data } = await axios<CommentListResponse>({
    url: "/api/comment/list",
    params: {
      type: params.type,
      type_id: params.typeId,
      page: params.page || 1,
    },
  });
  return data;
};

export const getCommentReplyList = async (params: { lastId: number }) => {
  const { data } = await axios<CommentRepliesResponse>({
    url: "/api/comment/fetch-reply",
    data: {
      last_id: params.lastId,
    },
    method: "POST",
  });
  return data;
};
