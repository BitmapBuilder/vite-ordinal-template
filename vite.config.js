import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {viteSingleFile} from 'vite-plugin-singlefile'
import replace from '@rollup/plugin-replace'
import glsl from 'vite-plugin-glsl';

export default defineConfig(({command}) => {

    return {
        optimizeDeps: {
            exclude: ['boxels'],
        },
        resolve: {
            alias: {
                boxels: '/content/c0dec9591190449efc84e972ebc6b96e98a6ce971faa79357e0e688167934131i0', // Replace with the correct URL
            },
        },
        plugins: [
            react(),
            viteSingleFile(),
            glsl({
                compress: true,
            }),
            replace({
                preventAssignment: true, // Required by the plugin
                'https://ordinals.com': '',
            })
        ],
        server: {
            logLevel: 'error', // Only show errors, no warnings
            port: 4000, // Change the port to 4000 or any other available port
            proxy: {
                '/content': {
                    target: 'https://ordinals.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/content/, '/content'),
                    secure: false
                },
                '/r': {
                    target: 'https://ordinals.com',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/r/, '/r'),
                    secure: false
                }
            }
        },
        build: {
            sourcemap: false, // Disable source maps entirely
            rollupOptions: {
                plugins: [
                    // Apply the replace plugin only during build
                    command === 'build' &&
                    replace({
                        preventAssignment: true,
                        values: {
                            '?.hdr': '',
                        },
                        delimiters: ['', ''],
                    }),
                ],
                external: [
                    'boxels',
                    'react',
                    'react-dom',
                    'react/jsx-runtime',
                    'three',
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
                    'maath'
                ]
            }
        }
    }
})
