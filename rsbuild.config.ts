import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  html: {
    template: './index.html',
  },
  output: {
    polyfill: 'usage',
    minify: {
    },
    assetPrefix: './',
    sourceMap: true,
  },
  source: {
    entry: {
      index: './src/index.tsx',
    },
  },
  plugins: [pluginReact()],
})
