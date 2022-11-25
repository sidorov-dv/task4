import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/signup");
    }, 2000);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="row mt-5">
      <div className="col">
        <h1 className="display-1 fw-bold text-danger text-center">
          404 page not found
        </h1>
      </div>
    </div>
  );
};

export default NotFound;
