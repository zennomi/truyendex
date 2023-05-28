import React, { useState } from 'react';
import { LazyLoadImage, LazyLoadImageProps } from 'react-lazy-load-image-component';

type IProps = LazyLoadImageProps;

interface Props extends IProps {
    disabledEffect?: boolean;
    fullWidth?: boolean
}

export default function MangaImage({
    className = "",
    disabledEffect = false,
    effect = 'opacity',
    ...other
}: Props) {
    const [loaded, setLoaded] = useState(false);
    return (
        <span className={`leading-0 block overflow-hidden ${loaded ? "min-h-0" : "min-h-[50vh]"} [&_.wrapper]:w-full [&_.wrapper]:h-full [&_.wrapper]:!bg-cover ${className}`}>
            <LazyLoadImage
                wrapperClassName="wrapper"
                effect={disabledEffect ? undefined : effect}
                placeholderSrc={"/images/loading.jpg"}
                className="w-full h-full object-cover"
                afterLoad={() => setLoaded(true)}
                {...other}
            />
        </span>
    )
}