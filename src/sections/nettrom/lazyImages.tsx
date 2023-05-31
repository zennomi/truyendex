import { ScrollPosition, trackWindowScroll } from "react-lazy-load-image-component";
import MangaImage from "../../components/mangaImage";

const Gallery = ({ images, threshold, scrollPosition }: { images: string[], scrollPosition: ScrollPosition, threshold: number }) => (
    <div>
        {images.map((image, index) =>
            <div className="page-chapter" key={image}>
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
                />
            </div>
        )}
    </div>
);

export default trackWindowScroll(Gallery);