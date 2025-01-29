import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { redirectToLink } from "../utils/apiUtil";
import { toast } from "react-toastify";

function Redirector() {
  const params = useParams();

  useEffect(() => {
    if (params.linkId) {
      const redirect = async () => {
        const response = await redirectToLink(params.linkId);
        if (response.success) {
          toast.success("Success");
        } else {
          console.error("Error during redirection:", response.error);
        }
      };
      redirect();
    }
  });
  return <div>Redirecting...</div>;
}

export default Redirector;
