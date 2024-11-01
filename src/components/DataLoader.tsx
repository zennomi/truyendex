import { Loader2 } from "lucide-react";

export const DataLoader = (props: {
  isLoading: boolean;
  loadingText?: string;
  children: React.ReactNode;
  error?: string;
}) => {
  if (props.isLoading) {
    return (
      <div className="flex min-h-[100px] flex-col items-center justify-center gap-2 text-center text-muted-foreground">
        <Loader2 className="h-[40px] w-[40px] animate-spin" />
        <span>{props.loadingText || "Đang tải..."}</span>
      </div>
    );
  }

  if (props.error) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center text-muted-foreground">
        <span>{props.error}</span>
      </div>
    );
  }

  return props.children;
};
