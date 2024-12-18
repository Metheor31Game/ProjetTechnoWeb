import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,  // Utiliser les fonctions globales (comme expect)
    environment: 'node',  // Simuler un environnement Node.js pour tester les routes API
  },
});
