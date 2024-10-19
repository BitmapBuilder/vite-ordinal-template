import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import glsl from 'vite-plugin-glsl';
import { promises as fs } from 'fs';
import path from 'path';
import fetch from 'node-fetch';

function downloadExternalModules() {
    return {
        name: 'cache-external-modules',
        async resolveId(source) {
            // Detect any imports that start with '/content/'
            if (source.startsWith('/content/')) {
                const fileName = source.replace('/content/', ''); // Extract the filename
                const resolvedPath = path.resolve(__dirname, `external_modules/content/${fileName}`);
                return resolvedPath; // Dynamically resolve to the cached file
            }
            return null;
        },
        async load(id) {
            // Check if the file path is in the external_modules/content folder
            if (id.includes('external_modules/content/')) {
                const fileName = path.basename(id);
                const filePath = path.resolve(__dirname, `external_modules/content/${fileName}`);

                // Check if the file exists locally
                try {
                    await fs.access(filePath);
                    return await fs.readFile(filePath, 'utf-8');
                } catch (err) {
                    // If the file doesn't exist locally, fetch it from the external URL and cache it
                    const fileUrl = `https://ordinals.com/content/${fileName}`;
                    const res = await fetch(fileUrl);
                    const content = await res.text();

                    // Cache the file locally for future use
                    await fs.mkdir(path.dirname(filePath), { recursive: true });
                    await fs.writeFile(filePath, content);
                    return content;
                }
            }
            return null;
        }
    };
}

export default defineConfig(({ command }) => {

    let removeImportMap = command === 'build' ? {
        name: 'remove-importmap-plugin',
        transformIndexHtml(html) {
            return html.replace(/<script type="importmap">[\s\S]*?<\/script>/g, '');
        }
    } : null;

    let hdrFix = command === 'build' ? {
        name: 'hdr-fix-plugin',
        transform(code, id) {
            if (id.endsWith('.js') || id.endsWith('.jsx') || id.endsWith('.ts') || id.endsWith('.tsx')) {
                return {
                    code: code.replace(/\?\.\s*hdr/g, ''),
                    map: null // Preserve source maps if necessary
                };
            }
            return null;
        }
    } : null;

    return {
        optimizeDeps: {
            // exclude: ['bitmapOCI', 'bitmon', 'boxelGeometry', 'boxels-shader', 'useGUI', 'GridFloor'],
        },
        plugins: [
            react(),
            downloadExternalModules(), // Dynamically cache and resolve external modules
            viteSingleFile(),
            glsl({
                compress: true,
            }),
            // removeImportMap,
            hdrFix,
        ],
        server: {
            logLevel: 'error', // Only show errors, no warnings
            port: 4000,
            proxy: {
                '/content': {
                    target: 'https://ordinals.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/content/, '/content'),
                    secure: false,
                },
            },
        },
        build: {
            outDir: 'build',
            sourcemap: false,
            rollupOptions: {
                external: [
                    'boxelGeometry',
                    'boxels-shader',
                    'useGUI',
                    'GridFloor',
                    'three',
                    'react',
                    'react-dom',
                    'react-dom/client',
                    'react/jsx-runtime',
                    'babel-extends',
                    '@use-gesture/react',
                    '@react-three/fiber',
                    '@react-three/postprocessing',
                    '@react-three/drei',
                    '@react-three/cannon',
                    '@react-three/a11y',
                    '@react-three/csg',
                    'three-custom-shader-material',
                    'leva',
                    'randomish',
                    'material-composer',
                    'material-composer-r3f',
                    'shader-composer',
                    'shader-composer-r3f',
                    'shader-composer-toybox',
                    'vfx-composer',
                    'vfx-composer-r3f',
                    '@react-spring/three',
                    'statery',
                    'maath',
                    'r3f-perf',
                    'suspend-react',
                    'miniplex',
                    'miniplex-react',
                    'simplex-noise',
                    'alea',
                    'bitmapOCI',
                    'bitmon',
                ],
            },
        },
    }
});
