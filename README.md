# Overview

Kill Bill API documentation.

## Edit and Syntax

The documentation is in the `source/includes` directory.

Markdown syntax: https://github.com/slatedocs/slate/wiki/Markdown-Syntax

## Deployment

The site is built using [Middleman](https://github.com/middleman/middleman):

```
middleman build
```

See also https://github.com/slatedocs/slate.

Notes:

* The generated static pages under `build` are deployed by Cloudflare (https://apidocs.killbill.io/)
* The built pages are also pushed to the `gh-pages` branch for debugging (served by GitHub pages at https://killbill.github.io/slate/ for backward compatibility)
* Minification of assets is handled by Cloudflare (check-in the unminified version)

## Development

To run the site locally:

```
middleman server
```
