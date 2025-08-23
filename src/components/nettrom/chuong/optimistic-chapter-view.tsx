"use client";

import { DataLoader } from "@/components/DataLoader";
import { useChapterContext } from "@/contexts/chapter";
import { useEffect, useState } from "react";

interface OptimisticChapterViewProps {
  children: React.ReactNode;
}

export default function OptimisticChapterView({
  children,
}: OptimisticChapterViewProps) {
  const { chapterId, chapter } = useChapterContext();
  const [optimisticChapterId, setOptimisticChapterId] = useState(chapterId);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Update optimistic chapter ID when actual chapter changes
  useEffect(() => {
    if (chapterId !== optimisticChapterId) {
      setIsTransitioning(true);
      setOptimisticChapterId(chapterId);

      // Reset transition state after a short delay
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [chapterId, optimisticChapterId]);

  return (
    <div
      className={`transition-opacity duration-300 ${isTransitioning ? "opacity-50" : "opacity-100"}`}
    >
      <DataLoader
        isLoading={!chapter || isTransitioning}
        loadingText={
          isTransitioning ? "Đang chuyển chương..." : "Đang tải chương..."
        }
      >
        {children}
      </DataLoader>
    </div>
  );
}
