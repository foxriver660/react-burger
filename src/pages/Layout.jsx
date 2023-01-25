import React from 'react'
import {Link, Outlet} from "react-router-dom";
import AppHeader from "../components/AppHeader/AppHeader"
const Layout = () => {
  return (
    <div className={`p-10`}>
      <AppHeader/>
      <Outlet/>
    </div>
  )
}

export default Layout
