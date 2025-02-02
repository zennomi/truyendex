import { Constants } from "@/constants";
import { toast } from "react-toastify";
import Turnstile from "react-turnstile";

export default function TurnstileWidget({
  onVerify,
}: {
  onVerify: (_: string) => void;
}) {
  return (
    <div className="flex justify-center">
      <Turnstile
        sitekey={Constants.TURNSTILE_SITE_KEY}
        refreshExpired="auto"
        fixedSize
        theme="light"
        onVerify={onVerify}
        onError={(error) => {
          toast(error.message, { type: "error" });
        }}
      />
    </div>
  );
}
