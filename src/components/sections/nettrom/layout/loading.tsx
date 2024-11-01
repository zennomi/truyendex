export default function Loading({ title = "Loading..." }: { title?: string }) {
  return <div className="w-full p-3 text-center">{title}</div>;
}
