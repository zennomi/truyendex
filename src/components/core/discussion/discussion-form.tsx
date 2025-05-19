"use client";

import { useAuth } from "@/hooks/useAuth";

export default function DiscussionForm() {
  useAuth({ middleware: "auth" });

  return (
    <div>
      <h1>Create Discussion Page</h1>
    </div>
  );
}
