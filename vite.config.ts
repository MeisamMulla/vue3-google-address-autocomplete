import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/components/GoogleAddressAutocomplete.vue'),
            name: 'GoogleAddressAutocomplete',
            fileName: (format) => `vue3-google-address-autocomplete.${format}.js`,
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue',
                },
            },
        },
    },
    plugins: [vue()],
});
;  