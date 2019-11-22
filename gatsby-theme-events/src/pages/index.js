import React from "react";
import Layout from "../components/layout";
import { graphql } from "gatsby";

// const isChild = path => (path ? path.indexOf("/") > 0 : false);

// const getParent = path => path.split("/")[0];

// const parseData = data => {
//   const map = new Map();
//   data
//     .filter(nodeElement => !isChild(nodeElement.parent.relativePath))
//     .map(nodeElement =>
//       map.set(nodeElement.parent.name, {
//         children: [],
//         displayText: nodeElement.frontmatter.title
//       })
//     );

//   data
//     .filter(nodeElement => isChild(nodeElement.parent.relativePath))
//     .map(nodeElement => {
//       const parentKey = getParent(nodeElement.parent.relativePath);
//       const par = map.get(parentKey);
//       const child = {
//         displayText: nodeElement.frontmatter.title,
//         order: 0
//       };
//       par.children.push(child);
//       map.set(parentKey, par);
//     });

//   return map;
// };
// export default ({ data }) => {
//   console.log(data);
//   const parsedData = parseData(data.allMarkdownRemark.nodes);
//   console.log(parseData(data.allMarkdownRemark.nodes));
//   return (
//     <Layout edges={data.allMarkdownRemark.nodes} parsedData={parsedData}>
//       <h1>Main body content</h1>
//     </Layout>
//   );
// };

export default ({ data }) => {
  // console.log(data);
  // const parsedData = parseData(data.allMarkdownRemark.nodes);
  // console.log(parseData(data.allMarkdownRemark.nodes));
  return (
    <Layout>
      <h1>Main body content</h1>
    </Layout>
  );
};

export const query = graphql`
  query MyQuery {
    allMarkdownRemark {
      nodes {
        parent {
          ... on File {
            id
            name
            relativePath
          }
        }
        frontmatter {
          title
        }
        id
      }
    }
  }
`;
