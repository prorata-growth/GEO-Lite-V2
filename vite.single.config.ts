// One self-contained index.html for sharing: every script, style, font and
// image inlined, dynamic imports folded in. The normal build is unchanged.
import { defineConfig, mergeConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'
import base from './vite.config'

export default mergeConfig(
  base,
  defineConfig({
    plugins: [viteSingleFile()],
    build: { outDir: 'dist-single', assetsInlineLimit: 100_000_000 },
  }),
)
