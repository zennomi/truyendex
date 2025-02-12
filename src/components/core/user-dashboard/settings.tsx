"use client";

import PasswordUpdate from "./change-password-form";
import AvatarUpdate from "./change-avatar-form";
import UsernameUpdate from "./change-username-form";

export default function UserSettingsView() {
  return (
    <div>
      <PasswordUpdate />
      <UsernameUpdate />
      <AvatarUpdate />
    </div>
  );
}
