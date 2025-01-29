import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { redirectToLink } from "../utils/apiUtil";

function Redirector() {
  const params = useParams();
  const [message, setMessage] = useState("Redirecting...");

  useEffect(() => {
    if (params.linkId) {
      const redirect = async () => {
        const response = await redirectToLink(params.linkId);
        console.log(response);
        if (response.success) {
          // Redirect to the original URL
          window.location.href = response.link;
          toast.success("Redirecting...");
        } else {
          setMessage(response.error || "An error occurred.");
          toast.error(response.error || "An error occurred.");
        }
      };
      redirect();
    }
  }, [params.linkId]); // Run this effect when linkId changes

  return <div>{message}</div>;
}

export default Redirector;
