# HydeCode

## General
### IDE Settings
IDE Settings can applied from editorconfig although it is recommended to apply code style settings from the tslint.json.

### Typescript
This project is based on Typescript. To compile the Typescript code, run
``npm run build``  
To start the watch mode run  
``npm run watch``

## Project Structure
````javascript
boilerplate/        /* This directory contains the boilerplate code for our basic jekyll project. */
dist/               /* This directory contains the built javascript code. */
node_modules/       /* This directory contains the dependencies. */
sites/              /* This directory contains the user's project. */
src/                /* This directory contains the typescript source code. */
    functions/      /* This directory contains the typescript scripts that handle the app functionalities. */
    interfaces/     /* This directory contains the typescript interfaces. */
````

## Dependencies
This being a node project, it still requires software that cannot be managed by node itself:
* [Jekyll](https://jekyllrb.com/)
