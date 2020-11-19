// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Lab5e doc',
  icon: {
    favicon: './src/assets/favicon.png',
    touchicon: './src/assets/favicon.png'
  },
  siteUrl: (process.env.SITE_URL ? process.env.SITE_URL : 'https://docs.lab5e.com'),
  settings: {
    web: "https://lab5e.com",
    twitter: process.env.URL_TWITTER || false,
    github: "https://github.com/lab5e/",
    nav: {
      links: [
        { path: '/docs/', title: 'Home' }
      ]
    },
    sidebar: [
      {
        name: 'docs',
        sections: [
          {
            title: 'Span',
            items: [
              '/docs/span/',
              '/docs/span/quick-reference/',
              '/docs/span/at-commands/',
              '/docs/span/bsd-sockets/',
              '/docs/span/fota/',
              '/docs/span/outputs/',
              '/docs/span/clients/',
              '/docs/span/user-teams-and-tokens/',
            ]
          },
          {
            title: 'OpenAPI',
            items: [
              "/docs/openapi/"
            ]
          }
        ]
      },
      {
        name: 'outputs',
        sections: [
          {
            title: 'Outputs',
            items: [
              '/docs/span/outputs/webhook/',
              '/docs/span/outputs/mqtt/',
              '/docs/span/outputs/ifttt/',
            ]
          },
        ]
      },
      {
        name: 'clients',
        sections: [
          {
            title: 'Clients',
            items: [
              '/docs/span/clients/curl/',
              '/docs/span/clients/go/',
            ]
          },
        ]
      }
    ]
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        baseDir: './content',
        path: '**/*.md',
        typeName: 'MarkdownPage',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['noopener', 'noreferrer'],
          plugins: [
            '@gridsome/remark-prismjs'
          ]
        }
      }
    },

    {
      use: 'gridsome-plugin-tailwindcss',
      options: {
        tailwindConfig: './tailwind.config.js',
        purgeConfig: {
          // Prevent purging of prism classes.
          whitelistPatternsChildren: [
            /token$/
          ]
        }
      }
    },

    {
      use: '@gridsome/plugin-google-analytics',
      options: {
        id: (process.env.GA_ID ? process.env.GA_ID : 'XX-999999999-9')
      }
    },

    {
      use: '@gridsome/plugin-sitemap',
      options: {  
      }
    }

  ]
}
