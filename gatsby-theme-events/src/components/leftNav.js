import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import themeStyles from "./another.container.module.css";
import { Link } from "gatsby";

const isChild = path => (path ? path.indexOf("/") > 0 : false);

const getParent = path => path.split("/")[0];

const parseData = data => {
  const map = new Map();
  data
    .filter(nodeElement => !isChild(nodeElement.parent.relativePath))
    .map(nodeElement =>
      map.set(nodeElement.parent.name, {
        children: [],
        displayText: nodeElement.frontmatter.title
      })
    );

  data
    .filter(nodeElement => isChild(nodeElement.parent.relativePath))
    .map(nodeElement => {
      const parentKey = getParent(nodeElement.parent.relativePath);
      const par = map.get(parentKey);
      const child = {
        displayText: nodeElement.frontmatter.title,
        order: 0
      };
      par.children.push(child);
      map.set(parentKey, par);
    });

  return map;
};

export default () => {
  const data = useStaticQuery(graphql`
    query LeftNavQuery {
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
  `);
  const parsedData = parseData(data.allMarkdownRemark.nodes);
  console.log(parsedData);
  const mapKeys = Array.from(parsedData.keys());
  return (
    <div className={`${themeStyles.sidebar} ${themeStyles.column}`}>
      {/* <div className={themeStyles.sidebar_header}>
        <h1>Sidebar Nav</h1>
      </div> */}
      <ul className={themeStyles.sidebar_nav}>
        {mapKeys.map(key => (
          <li key={key} className={themeStyles.has_ul}>
            <Link to={key}>{key}</Link>
            <ul className={themeStyles.sub_ul}>
              {parsedData.get(key).children.map(child => (
                <li key={child.displayText}>
                  <a href="#">{child.displayText}</a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};
