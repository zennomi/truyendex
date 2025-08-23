"use client";

import { useChapterContext } from "@/contexts/chapter";
import { useEffect, useRef, useState } from "react";

interface OptimisticChapterViewProps {
  children: React.ReactNode;
}

export default function OptimisticChapterView({
  children,
}: OptimisticChapterViewProps) {
  const { chapterId, chapter, setIsLoading } = useChapterContext();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const prevChapterIdRef = useRef(chapterId);

  // Detect chapter changes and show transition
  useEffect(() => {
    if (chapterId !== prevChapterIdRef.current) {
      setIsLoading(true);
      setIsTransitioning(true);
      prevChapterIdRef.current = chapterId;
    }
  }, [chapterId]);

  // Reset transition when chapter data is loaded
  useEffect(() => {
    if (chapter && !isTransitioning) {
      // Chapter data is ready, transition complete
      setIsTransitioning(false);
      setIsLoading(false);
    }
  }, [chapter, isTransitioning]);

  return (
    <div className="relative">
      {/* Smooth fade transition */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          isTransitioning ? "opacity-40" : "opacity-100"
        }`}
      >
        {children}
      </div>

      {/* Beautiful loading overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="rounded-2xl border border-gray-200/20 bg-white/95 p-8 shadow-2xl backdrop-blur-md">
            <div className="flex flex-col items-center space-y-4">
              {/* Animated loading spinner */}
              <div className="relative">
                <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
                <div className="absolute left-0 top-0 h-12 w-12 animate-spin rounded-full border-4 border-transparent border-t-web-title"></div>
              </div>

              {/* Loading text with animation */}
              <div className="text-center">
                <h3 className="mb-2 text-lg font-semibold text-gray-800">
                  Đang chuyển chương
                </h3>
                <p className="animate-pulse text-sm text-gray-600">
                  Vui lòng đợi trong giây lát...
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex space-x-1">
                <div className="h-2 w-2 animate-bounce rounded-full bg-web-title"></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-web-title"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div
                  className="h-2 w-2 animate-bounce rounded-full bg-web-title"
                  style={{ animationDelay: "0.2s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Initial loading state */}
      {!chapter && !isTransitioning && (
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-gray-200 border-t-web-title"></div>
            <p className="font-medium text-gray-600">Đang tải chương...</p>
          </div>
        </div>
      )}
    </div>
  );
}
