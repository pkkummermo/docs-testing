# Lab5e documentation

![Lab5e Logo](./static/logo.png)

The documentation is built on [Gridsome](https://gridsome.org/), a static site generator with a Vue frontend.

## Prerequesites

- Node 12+

## Installation

`npm i`

This will install all dependencies needed to run the project.

## Development

`npm start`

This will start a dev-server on [http://localhost:8080](http://localhost:8080). All markdown and HTML changes made will automatically hot reload to the browser, however config changes in the `gridsome.config.js` needs a server restart. Simply stop the server and restart it with `npm start`.

### GraphQL

The underlying datastructure for the markdown files are accessible through Explore GraphQL at [http://localhost:8080/\_\_explore](http://localhost:8080/__explore). These are the data documents that are used for generating the built pages, and can be accessed and create more meta for the documentation.

### Editing and creating new entries

All content is found in the `content`-folder, and its path is created hierarchically according to the folder structure. We're also welcoming to edits, so all markdown pages have an automatic "edit this page" link added to them, which leads directly to github for creating pull requests.

### Creating new menu entries

All menu entries is found in `gridsome.config.js`, and can be customized as you want. For options, check out the [docc documentation](https://docc-theme.netlify.app/docs/sidebar/) for sidebars.

## Building production

`npm run build`

This will generate a `dist`-folder with the fully statically built site. This can be deployed and hosted to whatever CDN of your choosing.

## Gridsome

The documentation is built on [Gridsome](https://gridsome.org/).

## Docc specific documentation

Docc documentation (the template this theme is based on) can be found [here](https://docc-theme.netlify.com/).

## Future features

As we now basically have a vue application, we can now create dynamic content which uses our APIs directly from our documentation. Features such as listing actual data from the logged in user is possible, and we shall see how much we'll expand upon this.
