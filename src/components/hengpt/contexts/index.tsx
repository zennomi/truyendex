import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { HentagTag } from "../types";

interface HengptContextProps {
  tags: HentagTag[];
  setTags: Dispatch<SetStateAction<HentagTag[]>>;
  currentTagIndex: number;
  setCurrentTagIndex: Dispatch<SetStateAction<HentagTag[]>>;
}

const HengptContext = createContext<HengptContextProps>({
  tags: [],
  setTags: () => null,
});

export const HengptProvider = ({ children }: { children: ReactNode }) => {
  const [tags, setTags] = useState<HentagTag[]>([]);

  return (
    <HengptContext.Provider value={{ tags, setTags }}>
      {children}
    </HengptContext.Provider>
  );
};

export const useHengpt = (): HengptContextProps => {
  const context = useContext(HengptContext);
  if (!context) {
    throw new Error("useHengpt must be used within a HengptProvider");
  }
  return context;
};
