import MangaImage from "@/components/manga-image";
import { useSettingsContext } from "@/contexts/settings";
import { useCallback } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

const Gallery = ({
  images,
  threshold,
  scrollPosition,
}: {
  images: string[];
  scrollPosition: ScrollPosition;
  threshold: number;
}) => {
  const { dataSaver, onUpdateField } = useSettingsContext();

  const toggleDataServer = useCallback(() => {
    onUpdateField("dataSaver", !dataSaver);
  }, [dataSaver, onUpdateField]);

  return (
    <div>
      {images.map((image, index) => (
        <div className="-mx-6 sm:mx-auto" key={image}>
          <MangaImage
            key={image}
            // Make sure to pass down the scrollPosition,
            // this will be used by the component to know
            // whether it must track the scroll position or not
            alt={`Trang ${index}`}
            data-index={index}
            scrollPosition={scrollPosition}
            src={image}
            threshold={threshold}
            index={index}
            dataSaver={dataSaver}
            onDataSaverChange={toggleDataServer}
          />
        </div>
      ))}
    </div>
  );
};

export default trackWindowScroll(Gallery);
