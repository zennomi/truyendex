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
  "cursor-pointer rounded-md p-2 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-white";

const activedButtonClassName =
  "cursor-pointer rounded-md p-2 bg-neutral-200 text-neutral-900 transition-colors dark:bg-neutral-700 dark:text-white";
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
    <div className="border-b border-neutral-200 bg-neutral-50/50 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="flex flex-wrap items-center">
        <div className="flex flex-wrap items-center gap-1">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={
              editor.isActive("bold") ? activedButtonClassName : buttonClassName
            }
            title="Đậm"
          >
            <Iconify className="h-4 w-4" icon="lucide:bold" />
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
            <Iconify className="h-4 w-4" icon="lucide:italic" />
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
            <Iconify className="h-4 w-4" icon="lucide:strikethrough" />
          </button>

          <div className="mx-1 h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></div>

          <button
            onClick={setLink}
            className={
              editor.isActive("link") ? activedButtonClassName : buttonClassName
            }
            title="Chèn liên kết"
          >
            <Iconify className="h-4 w-4" icon="lucide:link" />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className={
              editor.isActive("link") ? activedButtonClassName : buttonClassName
            }
            disabled={!editor.isActive("link")}
            title="Xoá liên kết"
          >
            <Iconify className="h-4 w-4" icon="lucide:link-2-off" />
          </button>

          <div className="mx-1 h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></div>

          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            disabled={!editor.can().chain().focus().toggleCode().run()}
            className={
              editor.isActive("code") ? activedButtonClassName : buttonClassName
            }
            title="Mã"
          >
            <Iconify className="h-4 w-4" icon="lucide:code" />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetAllMarks().run()}
            className={buttonClassName}
            title="Xóa định dạng"
          >
            <Iconify className="h-4 w-4" icon="lucide:remove-formatting" />
          </button>

          <div className="mx-1 h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></div>

          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={
              editor.isActive("bulletList")
                ? activedButtonClassName
                : buttonClassName
            }
            title="Danh sách"
          >
            <Iconify className="h-4 w-4" icon="lucide:list" />
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
            <Iconify className="h-4 w-4" icon="lucide:list-ordered" />
          </button>

          <div className="mx-1 h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></div>

          <button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
            className={buttonClassName}
            title="Hoàn tác"
          >
            <Iconify className="h-4 w-4" icon="lucide:undo" />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
            className={buttonClassName}
            title="Hủy hoàn tác"
          >
            <Iconify className="h-4 w-4" icon="lucide:redo" />
          </button>
          <button onClick={addImage} className={buttonClassName} title="Ảnh">
            <Iconify className="h-4 w-4" icon="lucide:image" />
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
          "format lg:format-lg dark:format-invert focus:outline-none format-blue max-w-none focus:ring-0 outline-none w-full min-h-[100px]",
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
    <div className="w-full">
      <div className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary dark:border-neutral-800 dark:bg-neutral-900 focus-within:dark:border-primary">
        <MenuBar editor={editor} />
        <div className="p-4">
          <EditorContent editor={editor} />
        </div>
        <div className="flex items-center justify-end border-t border-neutral-100 bg-neutral-50/50 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900/50">
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 active:scale-95"
            onClick={submitCommentClick}
          >
            <Iconify icon="lucide:send" className="h-4 w-4" />
            Gửi bình luận
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
