import Image from 'next/image';
import { useRouter } from 'next/navigation';

const slugify = (str: string) =>
    str
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

interface CategoryCardProps {
    title: string,
    image: string,
    isActive: boolean,
    className?: string
}

const CategoryCard = ({
    title,
    image,
    isActive,
    className = ''
}: CategoryCardProps) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/${slugify(title)}`);
    };

    const baseClasses = "category-card h-10 md:h-12 md:w-30 w-[70px] flex-shrink-0 flex items-center justify-center rounded-xl md:rounded-2xl relative cursor-pointer transition-colors duration-300 px-4";
    const activeClasses = "bg-white text-theme-primary !min-w-[10px] md:!min-w-[98px] md:!w-auto";
    const inactiveClasses = "text-white";

    return (
        <div
            onClick={handleClick}
            className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses} ${className}`}>
            <div className="category-card-image absolute md:-top-14 -top-10 w-[60px] h-[50px] md:w-[84px] md:h-[70px]">
                <Image src={image} alt={title} layout='fill' className='object-contain' />
            </div>
            <div className="category-card-content">
                <h3 className={`font-bold text-sm text-nowrap ${isActive ? 'text-theme-primary' : 'text-white'}`}>{title}</h3>
            </div>
        </div>
    )
}

export default CategoryCard