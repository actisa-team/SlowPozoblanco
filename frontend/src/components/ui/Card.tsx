import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
    return (
        <div
            className={`bg-surface-totem rounded-2xl shadow-sm p-4 ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};
