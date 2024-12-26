import { axios } from "./axios";

export const storeComment = async (body: {
  content: string;
  type: string;
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
