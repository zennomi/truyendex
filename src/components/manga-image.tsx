import React, { useState } from "react";
import {
  LazyLoadImage,
  LazyLoadImageProps,
} from "react-lazy-load-image-component";
import { Button } from "./nettrom/Button";
import Iconify from "./iconify";

type IProps = LazyLoadImageProps;

interface Props extends IProps {
  index?: number;
  disabledEffect?: boolean;
  threshold?: number;
  fullWidth?: boolean;
  dataSaver: boolean;
  onDataSaverChange: () => void;
}

export default function MangaImage({
  className = "",
  disabledEffect = false,
  effect = "opacity",
  threshold = 0,
  dataSaver,
  onDataSaverChange,
  ...other
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  if (error)
    return (
      <div className="flex flex-col justify-center gap-2 bg-white/10 px-2 py-5">
        <div className="text-center">
          Đã có lỗi khi tải ảnh thứ {(other.index || 0) + 1}
        </div>
        <div className="flex gap-2">
          <Button
            icon={<Iconify icon="fa:refresh" />}
            className="w-full min-w-0"
            onClick={() => setError(false)}
          >
            Tải lại ảnh
          </Button>
          <Button
            icon={
              <Iconify icon={dataSaver ? "fa:caret-down" : "fa:caret-up"} />
            }
            className="w-full min-w-0"
            onClick={() => onDataSaverChange()}
          >
            {dataSaver ? "Tắt chế độ tiết kiệm" : "Bật chế độ tiết kiệm"}
          </Button>
        </div>
      </div>
    );
  return (
    <span
      className={`block overflow-hidden ${loaded ? "min-h-0" : "min-h-[100vh]"} ${className}`}
    >
      <LazyLoadImage
        wrapperClassName="block"
        effect={disabledEffect ? undefined : effect}
        placeholderSrc={"/images/loading.jpg"}
        className="h-full w-full object-cover"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        threshold={threshold}
        {...other}
      />
    </span>
  );
}
