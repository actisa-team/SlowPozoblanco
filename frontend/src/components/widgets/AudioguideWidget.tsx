import React from 'react';
import { Card } from '../ui/Card';
import { Headphones } from 'lucide-react';

export const AudioguideWidget = () => {
    return (
        <Card className="h-full flex items-center gap-4 bg-gradient-to-r from-surface-totem to-app/50">
            <div className="p-3 bg-accent-totem/10 text-accent-totem rounded-full shrink-0">
                <Headphones size={24} />
            </div>
            <div>
                <h3 className="font-bold text-main text-lg leading-tight">Audioguía Oficial</h3>
                <p className="text-xs text-muted mt-1">Escucha la historia del lugar</p>
            </div>
        </Card>
    );
};
