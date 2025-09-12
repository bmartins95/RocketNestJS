import { resolve } from 'node:path';

import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/*.e2e.test.ts'],
        setupFiles: ['./test/setup.e2e.ts'],
        environment: 'node',
        globals: true,
        root: './',
    },
    plugins: [
        tsConfigPaths(),
        swc.vite({
            module: { type: 'es6' },
        }),
    ],
    resolve: {
        alias: {
            'src': resolve(__dirname, './src'),
        },
    },
});