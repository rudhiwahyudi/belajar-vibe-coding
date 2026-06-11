import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import mdx from '@mdx-js/rollup'
import remarkFrontmatter from 'remark-frontmatter'
import remarkMdxFrontmatter from 'remark-mdx-frontmatter'
import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'

const mdxPlugin = mdx({
  remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter, remarkGfm],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'wrap' }]],
})

const mdxTransform = mdxPlugin.transform.bind(mdxPlugin)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    {
      ...mdxPlugin,
      enforce: 'pre',
      // `@mdx-js/rollup` strips the query string before checking the file
      // extension, so it would otherwise also compile `*.mdx?raw` imports
      // (used to read post source for reading time / TOC) as MDX components.
      transform(code, id) {
        if (id.includes('?')) return
        return mdxTransform(code, id)
      },
    },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
