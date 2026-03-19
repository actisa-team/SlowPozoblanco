import React, { useEffect, useRef } from 'react';
import { Viewer } from '@photo-sphere-viewer/core';
import { EquirectangularVideoAdapter } from '@photo-sphere-viewer/equirectangular-video-adapter';
import { VideoPlugin } from '@photo-sphere-viewer/video-plugin';
import '@photo-sphere-viewer/core/index.css';
import '@photo-sphere-viewer/video-plugin/index.css';

interface MediaViewer360Props {
    url: string;
    type: 'image360' | 'video360';
}

export const MediaViewer360: React.FC<MediaViewer360Props> = ({ url, type }) => {
    const viewerRef = useRef<HTMLDivElement>(null);
    const viewerInstance = useRef<Viewer | null>(null);


    useEffect(() => {
        if (!viewerRef.current) return;

        // Cleanup previous instance
        if (viewerInstance.current) {
            viewerInstance.current.destroy();
            viewerInstance.current = null;
        }

        const isVideo = type === 'video360';
        const container = viewerRef.current;

        console.log('MediaViewer360: Initializing...', { url, type, width: container.clientWidth, height: container.clientHeight });

        // Add small delay to ensure container has dimensions (Modal animation)
        const initTimer = setTimeout(() => {
            if (!container) return;

            const config: any = {
                container: container,
                caption: 'Visor 360',
                loadingTxt: 'Cargando...',
                defaultYaw: 0,
                defaultPitch: 0,
                defaultZoomLvl: 50,
                navbar: [
                    'zoom',
                    'move',
                    'fullscreen',
                    'caption',
                ],
                plugins: [],
            };

            if (isVideo) {
                // For video, the source is passed via the adapter or plugin, but usually adapter takes source
                // However, check docs: EquirectangularVideoAdapter usually requires plugins: [[VideoPlugin, ...]]
                // and the adapter itself.
                config.adapter = [EquirectangularVideoAdapter, {
                    autoplay: true,
                    muted: false,
                }];
                config.plugins.push([VideoPlugin, {
                    progressbar: true,
                    bigbutton: true
                }]);
                config.panorama = { source: url };
            } else {
                config.panorama = url;
            }

            try {
                const viewer = new Viewer(config);
                viewerInstance.current = viewer;

                viewer.addEventListener('ready', () => {
                    console.log('MediaViewer360: Viewer ready');
                });

                viewer.addEventListener('panorama-error', (e) => {
                    console.error('MediaViewer360: Viewer error event', e);
                });

            } catch (err) {
                console.error('MediaViewer360: Initialization error', err);
            }
        }, 100);

        return () => {
            clearTimeout(initTimer);
            if (viewerInstance.current) {
                viewerInstance.current.destroy();
                viewerInstance.current = null;
            }
        };
    }, [url, type]);

    return <div ref={viewerRef} style={{ width: '100%', height: '75vh' }} className="w-full" />;
};
