import React from "react";
import styles from "./Analytics.module.css";
import { useLoaderData } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";
import { getAnalytics } from "../utils/apiUtil";

const Analytics = () => {
  const { analytics, success } = useLoaderData();

  if (!success) {
    return <div>Failed to load analytics data</div>;
  }
  if (!analytics) {
    return <Loader />;
  }

  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksTableWrapper}>
        <table className={styles.linksTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Timestamp</th>
              <th className={styles.tableHeader}>Original Link</th>
              <th className={styles.tableHeader}>Short Link</th>
              <th className={styles.tableHeader}>IP Address</th>
              <th className={styles.tableHeader}>User Device</th>
            </tr>
          </thead>
          <tbody>
            {analytics.map((link) => (
              <tr key={link._id}>
                <td className={styles.tableCell}>
                  {moment(link.timestamp).format("MMM Do YYYY HH:mm")}
                </td>
                <td className={styles.tableCell}>{link.linkId.originalUrl}</td>
                <td className={styles.tableCell}>
                  <div>
                    <a
                      href={`${window.location.origin}/${link.linkId.linkHash}`}
                    >
                      {window.location.origin}/{link.linkId.linkHash}
                    </a>
                  </div>
                </td>
                <td className={styles.tableCell}>{link.ipAddress}</td>
                <td className={styles.tableCell}>{link.deviceInfo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;

export const loader = async () => {
  try {
    const response = await getAnalytics();
    if (response.success) {
      return { success: true, analytics: response.analytics };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return { success: false };
  }
};
