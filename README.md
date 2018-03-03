# Smart Sprinkler

The frontend is generated with [Angular CLI](https://github.com/angular/angular-cli).

This project uses the [MEAN stack](https://en.wikipedia.org/wiki/MEAN_(software_bundle)):
* [**A**ngular 5+](https://angular.io): frontend framework
* [**N**ode.js](https://nodejs.org): runtime environment

Other tools and technologies used:
* [Angular CLI](https://cli.angular.io): frontend scaffolding
* [Bootstrap](http://www.getbootstrap.com): layout and styles
* [Font Awesome](http://fontawesome.io): icons
* [JSON Web Token](https://jwt.io): user authentication
* [Angular 2 JWT](https://github.com/auth0/angular2-jwt): JWT helper for Angular
* [Bcrypt.js](https://github.com/dcodeIO/bcrypt.js): password encryption

## Prerequisites
1. Install [Node.js](https://nodejs.org/en/download)(>= v8.9.3) and [npm](https://www.npmjs.com/package/npm)(>= 5.6.0)
 * Check Nodejs version
`node --version` or `node -v`
 * Check npm version
`npm --version` or `node -v`
2. Install Angular CLI: `npm i -g @angular/cli`
3. From project root folder install all the dependencies: `npm install` or `npm i`

## Build
### Development mode
`ng build --dev`
### Production mode
`ng build --prod`

## Run
`ng serve`

This commmand will execute Angular build, TypeScript compiler and run server at [localhost:4200](http://localhost:4200).