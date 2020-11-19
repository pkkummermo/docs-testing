module.exports = {
  purge: {
    content: ["./src/**/*.html", "./src/**/*.md", "./src/**/*.vue", "./content/**/*.html", "./content/**/*.md", "./content/**/*.vue"],
    options: {
      whitelistPatterns: [/markdown/, /g-image/],
      whitelistPatternsChildren: [/^token/, /^pre/, /^code/],
    },
  },
  theme: {
    extend: {
      colors: {
        ui: {
          background: 'var(--color-ui-background)',
          sidebar: 'var(--color-ui-sidebar)',
          typo: 'var(--color-ui-typo)',
          primary: 'var(--color-ui-primary)',
          border: 'var(--color-ui-border)'
        }
      },
      spacing: {
        sm: '24rem'
      },
      screens: {
        xxl: '1400px'
      }
    },
    container: {
      center: true,
      padding: '1rem'
    }
  },
  variants: {},
  plugins: [],
}
