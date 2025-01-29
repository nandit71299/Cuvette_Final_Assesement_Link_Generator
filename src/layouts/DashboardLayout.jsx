import React, { useState } from "react";
import { Outlet, useNavigation } from "react-router-dom";
import styles from "./DashboardLayout.module.css";
import cuvetteLogo from "../assets/icons/cuvetteLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user";
import Loader from "../components/Loader";
import DashboardSideMenu from "../components/DashboardSideMenu";
import DashboardHeader from "../components/DashboardHeader";

function DashboardLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteLogo} alt="CuvetteLogo" />
        <DashboardSideMenu />
      </div>

      <div className={styles.flexColumnContainer}>
        <DashboardHeader />
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
