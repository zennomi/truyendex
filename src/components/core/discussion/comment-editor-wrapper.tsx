"use client";

import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import DiscussionCommentEditor from "./comment-editor";

export default function CommentEditorWrapper() {
  const { user } = useAuth();
  const pathname = usePathname();

  const handleCommentSubmit = async (content: string) => {
    // Submit comment
  };

  if (user == null) {
    return (
      <div className="mt-4 flex flex-col">
        <p className="text-center text-lg">Đăng nhập để tham gia thảo luận</p>
        <Link
          href={Constants.Routes.loginWithRedirect(pathname)}
          className="inline-block rounded-md border border-indigo-600 bg-indigo-600 text-center align-middle text-base font-semibold tracking-wide text-white duration-500 hover:border-indigo-700 hover:bg-indigo-700"
        >
          Đăng nhập
        </Link>
      </div>
    );
  }
  return (
    <div className="mt-4 flex flex-col">
      <DiscussionCommentEditor onSumbit={handleCommentSubmit} />
    </div>
  );
}
