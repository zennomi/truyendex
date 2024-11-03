import { DataLoader } from "@/components/DataLoader";

export default function LoadingUI() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <DataLoader isLoading={true}>
      <></>
    </DataLoader>
  );
}
