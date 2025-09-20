import Image from 'next/image';
import React from 'react'

const images = [
    '/images/gallery/gallery-6.svg',
];

const Gallery = () => {
    return (
        <div className='flex items-center justify-center w-[800px]'>
            <div className="grid grid-cols-3 gap-4 w-full rounded-3xl overflow-hidden">
                {/* Bottom left image */}
                <Image
                    src={images[0]}
                    height={190}
                    width={190}
                    alt="Gallery 3"
                    className="row-start-3 col-start-1 w-full h-full object-cover rounded-3xl"
                />
            </div>
        </div>
    )
}

export default Gallery