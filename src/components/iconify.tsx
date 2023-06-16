"use client"

// icons
import { Icon, IconifyIcon, IconProps } from '@iconify/react';

// ----------------------------------------------------------------------

interface Props extends IconProps {
  icon: IconifyIcon | string;
}

export default function Iconify({ icon, ...other }: Props) {
  return <Icon icon={icon} {...other} />
}
