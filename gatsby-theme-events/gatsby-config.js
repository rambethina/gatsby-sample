module.exports = {
  // siteMetaData: {
  //     title: 'Gatsby Events Theme',
  //     headline: 'Upcoming events',
  //     basePath
  // },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        path: `${__dirname}/markup/`
      }
    },
    // `gatsby-plugin-mdx`,
    // {
    //     resolve: 'gatsby-plugin-mdx',
    //     extensions: ['.mdx', '.md'],
    // }
    // `gatsby-transformer-remark`,
    {
      resolve: "gatsby-transformer-remark",
      options: {
        typeName: "MarkupData"
      }
    }
    // {
    //     resolve: 'gatsby-transformer-yaml',
    //     options: {
    //         typeName: 'Event'
    //     }
    // }
  ]
};
