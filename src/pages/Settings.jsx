import React, { useEffect } from "react";
import styles from "./Settings.module.css";
import { useSelector } from "react-redux";
import { Form, useActionData, useNavigate } from "react-router-dom";
import { deleteUser, updateUser } from "../utils/apiUtil";
import { toast } from "react-toastify";

function Settings() {
  const user = useSelector((state) => state.user.user);
  const data = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.success) {
      if (data.user) {
        toast.success("User Details Updated Successfully!");
      } else {
        navigate("/");
        toast.success("Account Deleted successfully!");
      }
    } else {
      if (typeof data?.error === "string") {
        toast.error(data.error);
      } else if (typeof data?.error === "object") {
        data.error.map((err) => {
          return toast.error(`${err.path} - ${err.msg}`);
        });
      }
    }
  }, [data]);

  return (
    <div className={styles.mainContainer}>
      <Form method="POST" className={styles.userInfoForm}>
        <div className={styles.formItems}>
          <span className={styles.formItemsTitle}>Name</span>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={user.name}
            className={styles.formInputs}
          />
        </div>
        <div className={styles.formItems}>
          <span className={styles.formItemsTitle}>Email</span>
          <input
            type="text"
            name="email"
            id="email"
            defaultValue={user.email}
            className={styles.formInputs}
          />
        </div>
        <div className={styles.formItems}>
          <span className={styles.formItemsTitle}> Mobile</span>
          <input
            type="text"
            name="mobile"
            id="mobile"
            defaultValue={user.mobile}
            className={styles.formInputs}
          />
        </div>
        <button
          type="submit"
          name="action"
          value="save"
          className={styles.saveBtn}
        >
          Save Changes
        </button>
        <button
          type="submit"
          name="action"
          value="delete"
          className={styles.delBtn}
        >
          Delete Account
        </button>
      </Form>
    </div>
  );
}

export default Settings;

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  let data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });

  const action = data.action;
  if (action === "save") {
    const response = await updateUser(data);
    return response;
  } else if (action === "delete") {
    const response = await deleteUser();
    return response;
  }
};
