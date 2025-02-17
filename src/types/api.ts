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

export type UserResponse = {
  email: string;
  created_at: string;
  email_verified_at: string | null;
  id: number;
  name: string;
  comment_count: number;
  display_roles: string[];
};

export type GetUserResponse = {
  user: UserResponse;
};

export type CommentListResponse = {
  comments: {
    current_page: number;
    data: CommentResponse[];
    from: number;
    to: number;
    last_page: number;
    total: number;
    per_page: number;
  };
};

export type CommentResponse = {
  content: string;
  created_at: string;
  id: number;
  user: {
    id: number;
    name: string;
    display_roles: string[];
  };
  parent_id: number;
  replies?: CommentResponse[];
  reply_count: number;
  commentable: {
    title: string;
    type: string;
    id: string;
    uuid: string;
    series: {
      title: string;
      uuid: string;
    };
  };
  commentable_type: string;
};

export type CommentRepliesResponse = {
  replies: CommentResponse[];
};

export type RecentCommentResponse = CommentResponse;

export type RecentCommentListResponse = {
  comments: RecentCommentResponse[];
};
