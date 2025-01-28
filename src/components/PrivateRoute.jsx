import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyUserApi } from "../utils/apiUtil";
import { login, logout } from "../redux/user";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      <Navigate to="/authentication" />;
    }
    const verifyToken = async () => {
      const response = await verifyUserApi();
      if (!response.success) {
        localStorage.removeItem("token");
        dispatch(logout());
        navigate("/?mode=login");
      } else {
        dispatch(login(response.user));
        setLoading(false);
      }
    };
    verifyToken();
  });

  if (loading) return <p>loading...</p>;
  else if (!loading) return children;
};

export default PrivateRoute;
