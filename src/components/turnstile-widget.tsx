import { Constants } from "@/constants";
import Turnstile from "react-turnstile";

export default function TurnstileWidget({
  onVerify,
}: {
  onVerify: (_: string) => void;
}) {
  return (
    <Turnstile
      sitekey={Constants.TURNSTILE_SITE_KEY}
      refreshExpired="auto"
      fixedSize
      theme="light"
      onVerify={onVerify}
    />
  );
}
