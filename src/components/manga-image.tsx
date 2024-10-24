import React, { useState } from "react";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";

type IProps = LazyLoadImageProps;

interface Props extends IProps {
  index?: number;
  disabledEffect?: boolean;
  threshold?: number;
  fullWidth?: boolean;
}

export default function MangaImage({
  className = "",
  disabledEffect = false,
  effect = "opacity",
  threshold = 0,
  ...other
}: Props) {
  const [loaded, setLoaded] = useState(false);
  return (
    <span
      className={`leading-0 block overflow-hidden ${loaded ? "min-h-0" : "min-h-[100vh]"} [&_.wrapper]:w-full [&_.wrapper]:h-full [&_.wrapper]:!bg-cover ${className}`}
    >
      <LazyLoadImage
        wrapperClassName="wrapper"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={"/images/loading.jpg"}
        className="w-full h-full object-cover"
        afterLoad={() => setLoaded(true)}
        threshold={threshold}
        {...other}
      />
    </span>
  );
}
