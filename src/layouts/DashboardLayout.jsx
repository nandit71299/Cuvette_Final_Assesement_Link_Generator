import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./DashboardLayout.module.css";
import analytic from "../assets/icons/analytic.png";
import inbox from "../assets/icons/inbox.png";
import cuvetteLogo from "../assets/icons/cuvetteLogo.png";
import link from "../assets/icons/link.png";
import setting from "../assets/icons/setting.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user";

function DashboardLayout() {
  const currentTime = new Date().getHours();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const handleClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setShowLogoutOption(false);
    window.location.href = "/";
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <img src={cuvetteLogo} alt="CuvetteLogo" />
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

          <hr width="100%" />

          {/* Settings section */}
          <NavLink
            to="/dashboard/settings"
            className={({ isActive }) =>
              isActive ? styles.activeMenuItem : styles.menuItem
            }
          >
            <img src={setting} alt="Settings" />
            <span>Settings</span>
          </NavLink>
          <hr width="100%" />
        </div>
      </div>

      <div className={styles.flexColumnContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.welcomeMessageContainer}>
            <div className={styles.welcomeMessage}>
              <p className={styles.greeting}>
                {currentTime >= 6 && currentTime < 12
                  ? `🌥️ Good Morning ${user?.name}`
                  : currentTime >= 12 && currentTime < 18
                  ? `☀️ Good Afternoon ${user?.name}`
                  : currentTime >= 18 && currentTime < 24
                  ? `🌙 Good Evening ${user?.name}`
                  : `🌙 Good Night ${user?.name}`}
              </p>
              <p className={styles.date}>{new Date().toDateString()}</p>
            </div>
          </div>
          <div className={styles.headerRightContent}>
            <div>
              <button className={styles.createNewIcon}>+ Create New</button>
            </div>
            <div>
              <input
                type="text"
                placeholder="Search"
                className={styles.searchInput}
              />
            </div>
            <div className={styles.userInitialContainer}>
              <button onClick={handleClick}>{user?.name[0]}</button>
            </div>
          </div>

          {showLogoutOption && (
            <div className={styles.logoutOptionContainer}>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
