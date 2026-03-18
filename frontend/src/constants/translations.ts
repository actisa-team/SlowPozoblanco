import { UserRole } from '../types/auth.types';
import { TourismResourceCategory } from '../types/tourismResources.types';

export const ROLE_TRANSLATIONS: Record<UserRole, string> = {
    [UserRole.ADMIN]: 'Administrador',
    [UserRole.MANAGER]: 'Gestor',
    [UserRole.USER]: 'Usuario',
};

export const CATEGORY_TRANSLATIONS: Record<string, string> = {
    [TourismResourceCategory.MONUMENT]: 'Monumento',
    [TourismResourceCategory.MUSEUM]: 'Museo',
    [TourismResourceCategory.PARK]: 'Parque',
    [TourismResourceCategory.RESTAURANT]: 'Restaurante',
    [TourismResourceCategory.HOTEL]: 'Hotel',
    [TourismResourceCategory.OTHER]: 'Otro',
};

export const getCategoryTranslation = (category?: string): string => {
    if (!category) return 'Otro';
    const normalized = category.toUpperCase();
    return CATEGORY_TRANSLATIONS[normalized] || category;
};
