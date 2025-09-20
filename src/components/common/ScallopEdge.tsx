import React from 'react';

const ScallopEdge: React.FC<{ className?: string; height?: number }> = ({
    className = '',
    height = 20,
}) => (
    <svg
        className={className}
        width="100%"
        height={height}
        viewBox={`0 0 400 ${height}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: `${height}px` }}
    >
        <g>
            {Array.from({ length: 24 }).map((_, i) => (
                <ellipse
                    key={i}
                    cx={12.5 + i * 25}
                    cy={height}
                    rx={12.5}
                    ry={height / 2}   // This makes the scallop half as tall as the SVG
                    className='fill-[#f1f1f1] dark:fill-[#1B1B1B]'
                />
            ))}
        </g>
    </svg>
);

export default ScallopEdge; 