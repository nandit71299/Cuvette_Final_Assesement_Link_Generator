import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import styles from "./CreateEditLinkModal.module.css";
import { createLink, updateLink } from "../utils/apiUtil";
import { toast } from "react-toastify";

function CreateEditLinkModal({ onClose, mode = "new", link }) {
  const [isActive, setIsActive] = useState(
    mode === "edit" ? link?.expirationDate : false
  );
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      originalUrl: formData.get("originalUrl"),
      remarks: formData.get("remarks"),
      expirationDate: formData.get("expirationDate") || null,
    };
    if (mode === "edit") {
      const response = await updateLink(data, link._id);
      if (response.success) {
        toast.success("Link updated successfully");
        navigate("/dashboard/links");
      }
    } else if (mode === "new") {
      const response = await createLink(data);
      if (response.success) {
        toast.success("Link created successfully");
        navigate("/dashboard/links");
      } else {
        toast.error("Failed to create link");
      }
      // onClose();
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{mode === "edit" ? "Edit Link" : "New Link"}</h2>
          <button onClick={onClose} className={`${styles.closeButton}`}>
            <i className={`fa-solid fa-xmark ${styles.closeButton}`}></i>
          </button>
        </div>
        <div className={styles.formContainer}>
          <Form onSubmit={handleSubmit} className={styles.modalForm}>
            <div className={styles.formElements}>
              <div className={styles.formElement}>
                <label htmlFor="originalUrl" className={styles.linkFormLabel}>
                  Destination Url: <span className={styles.required}>*</span>
                </label>
                <br />
                <input
                  type="url"
                  id="originalUrl"
                  name="originalUrl"
                  required
                  placeholder="https://web.whatsapp.com/"
                  className={styles.linkFormInputs}
                  defaultValue={link?.originalUrl}
                />
              </div>

              <div className={styles.formElement}>
                <label htmlFor="remarks" className={styles.linkFormLabel}>
                  Remarks: <span className={styles.required}>*</span>
                </label>
                <br />
                <textarea
                  id="remarks"
                  name="remarks"
                  required
                  placeholder="Enter remarks"
                  className={`${styles.linkFormInputs} ${styles.linkRemarks}`}
                  defaultValue={link?.remarks}
                />
              </div>

              <div className={styles.toggleContainer}>
                <p>Link Expiration</p>
                <div
                  className={`${styles.toggleButton} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={handleToggle}
                >
                  <div className={styles.toggleIndicator}></div>
                </div>
              </div>

              {isActive && (
                <input
                  type="date"
                  id="expirationDate"
                  name="expirationDate"
                  className={styles.linkFormInputs}
                  defaultValue={link?.expirationDate}
                />
              )}
            </div>
            <div className={styles.modalFooter}>
              <div>
                <button type="reset" className={styles.clearBtn}>
                  Clear
                </button>
              </div>
              <div>
                <button type="submit" className={styles.submitBtn}>
                  {mode === "edit" ? "Save" : "Create New"}
                </button>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CreateEditLinkModal;
