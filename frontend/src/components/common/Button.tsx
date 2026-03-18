import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import React from 'react';

/**
 * Propiedades del componente Button.
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /** Variante visual del botón. Por defecto 'primary'. */
    variant?: 'primary' | 'secondary' | 'outline' | 'danger';
    /** Tamaño del botón. Por defecto 'md'. */
    size?: 'sm' | 'md' | 'lg';
    /** Muestra un indicador de carga y deshabilita el botón. */
    loading?: boolean;
    /** Si es true, el botón ocupa el 100% del ancho disponible. */
    fullWidth?: boolean;
    /** Icono opcional a mostrar antes del texto. */
    icon?: React.ReactNode;
}

/**
 * Componente de Botón reutilizable con soporte para variantes, tamaños y estados de carga.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click aquí
 * </Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', loading, fullWidth, icon, children, disabled, ...props }, ref) => {
        const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

        const variants = {
            primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
            secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-300 border border-transparent',
            outline: 'border border-gray-300 bg-transparent text-text hover:bg-gray-50 focus:ring-gray-400',
            danger: 'bg-error text-white hover:bg-red-700 focus:ring-red-500',
        };

        const sizes = {
            sm: 'h-8 px-3 text-sm',
            md: 'h-10 px-4 text-sm',
            lg: 'h-12 px-6 text-base',
        };

        return (
            <button
                ref={ref}
                className={clsx(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    fullWidth && 'w-full',
                    className
                )}
                disabled={disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!loading && icon && <span className="mr-2">{icon}</span>}
                {children}
            </button>
        );
    }
);

Button.displayName = 'Button';
