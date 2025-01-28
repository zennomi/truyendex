"use client";

import { Constants } from "@/constants";
import { useAuth } from "@/hooks/useAuth";
import FollowingList from "./following-list";
import { useState } from "react";
import FollowingSync from "./following-sync";

export default function FollowingView() {
  useAuth({
    middleware: "auth",
    redirectIfNotAuthenticated: Constants.Routes.loginWithRedirect(
      Constants.Routes.nettrom.following,
    ),
  });
  const [tab, setTab] = useState<"following" | "sync">("following");

  return (
    <div>
      <div id="follow-content-section" className="center-side col-md-8">
        <div className="comics-followed-page Module Module-178">
          <div className="mrt15">
            <ul
              className="comment-nav text-center"
              style={{ fontSize: 16, marginBottom: 15 }}
            >
              <li
                className={tab === "following" ? "active" : ""}
                onClick={() => setTab("following")}
              >
                <a>Đang theo dõi</a>
              </li>
              <li
                className={tab === "sync" ? "active" : ""}
                onClick={() => setTab("sync")}
              >
                <a>Đồng bộ</a>
              </li>
            </ul>
          </div>
          {tab === "following" && <FollowingList />}
          {tab === "sync" && <FollowingSync />}
        </div>
      </div>
    </div>
  );
}
