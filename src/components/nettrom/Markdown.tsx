import ReactMarkdown from "react-markdown";
// markdown plugins
import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import type { Options } from "react-markdown";
import Link from "next/link";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
        // [remarkGfm, { singleTilde: false }],
      ]}
      className="w-full [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
}

type ComponentTag = {
  [key: string]: any;
};

function isExternalLink(url: string): boolean {
  return url.startsWith("http");
}

const components: Options["components"] = {
  a: ({ href, children, ...other }: ComponentTag) => {
    const linkProps = isExternalLink(href)
      ? { target: "_blank", rel: "noopener" }
      : {};

    return (
      <Link
        {...linkProps}
        href={href}
        className={"text-web-title hover:text-web-titleLighter"}
        {...other}
      >
        {children}
      </Link>
    );
  },
};
