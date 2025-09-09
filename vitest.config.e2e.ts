import { resolve } from 'node:path';

import swc from 'unplugin-swc';
import tsConfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        include: ['test/*.e2e.test.ts'],
        globals: true,
        root: './',
        setupFiles: ['./test/setup.e2e.ts'],
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