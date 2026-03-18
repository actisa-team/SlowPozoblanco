ROL

Eres un Ingeniero Frontend Senior & Diseñador UI experto en React, Tailwind CSS y CSS Grid. Tu tarea es construir una interfaz para un tótem táctil vertical (1080x1920) sin ver el diseño original, basándote puramente en mi descripción estructural detallada.
OBJETIVO

Crear una SPA (Single Page Application) con React + Vite que renderice un dashboard informativo turístico con un layout asimétrico moderno ("Bento Grid"). La interfaz debe ser responsive pero optimizada para pantallas verticales 9:16.

1. DESCRIPCIÓN VISUAL & LAYOUT (GRID ASIMÉTRICO)

Imagina un grid vertical de 12 columnas x 12 filas (aprox). El layout se divide en las siguientes áreas:

A. Header (Tope, ancho completo)

    Título grande a la izquierda: "IGLESIA DE SANTA CATALINA" (o nombre del POI).

    Subtítulo debajo o al lado: "Lugar de interés turístico...".

    Fondo: transparente o sutilmente integrado.

B. Zona Central (Hero Carousel)

    Ocupa la parte central-superior.

    Visual: Una imagen principal grande central (foco) y dos imágenes parciales a los lados (izquierda/derecha) sugiriendo un carrusel 3D o "cover flow".

    Bordes redondeados (rounded-3xl), sombra suave.

C. Zona Media (PoiDots)

    Justo debajo del carrusel.

    Una fila horizontal de 5-6 círculos (avatares) con imágenes de otros lugares.

    Estilo: Círculos perfectos con borde sutil.

    Comportamiento: Estáticos. No hacen nada. Solo decorativos.

D. Zona Inferior Izquierda (Categorías)

    Grid de 3 tarjetas grandes cuadradas o rectangulares.

    Texto sobre imagen oscurecida: "Restauración", "Alojamientos", "Fiestas".

    Comportamiento: Botones que abren un modal.

E. Columna Lateral Derecha (Widgets)

    Esta columna "flota" a la derecha o se integra en el grid, ocupando el 25-30% del ancho.

    Widget 1 (Top): Audioguía (Tarjeta blanca, icono auriculares, texto "Audioguía Oficial").

    Widget 2 (Medio): Parking (Lista vertical: "P1 Plaza Mayor", "P2 Mercado"... con badges de colores según disponibilidad).

    Widget 3 (Bottom - Donde iba el mapa): Chatbot Placeholder. Tarjeta que dice "Asistente Virtual" o similar, vacía por dentro.

F. Footer (Bottom, ancho completo)

    Ticker de noticias (marquesina) con fondo oscuro y texto blanco corriendo de derecha a izquierda.

2.  REGLAS DE NEGOCIO & INTERACCIÓN

    Círculos (PoiDots): Renderizar visualmente pero DESHABILITAR interacción (pointer-events-none). No navegan.

    Categorías (Restauración/Alojamientos/Fiestas): Al hacer clic, abrir un componente EmptyModal (modal genérico centrado con título y botón "Cerrar", sin contenido real).

    Chatbot: Es solo visual. Un div con título "Asistente" y cuerpo vacío/gris.

    Parking: Usar datos mock. Lógica de colores semáforo:

        Verde (>10 libres)

        Amarillo (1-10 libres)

        Rojo (0 libres)

    Paleta de Colores: Usar Variables CSS (Tokens) mapeadas en Tailwind. No hardcodear hexadecimales en componentes.

3.  DESIGN SYSTEM (PALETA TOKENIZADA)

Implementa esto en src/styles/tokens.css y tailwind.config.js:

Tokens Base (Neutros & Elegantes):

    --bg-app: #F3F4F6 (Gris muy claro, fondo global)

    --surface: #FFFFFF (Tarjetas)

    --text-main: #111827 (Gris casi negro)

    --text-muted: #6B7280 (Gris medio)

    --primary: #0F766E (Un teal/esmeralda elegante para acentos)

    --accent: #F59E0B (Ámbar para destacados)

    --danger: #EF4444

    --success: #10B981

Tipografía: Sans-serif moderna (Inter o system-ui), pesos font-bold para títulos, font-medium para UI. radios de borde rounded-2xl o rounded-3xl para sensación "táctil". 4. INSTRUCCIONES DE IMPLEMENTACIÓN (PASO A PASO)

Genera el código en este orden:

    Configuración:

        tailwind.config.js extendiendo colores con var(--token).

        src/styles/tokens.css con las variables root.

    Componentes UI (Atomos/Moléculas):

        components/ui/Card.tsx: Wrapper con sombra y bg-surface.

        components/ui/Badge.tsx: Para los estados del parking.

        components/ui/Modal.tsx: Portal o dialog nativo para el modal vacío.

    Widgets Específicos:

        components/widgets/ParkingWidget.tsx: Lista con lógica de colores mock.

        components/widgets/ChatbotWidget.tsx: Placeholder visual.

        components/widgets/AudioguideWidget.tsx: Tarjeta simple.

        components/layout/Ticker.tsx: Marquesina animada (CSS animation).

    Layout Principal (TotemPage.tsx):

        Usa un contenedor h-screen w-full overflow-hidden bg-[var(--bg-app)].

        Implementa un CSS Grid robusto. Ejemplo conceptual:

        jsx
        <div className="grid grid-cols-12 grid-rows-12 h-full gap-6 p-8">
           {/* Header: row 1, col 1-12 */}
           {/* Carousel: row 2-7, col 1-8 */}
           {/* Widgets Col: row 2-11, col 9-12 (Audioguia, Parking, Chatbot) */}
           {/* Dots: row 8, col 1-8 */}
           {/* Categories: row 9-11, col 1-8 */}
           {/* Ticker: row 12, col 1-12 (fixed bottom) */}
        </div>

    Lógica:

        Estado simple para controlar qué modal está abierto (activeModal: 'restauracion' | 'alojamiento' | null).

        Datos mock en un archivo data.ts.

ENTREGABLE

Provee el código completo de los archivos clave:

    tailwind.config.js

    src/styles/tokens.css

    src/App.tsx (o TotemPage.tsx)

    Los componentes principales (ParkingWidget, ChatbotWidget, CategoryButtons).

Asegúrate de que el resultado se vea profesional, alineado, con sombras suaves y sensación de "kiosco moderno".
