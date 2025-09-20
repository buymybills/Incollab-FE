import Image from 'next/image'

const DealCard = ({ imagePath }: { imagePath: string }) => {
    return (
        <div className="relative h-52 overflow-hidden rounded-2xl">
            {/* Background Image */}
            <Image
                src={imagePath}
                alt="Mega Fashion Sale"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
        </div>
    )
}

export default DealCard
