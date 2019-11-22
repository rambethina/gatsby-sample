import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/layout";

const Template = props => {
  console.log(props);
  console.log(props.data.markdownRemark.html);
  const html = props.data.markdownRemark.html;
  return (
    <Layout>
      <div key="keysomething" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

export const query = graphql`
  query($pathSlug: String) {
    markdownRemark(frontmatter: { path: { eq: $pathSlug } }) {
      frontmatter {
        title
      }
      html
    }
  }
`;
export default Template;

// export default () => <h1>hello</h1>;
