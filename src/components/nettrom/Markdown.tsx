import ReactMarkdown from "react-markdown";
// markdown plugins
import rehypeRaw from "rehype-raw";
// import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

export default function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeRaw,
        rehypeHighlight,
        // [remarkGfm, { singleTilde: false }],
      ]}
      className="w-full [&_a]:text-web-title [&_a]:hover:text-web-titleLighter [&_pre]:whitespace-pre-wrap [&_pre]:break-words"
    >
      {content}
    </ReactMarkdown>
  );
}
