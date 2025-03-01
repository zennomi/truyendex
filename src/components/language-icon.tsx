import { IconProps } from "@iconify/react";
import Iconify from "./iconify";

type Props = Omit<IconProps, "icon"> & {
  languageCode: string;
};

export default function LanguageIcon({ languageCode, ...props }: Props) {
  if (languageCode === "zh-hk")
    return <Iconify {...props} icon={`circle-flags:hk`} />;
  return <Iconify {...props} icon={`circle-flags:lang-${languageCode}`} />;
}
