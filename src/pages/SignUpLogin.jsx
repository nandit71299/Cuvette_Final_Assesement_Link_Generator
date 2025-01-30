import React, { useEffect } from "react";
import styles from "./SignUpLogin.module.css";
import bgImg from "../assets/bg.png";
import {
  Form,
  Link,
  NavLink,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { loginApi, registerApi, verifyUserApi } from "../utils/apiUtil";
import { toast } from "react-toastify";

const SignUpLogin = () => {
  const [searchParams, updateSearchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const navigate = useNavigate();
  const navigation = useNavigation();
  const state = navigation.state;
  const data = useActionData();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const verify = async () => {
        const response = await verifyUserApi();
        if (response.success) {
          navigate("/dashboard");
        }
      };
      verify();
    }
  }, []);
  useEffect(() => {
    if (data && data.success) {
      if (mode === "signup") {
        navigate("/?mode=login");
      } else {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      }
    } else {
      if (typeof data?.error === "object") {
        data.error.map((err) => {
          return toast.error(`${err.path} - ${err.msg}`);
        });
      } else {
        toast.error(data?.error);
      }
    }
  }, [data]);

  useEffect(() => {
    if (!mode) {
      updateSearchParams({ mode: "signup" });
    }
  }, [mode, updateSearchParams]);

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img src={bgImg} alt="Background" className={styles.backgroundImage} />
      </div>
      <div className={styles.formSection}>
        <div className={styles.topButtons}>
          <NavLink
            to="/?mode=signup"
            className={
              mode === "signup"
                ? `${styles.topButton} ${styles.btnActive}`
                : `${styles.topButton}`
            }
          >
            SignUp
          </NavLink>
          <NavLink
            to="/?mode=login"
            className={
              mode === "login"
                ? `${styles.topButton} ${styles.btnActive}`
                : `${styles.topButton}`
            }
          >
            Login
          </NavLink>
        </div>
        <div className={styles.content}>
          <h2 className={styles.heading}>
            {mode === "login" ? "Login" : "Join us Today!"}
          </h2>
          {mode === "login" ? (
            <Form className={styles.form} method="post">
              <input
                type="text"
                placeholder="Email id"
                className={styles.input}
                name="email"
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
              />
              <button
                type="submit"
                className={styles.loginButton}
                disabled={state === "loading" || state === "submitting"}
              >
                {state === "loading" || state === "submitting"
                  ? "Submitting"
                  : "Login"}
              </button>
            </Form>
          ) : (
            <Form className={styles.form} method="post">
              <input
                type="text"
                placeholder="Name"
                className={styles.input}
                name="name"
              />
              <input
                type="email"
                placeholder="Email id"
                className={styles.input}
                name="email"
              />
              <input
                type="text"
                placeholder="Mobile no."
                className={styles.input}
                name="mobile"
              />
              <input
                type="password"
                placeholder="Password"
                className={styles.input}
                name="password"
              />
              <input
                type="password"
                placeholder="Confirm Password"
                className={styles.input}
                name="confirmPassword"
              />
              <button
                type="submit"
                className={styles.registerButton}
                disabled={state === "loading" || state === "submitting"}
              >
                {state === "loading" || state === "submitting"
                  ? "Submitting"
                  : "Register"}
              </button>
            </Form>
          )}

          <p className={styles.loginLinkContainer}>
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <Link
              to={mode === "login" ? "/" : "/?mode=login"}
              className={styles.loginLink}
            >
              {mode === "login" ? "SignUp" : "Login"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpLogin;

export const action = async ({ request }) => {
  try {
    const formData = await request.formData();

    const mode = new URL(request.url).searchParams.get("mode");

    if (mode === "signup") {
      const name = formData.get("name");
      const email = formData.get("email");
      const mobile = formData.get("mobile");
      const password = formData.get("password");
      const confirmPassword = formData.get("confirmPassword");

      const response = await registerApi({
        name,
        email,
        mobile,
        password,
        confirmPassword,
      });
      return response;
    } else if (mode === "login") {
      const email = formData.get("email");
      const password = formData.get("password");

      const response = await loginApi({
        email,
        password,
      });
      return response;
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
