import React from "react";
import { Outlet } from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader";
const Layout = React.memo(() => {
  return (
    <div className={`p-10`}>
      <AppHeader />
      <Outlet />
    </div>
  );
});

export default Layout;
