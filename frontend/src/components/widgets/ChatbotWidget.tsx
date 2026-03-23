import React from 'react';
import { Card } from '../ui/Card';
import { MessageCircle } from 'lucide-react';
import chatbotImg from '../../assets/chatbot.png';

export const ChatbotWidget = () => {
    return (
        <Card className="h-full flex flex-col relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-totem/5 to-transparent z-0" />

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-primary-totem/10 text-primary-totem rounded-lg">
                        <MessageCircle size={20} />
                    </div>
                    <h3 className="font-bold text-main">Asistente</h3>
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="text-center p-4">
                        <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center animate-[pulse_3s_ease-in-out_infinite] transition-transform hover:scale-110 cursor-pointer">
                            <img src={chatbotImg} alt="Gallo Asistente" className="w-full h-full object-contain drop-shadow-lg" />
                        </div>
                        <p className="text-sm text-muted font-medium">¿Necesitas ayuda? Toca aquí.</p>
                    </div>
                </div>
            </div>
        </Card>
    );
};
