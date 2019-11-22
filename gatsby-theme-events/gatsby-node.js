// make sure the data directory exists

// exports
// define event type

// define resolvers for any custom fields

// query for events and create pages

// exports.sourceNodes = ({ actions }) => {
//   actions.createTypes(`
//         type LeftNav implements Node @dontInfer
//     `);
// };

// exports.onCreateNode = ({ node, getNode, actions }) => {
//   // console.log(node);
//   const { createNodeField } = actions;
//   const pathMap = new Map();
//   pathMap.set(node.absolutePath, node.relativePath);
//   console.log(__dirname);
//   //   console.log("Absolute path", node.absolutePath);
//   //   console.log("Relative path", node.relativePath);
//   //   console.log("node.internal.type", node.internal.type);
//   if (node.internal.type === "MarkdownRemark") {
//     console.log(JSON.stringify(node.parent));
//     console.log("node internal fileabsolute path", node.fileAbsolutePath);
//     console.log("Result", node.fileAbsolutePath.indexOf(__dirname));

//     // console.log(JSON.stringify(pathMap));
//     // console.log("relativePath", node.relativePath);
//     createNodeField({
//       name: `my-relative-path`,
//       node,
//       value: node.fileAbsolutePath.substr(
//         0,
//         node.fileAbsolutePath.indexOf(__dirname)
//       )
//       //   value: "testpath"
//     });
//   }
// };
// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions;

//     // console.log('Type', node.internal.type);
//     // if (node.internal.type === `Mdx`) {
//     if (node.internal.mediaType === 'text/markdown') {
//       console.log('id', node.id);
//       const parent = getNode(node.parent);
//       console.log(JSON.stringify(node))
//     //   let value = parent.relativePath.replace(parent.ext, "");
//     let value = '';

//       if (value === "index") {
//         value = "";
//       }
//       createNodeField({
//         name: `slug`,
//         node,
//         value: `/${value}`
//       });

//       createNodeField({
//         name: "id",
//         node,
//         value: node.id
//       });

//       createNodeField({
//         name: "title",
//         node,
//         value: node.frontmatter.title || startCase(parent.name)
//       });
//     }
//   };

const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve("src/templates/posts.js");

    resolve(
      graphql(
        `
          query {
            allMarkdownRemark {
              edges {
                node {
                  frontmatter {
                    path
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const path = node.frontmatter.title;
          console.log(path);
          createPage({
            path,
            component: blogPostTemplate,
            context: {
              pathSlug: path
            }
          });

          resolve();
        });
      })
    );
  });
};
