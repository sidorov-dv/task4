import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const signupHandler = () => {
    navigate("/signup");
  };
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-dark bg-secondary bg-gradient mb-5 border border-secondary rounded-2">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1 fs-3">Users control panel</span>
        <form className="d-flex p-2">
          <button
            className="btn btn-primary me-3"
            type="button"
            onClick={signupHandler}
          >
            Sign Up
          </button>
          <button
            className="btn btn-danger"
            type="button"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
