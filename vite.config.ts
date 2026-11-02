import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

const localReact = (p: string) => fileURLToPath(new URL(`./node_modules/${p}`, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  server: {
    port: Number(process.env.PORT) || 5183,
  },
  resolve: {
    // `design-system` is linked with `file:../design-system`, which installs as
    // a symlink — so module resolution walks up from the design system's REAL
    // path and finds *its* node_modules/react first. Two React copies means
    // "Invalid hook call" the moment a hook-using DS component renders
    // (FilterDropdown, Tooltip, Combobox). dedupe alone doesn't cover deep
    // specifiers, hence the explicit aliases below.
    dedupe: ['react', 'react-dom'],
    alias: [
      { find: /^react$/, replacement: localReact('react') },
      { find: /^react\/jsx-runtime$/, replacement: localReact('react/jsx-runtime') },
      { find: /^react\/jsx-dev-runtime$/, replacement: localReact('react/jsx-dev-runtime') },
      { find: /^react-dom$/, replacement: localReact('react-dom') },
      { find: /^react-dom\/client$/, replacement: localReact('react-dom/client') },
    ],
  },
})
