import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import { getDashboard } from "../utils/apiUtil";
import { useLoaderData, useNavigation } from "react-router-dom";
import Loader from "../components/Loader";

function Dashboard() {
  const data = useLoaderData();

  if (!data) {
    return <Loader />;
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.clickCountsContainer}>
        <h2 style={{ fontSize: "20px" }}>Total Clicks</h2>
        <p
          style={{
            color: "var(--text-blue)",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          {data?.totalClicks}
        </p>
      </div>
      <div className={styles.analyticsTableContainer}>
        <div className={styles.dateWiseClicksTable}>
          <h2>Date Wise Clicks</h2>
          {data?.dateWiseClicks.map((item, index) => (
            <div key={index} className={styles.tableContent}>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {item.date}
              </p>
              <progress
                value={item.clicks}
                className={styles.progressBar}
                max={data?.maxDateWiseClicks}
              ></progress>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {item.clicks}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.deviceWiseClicksTable}>
          <h2>Device Wise Clicks</h2>
          {data?.deviceWiseClicks.map((item, index) => (
            <div key={index} className={styles.tableContent}>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {item.device}
              </p>
              <progress
                value={item.clicks}
                className={styles.progressBar}
                max={data?.maxDeviceWiseClicks}
              ></progress>
              <p style={{ fontWeight: "bold", fontSize: "16px" }}>
                {item.clicks}
              </p>
            </div>
          ))}
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

export const loader = async ({ request, params }) => {
  try {
    const response = await getDashboard();

    return response;
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to get dashboard" };
  }
};
