import "@/styles/core/index.scss";

export default function CoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
