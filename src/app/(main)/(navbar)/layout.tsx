import NavBar from "@/components/core/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-base text-black dark:bg-slate-900 dark:text-white">
      <NavBar />
      {children}
    </div>
  );
}
