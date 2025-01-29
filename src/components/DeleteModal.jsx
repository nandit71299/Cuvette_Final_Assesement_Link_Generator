import React from "react";
import styles from "./DeleteModal.module.css";
import { deleteLink } from "../utils/apiUtil";
import { toast } from "react-toastify";

function DeleteModal({ onClose, onConfirm }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.cross} onClick={onClose}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <h2 className={styles.modalTitle}>
          Are you sure you want to delete this link?
        </h2>
        <div className={styles.modalActions}>
          <button className={styles.cancelButton} onClick={onClose}>
            No
          </button>
          <button className={styles.confirmButton} onClick={onConfirm}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
