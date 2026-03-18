import clsx from 'clsx';
import React from 'react';
import type { FieldError } from 'react-hook-form';

/**
 * Propiedades del componente Input.
 */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    /** Etiqueta que se muestra sobre el campo de entrada. */
    label: string;
    /** Objeto de error de React Hook Form para mostrar mensaje de error. */
    error?: FieldError;
    /** Texto de ayuda que aparece debajo del input si no hay error. */
    helperText?: string;
    /** Si es true, el input ocupa el 100% del ancho disponible. */
    fullWidth?: boolean;
}

/**
 * Componente de Input de texto con soporte para etiquetas, errores y textos de ayuda.
 * Se integra fácilmente con React Hook Form usando `ref`.
 * 
 * @example
 * ```tsx
 * <Input 
 *   label="Nombre de usuario" 
 *   {...register('username')} 
 *   error={errors.username} 
 * />
 * ```
 */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, helperText, fullWidth, type = 'text', ...props }, ref) => {
        return (
            <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                <label className="text-sm font-medium text-text-secondary">
                    {label}
                </label>
                <input
                    ref={ref}
                    type={type}
                    className={clsx(
                        'flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
                        error
                            ? 'border-error focus:ring-error'
                            : 'border-gray-300 focus:border-primary focus:ring-primary',
                        className
                    )}
                    {...props}
                />
                {helperText && !error && (
                    <p className="text-xs text-gray-500">{helperText}</p>
                )}
                {error && (
                    <p className="text-xs text-error font-medium">{error.message}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';
