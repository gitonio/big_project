module.exports = {
  build: {
    "index.html": "index.html",
    "app.js": [
      "bower_components/angular/angular.js",
      "bower_components/angular-route/angular-route.js",
       "javascripts/app.js",
       "javascripts/utils.js",
       "javascripts/controllers/store.js",
       "javascripts/controllers/admin.js",
       "javascripts/controllers/affiliate.js"
    ],
    "app.css": [
      "stylesheets/app.css"
    ],
    "images/": "images/",
    "views/": "views/",
    "directives/": "directives"
  },
  rpc: {
    host: "localhost",
    port: 8545
  }
};
