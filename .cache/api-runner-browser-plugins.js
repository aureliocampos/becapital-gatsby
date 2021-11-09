module.exports = [{
      plugin: require('../node_modules/gatsby-plugin-catch-links/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-image/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-source-wordpress/gatsby-browser.js'),
      options: {"plugins":[],"url":"http://20.201.13.131/graphql","verbose":true},
    },{
      plugin: require('../node_modules/gatsby-plugin-manifest/gatsby-browser.js'),
      options: {"plugins":[],"name":"BeCapital","short_name":"BeCapital","start_url":"/","background_color":"#1A4A73","theme_color":"#FF6746","display":"standalone","icon":"./src/images/favicon.png","legacy":true,"theme_color_in_head":true,"cache_busting_mode":"query","crossOrigin":"anonymous","include_favicon":true,"cacheDigest":"320e85f03b4650d36c4a6f775ce9daf6"},
    },{
      plugin: require('../node_modules/gatsby-plugin-offline/gatsby-browser.js'),
      options: {"plugins":[]},
    },{
      plugin: require('../node_modules/gatsby-plugin-google-tagmanager/gatsby-browser.js'),
      options: {"plugins":[],"id":"GTM-5X24M96","includeInDevelopment":false,"defaultDataLayer":null,"routeChangeEventName":"gatsby-route-change","enableWebVitalsTracking":false,"selfHostedOrigin":"https://www.googletagmanager.com"},
    },{
      plugin: require('../gatsby-browser.js'),
      options: {"plugins":[]},
    }]
