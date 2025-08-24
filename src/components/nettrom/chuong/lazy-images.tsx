import MangaImage from "@/components/manga-image";
import { useSettingsContext } from "@/contexts/settings";
import { useCallback } from "react";
import {
  ScrollPosition,
  trackWindowScroll,
} from "react-lazy-load-image-component";

interface GalleryProps {
  images: string[];
  scrollPosition: ScrollPosition;
  threshold: number;
}

const Gallery = ({ images, threshold, scrollPosition }: GalleryProps) => {
  const { dataSaver, maxImageWidth, onUpdateField } = useSettingsContext();

  const toggleDataServer = useCallback(() => {
    onUpdateField("dataSaver", !dataSaver);
  }, [dataSaver, onUpdateField]);

  return (
    <div>
      {images.map((image, index) => (
        <div className="sm:mx-auto" key={image}>
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
            maxImageWidth={maxImageWidth}
            onDataSaverChange={toggleDataServer}
          />
        </div>
      ))}
    </div>
  );
};

const LazyImages = trackWindowScroll(Gallery) as any;

export default LazyImages;
