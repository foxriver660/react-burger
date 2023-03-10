import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "../../components/index";

const Layout: FC = React.memo(() => {
  return (
    <div className={`p-10`}>
      <AppHeader />
      <Outlet />
    </div>
  );
});

export default Layout;
