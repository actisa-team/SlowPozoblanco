import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Car } from 'lucide-react';
import { PARKING_DATA } from '../../data';

export const ParkingWidget = () => {
    return (
        <Card className="h-full flex flex-col">
            <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Car size={20} />
                </div>
                <h3 className="font-bold text-main">Parking</h3>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {PARKING_DATA.map((parking) => {
                    let status: 'success' | 'warning' | 'danger' = 'success';
                    if (parking.free === 0) status = 'danger';
                    else if (parking.free <= 10) status = 'warning';

                    return (
                        <div key={parking.id} className="flex items-center justify-between p-2 rounded-lg bg-app/50">
                            <span className="text-sm font-medium text-main">{parking.name}</span>
                            <Badge variant={status}>
                                {parking.free === 0 ? 'Completo' : `${parking.free} Libres`}
                            </Badge>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
