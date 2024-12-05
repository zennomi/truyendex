import { useState, useEffect } from "react";

const useScrollOffset = () => {
  const [scrollOffset, setScrollOffset] = useState(0);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const offset = window.pageYOffset;
    setScrollOffset(offset);
    setIsAtTop(offset === 0);
    setIsAtBottom(
      window.innerHeight + offset >= document.documentElement.scrollHeight,
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return { scrollOffset, isAtTop, isAtBottom };
};

export default useScrollOffset;
