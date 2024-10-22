import { axios } from "./axios";

export const followOrUnfollow = async (seriesId: string) => {
  const { data } = await axios({
    method: "POST",
    url: "/api/series/follow",
    data: {
      series_id: seriesId,
    },
  });
  return data;
};

export const checkFollow = async (seriesId: string) => {
  const { data } = await axios({
    method: "POST",
    url: "/api/series/check-follow",
    data: {
      series_id: seriesId,
    },
  });
  return data.followed;
};
