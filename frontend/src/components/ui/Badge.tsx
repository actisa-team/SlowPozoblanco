import React from 'react';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default' }) => {
    const variants = {
        success: 'bg-success-totem/10 text-success-totem border-success-totem/20',
        warning: 'bg-accent-totem/10 text-accent-totem border-accent-totem/20',
        danger: 'bg-danger-totem/10 text-danger-totem border-danger-totem/20',
        default: 'bg-muted/10 text-muted border-muted/20',
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${variants[variant]}`}>
            {children}
        </span>
    );
};
