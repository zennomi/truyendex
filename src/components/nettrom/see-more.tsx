import { useState, useRef, useEffect, ReactNode } from "react";
import Iconify from "../iconify";

type ReadMoreProps = {
  children: ReactNode;
  maxHeight?: number;
};

const ReadMore: React.FC<ReadMoreProps> = ({ children, maxHeight = 150 }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > maxHeight);
    }
  }, [children, maxHeight]);

  return (
    <div
      className="relative overflow-hidden"
      style={{ maxHeight: expanded ? "none" : maxHeight }}
    >
      <div
        ref={contentRef}
        className={`relative overflow-hidden transition-all`}
        style={{ maxHeight: expanded ? "none" : maxHeight }}
      >
        {children}
        {!expanded && isOverflowing && (
          <div
            className="absolute bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-[#000] to-transparent pb-1"
            style={{ height: `${maxHeight / 2}px` }}
          >
            <div className="flex items-center justify-center gap-2">
              <Iconify icon="fa:angle-down" />
              <button
                className="text-white-500 font-bold hover:underline focus:outline-none"
                onClick={() => setExpanded(true)}
              >
                Hiện thêm
              </button>
            </div>
          </div>
        )}
      </div>
      {isOverflowing && (
        <div className="flex items-baseline justify-center gap-2">
          <Iconify icon="fa:angle-up" />
          <button
            className="text-white-500 mt-2 font-bold hover:underline focus:outline-none"
            onClick={() => setExpanded(false)}
          >
            Thu gọn
          </button>
        </div>
      )}
    </div>
  );
};

export default ReadMore;
