export default function RoleBadge({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <div className="flex gap-1 rounded-sm bg-[#FDBF00]/50 px-1.5 py-0.5 align-middle text-[10px] font-bold text-[#CC1E0D] dark:bg-[#CC1E0D]/50 dark:text-[#FDBF00]">
        <img className="my-auto h-[14px]" src="/images/badges/admin.png" />
        <div className="">ADMIN</div>
      </div>
    );
  }
  return null;
}
