import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./DashboardSideMenu.module.css";
import analytic from "../assets/icons/analytic.png";
import inbox from "../assets/icons/inbox.png";
import link from "../assets/icons/link.png";
import setting from "../assets/icons/setting.png";

function DashboardSideMenu() {
  return (
    <div className={styles.sidebarMenu}>
      {/* Dashboard link */}
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          isActive ? styles.activeMenuItem : styles.menuItem
        }
      >
        <img src={inbox} alt="Dashboard" />
        <span>Dashboard</span>
      </NavLink>

      {/* Links section */}
      <NavLink
        to="/dashboard/links"
        className={({ isActive }) =>
          isActive ? styles.activeMenuItem : styles.menuItem
        }
      >
        <img src={link} alt="Links" />
        <span>Links</span>
      </NavLink>

      {/* Analytics section */}
      <NavLink
        to="/dashboard/analytics"
        className={({ isActive }) =>
          isActive ? styles.activeMenuItem : styles.menuItem
        }
      >
        <img src={analytic} alt="Analytics" />
        <span>Analytics</span>
      </NavLink>

      {/* <hr width="100%" /> */}

      {/* Settings section */}
      {/* <NavLink
        to="/dashboard/settings"
        className={({ isActive }) =>
          isActive ? styles.activeMenuItem : styles.menuItem
        }
      >
        <img src={setting} alt="Settings" />
        <span>Settings</span>
      </NavLink> */}
      {/* <hr width="100%" /> */}
    </div>
  );
}

export default DashboardSideMenu;
