
### Dependency Definitions
* `@babel/core`: core babel package. Responsible for transpiling ES6 javascript to regular JS.
* `@babel/polyfill`: allows you to use ES6 classes like Promise and WeakMap in your NodeJS code
* `@babel/preset-env`: the smart preset that looks at your environment and determines which ES6 features you'll need.
* `@babel/preset-react`: transpiles all jsx shit to javascript shit
* `@babel/register`: performs all the babel transformations in memory so no output file is needed. This should only be used in development
* `babel-loader`: the webpack loader that allows for the connection between webpack and babel
* `express`: NodeJS server
* `nodemon`: allows for automatic restarts of the nodeJS server
* `react-hot-loader`: this is a webpack loader that allows for hot loading of react components without refreshing the page
* `url-loader`: this package will let you import files (images, svgs, etc) the same way you would import javascript files and use them in markup. It will dump the contents of a file as a Base64 encoded string
* `webpack-cli`: allows webpack to do it's thing from the command line
* `webpack-dev-middleware`: express middleware that allows express to server files that are loaded into webpack's memory
* `webpack-hot-middleware`: allows you to add hot reloading into a NodeJS server without using webpack-dev-server

### Babel Definitions
* Out of the box, babel doesn't do anything (code => code). code goes in and the same code goes out.
* A plugin is the thing that transforms the code (code => plugin => new code). Each plugin applies a different transformation
* A preset is a collection of plugins arranged in a particular order.