import { Fragment } from "react";
import Header from "./Layout/HeaderLayout";

const MainContent = (props) => {
  return (
    <Fragment>
      <Header />
      {props.children}
    </Fragment>
  );
};

export default MainContent;
