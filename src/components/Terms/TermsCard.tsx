import React from 'react';

interface TermsCardProps {
    children: React.ReactNode
}

const TermsCard: React.FC<TermsCardProps> = ({ children }) => (
    <div className='bg-white shadow rounded-2xl p-8 '>
        {children}
    </div>
);

export default TermsCard;
