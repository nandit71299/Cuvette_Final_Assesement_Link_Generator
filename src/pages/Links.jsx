import React, { useEffect, useState } from "react";
import styles from "./Links.module.css";
import { deleteLink, getAllLinks } from "../utils/apiUtil";
import { useLoaderData, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import moment from "moment";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import CreateEditLinkModal from "../components/CreateEditLinkModal";

function Links() {
  const loaderData = useLoaderData();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]); // state for filtered data
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState(null);
  const [isEditLinkOpen, setIsEditLinkOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    if (loaderData && loaderData.data) {
      setData(loaderData.data); // update data when loaderData changes
    }
  }, [loaderData]);

  // Effect to filter data based on search term
  useEffect(() => {
    if (search) {
      const filtered = data?.filter((link) =>
        link.remarks.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data); // If no search term, show all data
    }
  }, [search, data]);

  // If data is not loaded yet, show loader
  if (!data) {
    return <Loader />;
  }

  const handleDeleteLink = async () => {
    const response = await deleteLink(selectedLink._id);
    if (response.success) {
      setIsDeleteModalOpen(false);
      const newData = data.filter((link) => link._id !== selectedLink._id);
      setData(newData);
      setFilteredData(newData); // Update filtered data after deletion
      toast.success("Link deleted successfully");
    } else {
      console.error("Error during link deletion:", response.error);
      toast.error("Error Deleting Link");
    }
  };

  return (
    <div className={styles.linksContainer}>
      <div className={styles.linksTableWrapper}>
        <table className={styles.linksTable}>
          <thead>
            <tr>
              <th className={styles.tableHeader}>Date</th>
              <th className={styles.tableHeader}>Original Link</th>
              <th className={styles.tableHeader}>Short Link</th>
              <th className={styles.tableHeader}>Remarks</th>
              <th className={styles.tableHeader}>Clicks</th>
              <th className={styles.tableHeader}>Status</th>
              <th className={styles.tableHeader}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.length < 1 ? (
              <tr
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80dvw",
                  height: "50%",
                  color: "gray",
                }}
              >
                <td>
                  <h2 style={{ textAlign: "center", alignSelf: "center" }}>
                    No Enough Data
                  </h2>
                </td>
              </tr>
            ) : (
              filteredData?.map((link) => {
                return (
                  <tr key={link._id || link.shortLink || link.originalLink}>
                    <td className={styles.tableCell}>
                      {moment(link.createdAt).format("MMM Do YYYY HH:mm")}
                    </td>
                    <td className={styles.tableCell}>{link.originalUrl}</td>
                    <td className={styles.tableCell}>
                      <div>
                        <a
                          href={`${window.location.origin}
                    ${link.linkHash}`}
                        ></a>
                        {window.location.origin}/{link.linkHash}
                        <span
                          className={styles.copyLinkText}
                          onClick={() => {
                            navigator.clipboard.writeText(
                              `${window.location.origin}/${link.linkHash}`
                            );
                            toast.success("Link copied successfully");
                          }}
                        >
                          {" "}
                          &nbsp;
                          <i className="fa-regular fa-clipboard"></i>
                        </span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>{link.remarks}</td>
                    <td className={styles.tableCell}>{link.clickCount}</td>
                    <td
                      className={styles.tableCell}
                      style={{ color: link.isActive ? "#1EB036" : "#B0901E" }}
                    >
                      {link.isActive ? "Active" : "Inactive"}
                    </td>
                    <td className={styles.tableCell}>
                      <button
                        className={styles.actionButton}
                        onClick={() => {
                          setSelectedLink(link);
                          setIsEditLinkOpen(true);
                        }}
                      >
                        <i className="fa-solid fa-pencil"></i>
                      </button>
                      <button
                        onClick={() => {
                          setSelectedLink(link);
                          setIsDeleteModalOpen(true);
                        }}
                        className={styles.actionButton}
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => {
            setIsDeleteModalOpen(false);
          }}
          selectedLink={selectedLink}
          onConfirm={handleDeleteLink}
        />
      )}
      {isEditLinkOpen && (
        <CreateEditLinkModal
          onClose={() => {
            setIsEditLinkOpen(false);
          }}
          mode="edit"
          link={selectedLink}
        />
      )}
    </div>
  );
}

export default Links;

export const loader = async () => {
  try {
    const response = await getAllLinks();
    return response;
  } catch (error) {
    console.error("Error during links data fetching:", error);
    return {
      success: false,
      error: error.response.data.message || "An unknown error occurred",
    };
  }
};
