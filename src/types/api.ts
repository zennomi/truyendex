export type ReadListResponse = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  total: number;
  to: number;
  data: {
    series_uuid: string;
    chapter_updated_at: string;
    latest_chapter_uuid: string;
    title: string;
    chapter_title: string;
  }[];
};

export type GetUserResponse = {
  email: string;
  created_at: string;
  email_verified_at: string | null;
  id: number;
  name: string;
};

export type CommentListResponse = {};
