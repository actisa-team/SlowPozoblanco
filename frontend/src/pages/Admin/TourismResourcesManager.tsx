import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { TourismResourceService } from '../../services/tourismResources.service';
import { Loader2, Plus, Edit, Trash2, MapPin, Image } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { toast } from 'react-hot-toast';
import { TourismResourceFormModal } from '../../components/admin/TourismResourceFormModal';
import { useState } from 'react';
import type { TourismResource } from '../../types/tourismResources.types';
import { getCategoryTranslation } from '../../constants/translations';


export const TourismResourcesManager = () => {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedResource, setSelectedResource] = useState<TourismResource | undefined>(undefined);
    const [modalInitialStep, setModalInitialStep] = useState<'form' | 'media'>('form');

    const { data: tourismResources, isLoading } = useQuery({
        queryKey: ['tourismResources'],
        queryFn: TourismResourceService.getAll,
    });

    const deleteMutation = useMutation({
        mutationFn: TourismResourceService.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['tourismResources'] });
            toast.success('Recurso Turístico eliminado');
        },
    });

    const handleCreate = () => {
        setSelectedResource(undefined);
        setModalInitialStep('form');
        setIsModalOpen(true);
    };

    const handleEdit = (resource: TourismResource) => {
        setSelectedResource(resource);
        setModalInitialStep('form');
        setIsModalOpen(true);
    };

    const handleMedia = (resource: TourismResource) => {
        setSelectedResource(resource);
        setModalInitialStep('media');
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedResource(undefined);
    };

    if (isLoading) return <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Gestión de Recursos Turísticos</h1>
                <Button icon={<Plus className="h-4 w-4" />} onClick={handleCreate}>
                    Nuevo Recurso Turístico
                </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tourismResources?.map((resource) => (
                    <div key={resource.id} className="relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-semibold text-gray-900">{resource.name}</h3>
                                <div className="mt-1 flex items-center text-sm text-gray-500">
                                    <MapPin className="mr-1 h-3 w-3" />
                                    <span className="truncate max-w-[150px]">{resource.address}</span>
                                </div>
                                <span className="mt-2 inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                    {getCategoryTranslation(resource.category)}
                                </span>
                            </div>
                            {resource.media?.images?.[0] && (
                                <img src={`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'}/../${resource.media.images[0]}`} alt="" className="h-16 w-16 rounded object-cover" />
                            )}
                        </div>

                        <div className="mt-4 flex justify-end gap-2 border-t pt-4">
                            <Button
                                size="sm"
                                variant="outline"
                                icon={<Image className="h-3 w-3" />}
                                onClick={() => handleMedia(resource)}
                            >
                                Multimedia
                            </Button>
                            <Button
                                size="sm"
                                variant="secondary"
                                icon={<Edit className="h-3 w-3" />}
                                onClick={() => handleEdit(resource)}
                            >
                                Editar
                            </Button>
                            <Button
                                size="sm"
                                variant="danger"
                                icon={<Trash2 className="h-3 w-3" />}
                                onClick={() => {
                                    if (confirm('¿Eliminar este recurso turístico?')) {
                                        deleteMutation.mutate(resource.id);
                                    }
                                }}
                            >
                                Eliminar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <TourismResourceFormModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                resource={selectedResource}
                initialStep={modalInitialStep}
            />
        </div>
    );
};

export default TourismResourcesManager;
