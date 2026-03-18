import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';

import { Modal } from '../ui/Modal';
import { Input } from '../common/Input';
import { Textarea } from '../common/Textarea';
import { Button } from '../common/Button';
import { MediaUpload } from '../common/MediaUpload';
import { TourismResourceService } from '../../services/tourismResources.service';
import { type TourismResource } from '../../types/tourismResources.types';
import { CheckCircle2 } from 'lucide-react';
import { CATEGORY_TRANSLATIONS } from '../../constants/translations';

const tourismResourceSchema = z.object({
    name: z.string().min(1, 'El nombre es requerido'),
    description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
    category: z.enum([
        'MONUMENT',
        'MUSEUM',
        'PARK',
        'RESTAURANT',
        'HOTEL',
        'OTHER',
    ], { message: 'Selecciona una categoría válida' }),
    latitude: z.number()
        .min(-90, 'Latitud inválida')
        .max(90, 'Latitud inválida'),
    longitude: z.number()
        .min(-180, 'Longitud inválida')
        .max(180, 'Longitud inválida'),
    address: z.string().min(1, 'La dirección es requerida'),
    phone: z.string().optional(),
});

type TourismResourceFormData = z.infer<typeof tourismResourceSchema>;

interface TourismResourceFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    resource?: TourismResource;
    initialStep?: 'form' | 'media';
}

// Local labels removed as we use global CATEGORY_TRANSLATIONS

