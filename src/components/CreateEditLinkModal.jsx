import React, { useState, useRef } from "react";
import { Form, useNavigate } from "react-router-dom";
import styles from "./CreateEditLinkModal.module.css";
import { createLink, updateLink } from "../utils/apiUtil";
import { toast } from "react-toastify";
import moment from "moment";

function CreateEditLinkModal({ onClose, mode = "new", link }) {
  const [isActive, setIsActive] = useState(
    mode === "edit" ? link?.linkExpiration : false
  );
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const formRef = useRef(null);

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
      setSubmitting(true);
      const response = await updateLink(data, link._id);
      if (response.success) {
        setSubmitting(false);
        toast.success("Link updated successfully");
        navigate("/dashboard/links");
      } else {
        setSubmitting(false);
        if (typeof response.error === "string") {
          toast.error(response.error);
        } else if (typeof response.error === "object") {
          response.error.map((err) => {
            return toast.error(`${err.msg}`);
          });
        }
      }
    } else if (mode === "new") {
      setSubmitting(true);
      const response = await createLink(data);
      if (response.success) {
        setSubmitting(false);
        toast.success("Link created successfully");
        navigate("/dashboard/links");
      } else {
        setSubmitting(false);
        if (typeof response.error === "string") {
          toast.error(response.error);
        } else if (typeof response.error === "object") {
          response.error.map((err) => {
            return toast.error(`${err.msg}`);
          });
        }
      }
    }
  };

  // Handle form reset
  const handleClear = () => {
    // Reset specific form fields manually
    const formElements = formRef.current.elements;

    // Manually reset input fields and textarea
    for (let element of formElements) {
      if (
        element.type === "text" ||
        element.type === "url" ||
        element.type === "textarea"
      ) {
        element.value = "";
      }
      if (element.type === "date") {
        element.value = "";
      }
    }

    // Reset expiration toggle and state
    setIsActive(false); // Reset the expiration toggle state

    // Optionally, if you want to reset other fields, handle that as well
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
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            className={styles.modalForm}
          >
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
                  min={moment().format("YYYY-MM-DD")}
                  id="expirationDate"
                  name="expirationDate"
                  className={styles.linkFormInputs}
                  defaultValue={
                    link ? moment(link.linkExpiration).format("YYYY-MM-DD") : ""
                  }
                />
              )}
            </div>
            <div className={styles.modalFooter}>
              <div>
                <button
                  type="button"
                  className={styles.clearBtn}
                  onClick={handleClear} // Call handleClear on clear button click
                >
                  Clear
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className={styles.submitBtn}
                  disabled={submitting}
                >
                  {submitting
                    ? "Submitting"
                    : mode === "edit"
                    ? "Save"
                    : "Create New"}
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
