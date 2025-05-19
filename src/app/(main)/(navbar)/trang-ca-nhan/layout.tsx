import UserDashboardLayoutView from "@/components/core/user-dashboard/layout";
import { PropsWithChildren } from "react";

export default function UserDashboardLayout({ children }: PropsWithChildren) {
  return <UserDashboardLayoutView>{children}</UserDashboardLayoutView>;
}
