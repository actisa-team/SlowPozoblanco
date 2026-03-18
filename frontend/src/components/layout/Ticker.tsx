import React from 'react';

export const Ticker = () => {
    const style = {
        animation: 'ticker 30s linear infinite',
        whiteSpace: 'nowrap'
    } as React.CSSProperties;

    React.useEffect(() => {
        const styleSheet = document.createElement("style");
        styleSheet.innerText = `
            @keyframes ticker {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
        `;
        document.head.appendChild(styleSheet);
        return () => {
            document.head.removeChild(styleSheet);
        }
    }, []);

    return (
        <div className="bg-gray-900 text-white h-full flex items-center overflow-hidden relative">
            <div className="flex gap-12 w-full" style={style}>
                <span className="portrait:text-4xl landscape:text-lg font-medium">✨ Horario de visitas: 10:00 - 18:00</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">•</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">🌡️ Temperatura actual: 24°C</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">•</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">🎭 Próximo evento: Teatro en la Plaza (20:00)</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">•</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">ℹ️ Punto de información abierto</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">•</span>
                <span className="portrait:text-4xl landscape:text-lg font-medium">🚴 Alquila tu bici eléctrica en el centro</span>
            </div>
        </div>
    );
};
