"use client";

import useScrollOffset from "@/hooks/useScrollOffset";
import React from "react";
import { FaArrowUp } from "react-icons/fa";

interface ScrollButtonProps {
  targetId?: string; // Optional ID to scroll to
}

const ScrollToButton: React.FC<ScrollButtonProps> = ({ targetId }) => {
  const { isAtTop } = useScrollOffset();

  const handleScrollClick = () => {
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleScrollClick}
      className={`fixed bottom-8 right-8 z-10 rounded-full bg-purple-500 p-3 text-white shadow-lg transition-transform duration-300 hover:bg-purple-600 ${!isAtTop ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      <FaArrowUp size={20} />
    </button>
  );
};

export default ScrollToButton;
