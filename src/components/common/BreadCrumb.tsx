import { ReactNode } from 'react'

const BreadCrumb = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={`flex items-center lg:justify-center text-base gap-1 dark:text-white ${className}`}>
            {children}
        </div>
    )
}

export default BreadCrumb
