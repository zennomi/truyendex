"use client";
import "./styles.scss";

import React, { useCallback } from "react";
import { toast } from "react-toastify";
import StarterKit from "@tiptap/starter-kit";
import { Color } from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import TextStyle from "@tiptap/extension-text-style";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Editor, EditorContent, useEditor } from "@tiptap/react";

import Iconify from "@/components/iconify";

const buttonClassName =
  "cursor-pointer rounded p-1.5 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-600 dark:hover:text-white";

const activedButtonClassName =
  "cursor-pointer rounded p-1.5 bg-neutral-600 text-white";
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null;
  }
  const addImage = useCallback(() => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    try {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e.message);
    }
  }, [editor]);

  return (
    <div className="border-b px-3 py-2 dark:border-neutral-600">
      <div className="flex flex-wrap items-center">
        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? activedButtonClassName : buttonClassName
            }
            title="Đậm"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 5h4.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0-7H6m2 7h6.5a3.5 3.5 0 1 1 0 7H8m0-7v7m0 0H6"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={
              editor.isActive("italic")
                ? activedButtonClassName
                : buttonClassName
            }
            title="Nghiêng"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8.874 19 6.143-14M6 19h6.33m-.66-14H18"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={
              editor.isActive("strike")
                ? activedButtonClassName
                : buttonClassName
            }
            title="Gạch ngang"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 6.2V5h12v1.2M7 19h6m.2-14-1.677 6.523M9.6 19l1.029-4M5 5l6.523 6.523M19 19l-7.477-7.477"
              />
            </svg>
          </button>
          <button
            onClick={setLink}
            className={
              editor.isActive("link") ? activedButtonClassName : buttonClassName
            }
            title="Chèn liên kết"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M9 11h6c.55 0 1 .45 1 1s-.45 1-1 1H9c-.55 0-1-.45-1-1s.45-1 1-1m11.93 1c.62 0 1.07-.59.93-1.19A5.01 5.01 0 0 0 17 7h-3.05c-.52 0-.95.43-.95.95s.43.95.95.95H17c1.45 0 2.67 1 3.01 2.34c.11.44.47.76.92.76m-16.97-.62C4.24 9.91 5.62 8.9 7.12 8.9h2.93c.52 0 .95-.43.95-.95S10.57 7 10.05 7H7.22c-2.61 0-4.94 1.91-5.19 4.51A4.995 4.995 0 0 0 7 17h3.05c.52 0 .95-.43.95-.95s-.43-.95-.95-.95H7a3.11 3.11 0 0 1-3.04-3.72M18 12c-.55 0-1 .45-1 1v2h-2c-.55 0-1 .45-1 1s.45 1 1 1h2v2c0 .55.45 1 1 1s1-.45 1-1v-2h2c.55 0 1-.45 1-1s-.45-1-1-1h-2v-2c0-.55-.45-1-1-1"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={
              editor.isActive("link") ? activedButtonClassName : buttonClassName
            }
            disabled={!editor.isActive("link")}
            title="Xoá liên kết"
          >
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M14 9h2.87c1.46 0 2.8.98 3.08 2.42c.31 1.64-.74 3.11-2.22 3.48l1.53 1.53c1.77-.91 2.95-2.82 2.7-5.01C21.68 8.86 19.37 7 16.79 7H14c-.55 0-1 .45-1 1s.45 1 1 1M3.51 3.51A.996.996 0 1 0 2.1 4.92l2.64 2.64c-1.77.91-2.95 2.82-2.7 5.01C2.32 15.14 4.63 17 7.21 17H10c.55 0 1-.45 1-1s-.45-1-1-1H7.13c-1.46 0-2.8-.98-3.08-2.42c-.31-1.64.75-3.11 2.22-3.48l2.12 2.12c-.23.19-.39.46-.39.78c0 .55.45 1 1 1h1.17l8.9 8.9a.996.996 0 1 0 1.41-1.41zM14 11l1.71 1.71A1.003 1.003 0 0 0 15 11z"
              ></path>
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={
              editor.isActive("code") ? activedButtonClassName : buttonClassName
            }
            title="Mã"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m8 8-4 4 4 4m8 0 4-4-4-4m-2-3-4 14"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className={buttonClassName}
            title="Xóa định dạng"
          >
            <Iconify icon="lucide:x" />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? activedButtonClassName
                : buttonClassName
            }
            title="Danh sách"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth={2}
                d="M9 8h10M9 12h10M9 16h10M4.99 8H5m-.02 4h.01m0 4H5"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={
              editor.isActive("orderedList")
                ? activedButtonClassName
                : buttonClassName
            }
            title="Danh sách số"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6h8m-8 6h8m-8 6h8M4 16a2 2 0 1 1 3.321 1.5L4 20h5M4 5l2-1v6m-2 0h4"
              />
            </svg>
          </button>
          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={buttonClassName}
            title="Hoàn tác"
          >
            <Iconify icon="lucide:undo" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={buttonClassName}
            title="Hủy hoàn tác"
          >
            <Iconify icon="lucide:redo" />
          </button>
          <button onClick={addImage} className={buttonClassName} title="Ảnh">
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  //   TextStyle.configure({ types: [ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
  Image,
  Dropcursor,
  Link.configure({
    openOnClick: false,
    autolink: true,
    defaultProtocol: "https",
    protocols: ["http", "https"],
    isAllowedUri: (url, ctx) => {
      try {
        // construct URL
        const parsedUrl = url.includes(":")
          ? new URL(url)
          : new URL(`${ctx.defaultProtocol}://${url}`);

        // use default validation
        if (!ctx.defaultValidate(parsedUrl.href)) {
          return false;
        }

        // disallowed protocols
        const disallowedProtocols = ["ftp", "file", "mailto"];
        const protocol = parsedUrl.protocol.replace(":", "");

        if (disallowedProtocols.includes(protocol)) {
          return false;
        }

        // only allow protocols specified in ctx.protocols
        const allowedProtocols = ctx.protocols.map((p) =>
          typeof p === "string" ? p : p.scheme,
        );

        if (!allowedProtocols.includes(protocol)) {
          return false;
        }

        // all checks have passed
        return true;
      } catch {
        return false;
      }
    },
  }),
];

const CommentEditor = ({
  content,
  onSumbit,
}: {
  onSumbit: (content: string) => Promise<void>;
  content?: string;
}) => {
  const editor = useEditor({
    extensions,
    content: content ?? "",
    editorProps: {
      attributes: {
        class:
          "format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none focus:ring-0 outline-none",
      },
    },
  });

  const submitCommentClick = useCallback(async () => {
    if (!editor) return;
    const content = editor.getHTML();
    if (content.length <= 10) {
      toast("Bình luận ít nhất 10 ký tự");
      return;
    }
    if (content.length >= 5000) {
      toast("Bình luận quá 5000 ký tự rồi");
      return;
    }
    try {
      await onSumbit(content);
      editor.commands.clearContent();
    } catch (error) {
      console.error(error);
    }
  }, [editor, onSumbit]);

  return (
    <div className="comment_form">
      <div className="w-full border border-neutral-200 bg-neutral-50 dark:border-neutral-600 dark:bg-[#423e3e]">
        <MenuBar editor={editor} />
        <div className="bg-white px-4 py-2 dark:bg-neutral-800">
          <EditorContent editor={editor} />
        </div>
        <div className="comment-info px-2 pb-3">
          <button
            type="submit"
            className="btn btn-warning"
            onClick={submitCommentClick}
          >
            Gửi
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
