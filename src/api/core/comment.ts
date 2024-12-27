import { CommentListResponse } from "@/types";
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

export const getCommentList = async (params: {
  type: "chapter" | "series" | "page";
  typeId: string;
}) => {
  const { data } = await axios<CommentListResponse>({
    url: "/api/comment/list",
    params: {
      type: params.type,
      type_id: params.typeId,
    },
  });
  return data;
};
