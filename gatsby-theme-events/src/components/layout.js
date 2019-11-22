import React from "react";
// import themeStyles from "./another.theme.css";
import LeftNav from "../components/leftNav";
import Header from "../components/header";
import themeStyles from "./another.container.module.css";
// import themeStyles from "./theme.css";
import ClosedSvg from "./images/closed";
import OpenedSvg from "./images/opened";
import { element } from "prop-types";
import { Link } from "gatsby";

export default ({ children }) => {
  return (
    <div>
      {/* <div className={themeStyles.header}>header</div> */}
      <Header></Header>
      <div className={themeStyles.row}>
        <LeftNav></LeftNav>
        <div className={`${themeStyles.content} ${themeStyles.column}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
