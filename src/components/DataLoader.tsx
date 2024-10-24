import { Loader2 } from "lucide-react";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: string;
}) => {
  if (props.isLoading) {
    return (
      <div className="min-h-[100px] flex items-center gap-2 flex-col justify-center text-center text-muted-foreground">
        <Loader2 className="w-[40px] h-[40px] animate-spin" />
        <span>{props.loadingText || "Đang tải..."}</span>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="flex items-center gap-4 flex-col justify-center text-center text-muted-foreground">
        <span>{props.error}</span>
      </div>
    );
  }

  return props.children;
};