export const TourismResourceFormModal = ({ isOpen, onClose, resource, initialStep = 'form' }: TourismResourceFormModalProps) => {
    const queryClient = useQueryClient();
    const isEditMode = !!resource;
    const [step, setStep] = useState<'form' | 'media'>('form');
    const [createdResourceId, setCreatedResourceId] = useState<string | null>(null);

    // Media files state
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [images360Files, setImages360Files] = useState<File[]>([]);
    const [videoFiles, setVideoFiles] = useState<File[]>([]);
    const [video360Files, setVideo360Files] = useState<File[]>([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TourismResourceFormData>({
        resolver: zodResolver(tourismResourceSchema),
    });

    // Handle initial state when modal opens or resource/step changes
    useEffect(() => {
        if (isOpen) {
            setStep(initialStep); // Set initial step (form or media)

            if (resource) {
                setCreatedResourceId(resource.id);
                // Reset form with resource data
                reset({
                    name: resource.name,
                    description: resource.description,
                    category: resource.category,
                    latitude: Number(resource.latitude),
                    longitude: Number(resource.longitude),
                    address: resource.address,
                    phone: resource.phone || '',
                });
            } else {
                setCreatedResourceId(null);
                // Reset form to empty
                reset({
                    name: '',
                    description: '',
                    category: undefined,
                    latitude: undefined,
                    longitude: undefined,
                    address: '',
                    phone: '',
                });
            }
        }
    }, [isOpen, resource, initialStep, reset]);

    const createMutation = useMutation({
        mutationFn: TourismResourceService.create,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['tourismResources'] });
            toast.success('Recurso turístico creado exitosamente');
            setCreatedResourceId(data.id);
            setStep('media');
        },
        onError: () => {
            toast.error('Error al crear el recurso turístico');
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            TourismResourceService.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tourismResources'] });
            toast.success('Recurso turístico actualizado exitosamente');
            // In edit mode, go to media upload step
            if (resource) {
                setCreatedResourceId(resource.id);
                setStep('media');
            }
        },
        onError: () => {
            toast.error('Error al actualizar el recurso turístico');
        },
    });

    const uploadMediaMutation = useMutation({
        mutationFn: async ({ resourceId, mediaType, files }: { resourceId: string; mediaType: string; files: File[] }) => {
            return TourismResourceService.uploadMedia(resourceId, mediaType, files);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tourismResources'] });
        },
    });

    const deleteMediaMutation = useMutation({
        mutationFn: async ({ resourceId, mediaType, filename }: { resourceId: string; mediaType: string; filename: string }) => {
            return TourismResourceService.deleteMedia(resourceId, mediaType, filename);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tourismResources'] });
            toast.success('Archivo eliminado correctamente');
        },
        onError: () => {
            toast.error('Error al eliminar el archivo');
        },
    });

    const handleRemoveExistingMedia = (mediaType: string, filename: string) => {
        if (!resource || !resource.id) return;

        if (confirm(`¿Estás seguro de eliminar este archivo?`)) {
            deleteMediaMutation.mutate({
                resourceId: resource.id,
                mediaType,
                filename
            });
        }
    };

    const onSubmit = (data: TourismResourceFormData) => {
        if (isEditMode && resource) {
            updateMutation.mutate({ id: resource.id, data });
        } else {
            createMutation.mutate(data);
        }
    };

    const handleMediaUpload = async () => {
        if (!createdResourceId) return;

        const uploads: Promise<any>[] = [];

        if (imageFiles.length > 0) {
            uploads.push(uploadMediaMutation.mutateAsync({
                resourceId: createdResourceId,
                mediaType: 'images',
                files: imageFiles
            }));
        }

        if (images360Files.length > 0) {
            uploads.push(uploadMediaMutation.mutateAsync({
                resourceId: createdResourceId,
                mediaType: 'images360',
                files: images360Files
            }));
        }

        if (videoFiles.length > 0) {
            uploads.push(uploadMediaMutation.mutateAsync({
                resourceId: createdResourceId,
                mediaType: 'videos',
                files: videoFiles
            }));
        }

        if (video360Files.length > 0) {
            uploads.push(uploadMediaMutation.mutateAsync({
                resourceId: createdResourceId,
                mediaType: 'videos360',
                files: video360Files
            }));
        }

        if (uploads.length === 0) {
            toast.success('Recurso creado sin archivos multimedia');
            handleClose();
            return;
        }

        try {
            await Promise.all(uploads);
            toast.success('Archivos multimedia subidos exitosamente');
            handleClose();
        } catch (error) {
            toast.error('Error al subir algunos archivos');
        }
    };

    const handleClose = () => {
        reset();
        setStep('form');
        setCreatedResourceId(null);
        setImageFiles([]);
        setImages360Files([]);
        setVideoFiles([]);
        setVideo360Files([]);
        onClose();
    };

    const isLoading = createMutation.isPending || updateMutation.isPending || uploadMediaMutation.isPending;

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={
                step === 'media'
                    ? 'Subir Archivos Multimedia'
                    : (isEditMode ? 'Editar Recurso Turístico' : 'Nuevo Recurso Turístico')
            }
            maxWidth="2xl"
        >
            {step === 'form' ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Nombre"
                            placeholder="Ej: Torre del Reloj"
                            error={errors.name}
                            {...register('name')}
                        />

                        <div className="flex flex-col gap-1.5">
                            <label className="text-sm font-medium text-text-secondary">
                                Categoría
                            </label>
                            <select
                                className={`flex h-10 w-full rounded-md border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-offset-1 ${errors.category
                                    ? 'border-error focus:ring-error'
                                    : 'border-gray-300 focus:border-primary focus:ring-primary'
                                    }`}
                                {...register('category')}
                            >
                                <option value="">Selecciona una categoría</option>
                                {Object.entries(CATEGORY_TRANSLATIONS).map(([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="text-xs text-error font-medium">{errors.category.message}</p>
                            )}
                        </div>
                    </div>

                    <Textarea
                        label="Descripción"
                        placeholder="Describe el recurso turístico..."
                        rows={3}
                        error={errors.description}
                        {...register('description')}
                    />

                    <Input
                        label="Dirección"
                        placeholder="Calle Principal, 123"
                        error={errors.address}
                        {...register('address')}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label="Latitud"
                            type="number"
                            step="any"
                            placeholder="38.3796"
                            error={errors.latitude}
                            {...register('latitude', { valueAsNumber: true })}
                        />

                        <Input
                            label="Longitud"
                            type="number"
                            step="any"
                            placeholder="-4.8468"
                            error={errors.longitude}
                            {...register('longitude', { valueAsNumber: true })}
                        />
                    </div>

                    <Input
                        label="Teléfono (opcional)"
                        type="tel"
                        placeholder="+34 123 456 789"
                        error={errors.phone}
                        {...register('phone')}
                    />

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            loading={isLoading}
                        >
                            {isEditMode ? 'Actualizar y Continuar' : 'Crear y Continuar'}
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="flex flex-col h-full">
                    <div className="flex-1 overflow-y-auto max-h-[60vh] pr-2 space-y-6">
                        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <p className="text-sm text-green-800">
                                Recurso turístico guardado. Ahora puedes subir archivos multimedia (opcional).
                            </p>
                        </div>

                        <MediaUpload
                            label="Imágenes"
                            mediaType="images"
                            files={imageFiles}
                            onChange={setImageFiles}
                            initialFiles={resource?.media?.images || []}
                            onRemoveInitial={(filename) => handleRemoveExistingMedia('images', filename)}
                        />

                        <MediaUpload
                            label="Imágenes 360°"
                            mediaType="images360"
                            files={images360Files}
                            onChange={setImages360Files}
                            initialFiles={resource?.media?.images360 || []}
                            onRemoveInitial={(filename) => handleRemoveExistingMedia('images360', filename)}
                        />

                        <MediaUpload
                            label="Videos"
                            mediaType="videos"
                            files={videoFiles}
                            onChange={setVideoFiles}
                            initialFiles={resource?.media?.videos || []}
                            onRemoveInitial={(filename) => handleRemoveExistingMedia('videos', filename)}
                        />

                        <MediaUpload
                            label="Videos 360°"
                            mediaType="videos360"
                            files={video360Files}
                            onChange={setVideo360Files}
                            initialFiles={resource?.media?.videos360 || []}
                            onRemoveInitial={(filename) => handleRemoveExistingMedia('videos360', filename)}
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-4 bg-white">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={handleClose}
                            disabled={isLoading}
                        >
                            Omitir y Finalizar
                        </Button>
                        <Button
                            type="button"
                            onClick={handleMediaUpload}
                            loading={isLoading}
                            disabled={imageFiles.length === 0 && images360Files.length === 0 && videoFiles.length === 0 && video360Files.length === 0}
                        >
                            Subir Archivos
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};
