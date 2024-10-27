import { Fragment } from "react";
import MainHeader from "./MainHeader";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader onOpenCart={props.onOpenCart} />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
