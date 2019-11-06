const dotenv = require('dotenv')

if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

module.exports = {
  siteMetadata: {
      title: '',
      author: 'Sean Higgins',
      description: 'personal website'
  },
  pathPrefix: '/Website',
  plugins: [
    'gatsby-plugin-sharp', 
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
        ignore: [`**/\.*`], // ignore files starting with a dot
      },
    },
  ],
}
