# Phaser Webpack Template

This is a Phaser 3 project template that uses webpack for bundling. It supports hot-reloading for quick development workflow and includes scripts to generate production-ready builds.

### Versions

This template has been updated for:

- [Phaser 3.80.1](https://github.com/phaserjs/phaser)
- [Webpack 5.91.0](https://github.com/webpack/webpack)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command                  | Description                                    |
| ------------------------ | ---------------------------------------------- |
| `npm install`            | Install project dependencies                   |
| `npm run dev`            | Launch a development web server                |
| `npm run build`          | Create a production build in the `dist` folder |
| `npx prettier . --write` | Prettify all of the code in the project        |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:8080` by default. Please see the webpack documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Webpack will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

```
phaser-game/
├── public/
|   ├── assets/
|   |   ├── audio/
|   |   ├── fonts/
|   |   └── images/
|   ├── favicon.png
|   └── style.css
├── src/
|   ├── game/
|   |   ├── entities/
|   |   ├── scenes/
|   |   ├── ui/
|   |   └── utils/
|   └── main.js
├── webpack/
|   ├── config.js
|   └── config.prod.js
├── .babelrc
├── .gitignore
├── .prettierrc
├── index.html
├── package.json
├── package-lock.json
└── webpack.config.js
```

## Handling Assets

Webpack supports loading assets via JavaScript module `import` statements.

This template provides support for both embedding assets and also loading them from a static folder. To embed an asset, you can import it at the top of the JavaScript file you are using it in:

```js
import logoImg from './assets/logo.png';
```

To load static files such as audio files, videos, etc place them into the `public/assets` folder. Then you can use this path in the Loader calls within Phaser:

```js
preload();
{
  //  This is an example of an imported bundled image.
  //  Remember to import it at the top of this file
  this.load.image('logo', logoImg);

  //  This is an example of loading a static image
  //  from the public/assets folder:
  this.load.image('background', 'assets/bg.png');
}
```

When you issue the `npm run build` command, all static assets are automatically copied to the `dist/assets` folder.

## Deploying to Production

After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.

In order to deploy your game, you will need to upload _all_ of the contents of the `dist` folder to a public facing web server.

## Customizing the Template

### Babel

You can write modern ES6+ JavaScript and Babel will transpile it to a version of JavaScript that you want your project to support. The targeted browsers are set in the `.babelrc` file and the default currently targets all browsers with total usage over "0.25%" but excludes IE11 and Opera Mini.

```
"browsers": [
 ">0.25%",
 "not ie 11",
 "not op_mini all"
]
```

### Webpack

If you want to customize your build, such as adding a new webpack loader or plugin (i.e. for loading CSS or fonts), you can modify the `webpack/config.js` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [Webpack documentation](https://webpack.js.org/) for more information.
