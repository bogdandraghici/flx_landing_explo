import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        agents: fileURLToPath(new URL('./agents.html', import.meta.url)),
        banking: fileURLToPath(new URL('./banking.html', import.meta.url)),
        about: fileURLToPath(new URL('./about.html', import.meta.url)),
        resources: fileURLToPath(new URL('./resources.html', import.meta.url)),
        blogflowx6: fileURLToPath(new URL('./blog-flowx-6.html', import.meta.url)),
      },
    },
  },
});
