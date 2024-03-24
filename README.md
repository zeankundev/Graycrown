<div align="center">
<b>Welcome to the new Graycrown rewrite (1.2.3 and so on)!</b>
</div>

![graycrown logo](https://zeankundev.github.io/Graycrown/assets/svg/logo.svg)
# Graycrown
A simple game launcher for Windows, macOS and Linux

## Why a rewrite?
The old Graycrown's framework (<1.2.2) is so clutterly. It was oriented around HTML5 and JS. All code has to be collected and interpreted under `main.js`. That script, let alone, resides for insane amount of 735 lines of code, and has not been cleaned up since. Graycrown is undergoing a major rewrite in which all problems are solved, as well as making the app better.

## How to run?
Install the dependencies
```
npm i
```
, and you have three options to run Graycrown.
- `npm start` is to start both main and renderer process
- `npm run start:main` is to start ONLY electron.
- `npm run start:renderer` is to ONLY start the react instance. Most of the features will not work, so it's not recommended.

# Acknowledgements
- [The Electron React Boilerplate project](https://github.com/electron-react-boilerplate/electron-react-boilerplate). Without you, setting up Graycrown in React will be so tedious and time consuming, especially node modules like `fs`, `path`, and others that make Graycrown possible!.
