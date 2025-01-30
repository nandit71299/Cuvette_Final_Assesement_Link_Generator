import React, { useEffect, useRef, useState } from "react";
import styles from "./DashboardHeader.module.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/user";
import CreateEditLinkModal from "./CreateEditLinkModal";
import { useNavigate, useSearchParams } from "react-router-dom";

function DashboardHeader() {
  const [showLogoutOption, setShowLogoutOption] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const currentTime = new Date().getHours();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  const searchRef = useRef();

  const handleClick = () => {
    setShowLogoutOption(!showLogoutOption);
  };

  const handleCreateClick = () => {
    setIsCreateModalOpen(!isCreateModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setShowLogoutOption(false);
    window.location.href = "/";
  };

  const handleSearchFocus = () => {
    const path = window.location.pathname;
    if (path !== "/dashboard/links") {
      navigate(`/dashboard/links?search=`);
      searchRef.current.focus();
    }
    searchRef.current.focus();
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    searchRef.current.focus();
  };

  useEffect(() => {
    if (search || search === "") {
      searchRef.current.focus();
    }
  }, [search]);

  return (
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
          <button className={styles.createNewIcon} onClick={handleCreateClick}>
            + Create New
          </button>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={search || ""}
            onFocus={handleSearchFocus} // Trigger navigation when focused
            onChange={handleSearchChange} // Update search param as user types
            ref={searchRef}
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

      {isCreateModalOpen && (
        <CreateEditLinkModal
          mode="new"
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardHeader;
