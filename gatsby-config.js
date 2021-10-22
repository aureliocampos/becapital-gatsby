const path = require(`path`)

siteMetadata = {
  title: "BeCapital",
  description: "Uma nova maneira de pensar e agir no mercado de capitais. Acreditamos que investir é para todos.",
  siteUrl: "https://www.be.capital/", 
  siteLanguage: "pt-BR",
  siteLocale: "pt_br",
  authorName: "Aurélio Campos - Team BeCapital",
  twitterUsername: "@BeResearch_",
  favicon: "./src/images/favicon.png",
  backgroundColor: `#1A4A73`,
  themeColor: `#FF6746` 
}

module.exports = {
  siteMetadata: siteMetadata,
  plugins: [
    {
      resolve: 'gatsby-plugin-html-attributes',
      options: {
        lang: 'pt-BR'
      }
    },
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `http://20.201.13.131/graphql`,
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
      __key: "images",
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `BeCapital`,
        short_name: `BeCapital`,
        start_url: `/`,
        background_color:siteMetadata.backgroundColor,
        theme_color: siteMetadata.themeColor,
        display: `standalone`,
        icon: siteMetadata.favicon
      },
    },
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-offline`,
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-5X24M96',
      },
    },
  ],
}
