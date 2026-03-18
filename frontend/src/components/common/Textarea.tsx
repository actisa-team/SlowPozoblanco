import clsx from 'clsx';
import React from 'react';
import type { FieldError } from 'react-hook-form';

/**
 * Propiedades del componente Textarea.
 */
interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    /** Etiqueta que se muestra sobre el campo de entrada. */
    label: string;
    /** Objeto de error de React Hook Form para mostrar mensaje de error. */
    error?: FieldError;
    /** Texto de ayuda que aparece debajo del textarea si no hay error. */
    helperText?: string;
    /** Si es true, el textarea ocupa el 100% del ancho disponible. */
    fullWidth?: boolean;
}

/**
 * Componente de Textarea con soporte para etiquetas, errores y textos de ayuda.
 * Se integra fácilmente con React Hook Form usando `ref`.
 * 
 * @example
 * ```tsx
 * <Textarea 
 *   label="Descripción" 
 *   {...register('description')} 
 *   error={errors.description} 
 * />
 * ```
 */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, label, error, helperText, fullWidth, rows = 4, ...props }, ref) => {
        return (
            <div className={clsx('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                <label className="text-sm font-medium text-text-secondary">
                    {label}
                </label>
                <textarea
                    ref={ref}
                    rows={rows}
                    className={clsx(
                        'flex w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 resize-y',
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

Textarea.displayName = 'Textarea';
