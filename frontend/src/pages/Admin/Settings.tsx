import { Settings as SettingsIcon, Save } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const Settings = () => {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Configuración</h1>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <SettingsIcon className="h-5 w-5 text-gray-600" />
                    <h2 className="text-lg font-semibold">Configuración General</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre del Sistema
                        </label>
                        <input
                            type="text"
                            defaultValue="Slow Pozoblanco"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email de Contacto
                        </label>
                        <input
                            type="email"
                            defaultValue="info@pozoblanco.es"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Descripción
                        </label>
                        <textarea
                            rows={3}
                            defaultValue="Portal de turismo sostenible de Pozoblanco"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <Button icon={<Save className="h-4 w-4" />}>
                        Guardar Cambios
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Settings;
