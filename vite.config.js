import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: (id) => {
        // Inclure 'source-map-js' dans le bundle
        if (id === 'source-map-js') {
          return false;
        }
        // Exclure les modules externes spécifiques
        return id.startsWith('external_module');
      },
    },
  },
});
