import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Reactive Docs',
  description: 'Documentation for @alinnert/reactive',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Get started', link: '/get-started' },
      { text: 'API docs', link: '/value-types/index' },
    ],

    sidebar: {
      '/value-types/': [
        {
          text: 'Value types',
          items: [
            {
              text: 'Overview',
              link: '/value-types/index',
            },
            {
              text: 'Mutable value',
              link: '/value-types/mutable-value',
            },
            {
              text: 'Computed value',
              link: '/value-types/computed-value',
            },
            {
              text: 'Automated value',
              link: '/value-types/automated-value',
            },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
})
