import { ReadListResponse } from "@/types";
import { axios } from "./axios";

export const getReadList = async (query: { page?: number } = {}) => {
  const { data } = await axios<ReadListResponse>({
    url: "/api/user/read-list",
    params: { ...query },
  });
  return data;
};

export const syncReadList = async (body: { source: string; ids: string[] }) => {
  const { data } = await axios({
    url: "/api/user/read-list/sync",
    method: "POST",
    data: body,
  });

  return data;
};

export const changePassword = async (body: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => {
  const { data } = await axios({
    url: "/api/user/change-password",
    method: "POST",
    data: body,
  });

  return data;
};

export const changeName = async (body: { name: string }) => {
  const { data } = await axios({
    url: "/api/user/change-name",
    method: "POST",
    data: body,
  });

  return data;
};
