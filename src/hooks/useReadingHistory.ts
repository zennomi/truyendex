import { ReadingHistory } from "@/types";
import useLocalStorage from "./useLocalStorage";
import { useCallback } from "react";

export default function useReadingHistory() {
  const [history, setHistory] = useLocalStorage<Record<string, ReadingHistory>>(
    "truyendex-history",
    {},
  );

  const addHistory = useCallback((mangaId: string, manga: ReadingHistory) => {
    setHistory((value) => {
      const mangaIds = Object.keys(value);
      if (mangaIds.length > 20) {
        delete value[mangaIds[0]];
      }
      return { [mangaId]: manga, ...value };
    });
  }, [setHistory]);

  const removeHistory = (mangaId: string) => {
    setHistory((value) => {
      delete value[mangaId];
      return { ...value };
    });
  };

  return { history, setHistory, addHistory, removeHistory };
}
