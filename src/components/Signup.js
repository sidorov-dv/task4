import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.clear();
    }
  });
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url = "https://admin-panel-task4.herokuapp.com/api/users";
      const { data: res } = await axios.post(url, data);
      console.log(res.message);
      setData({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      if (
        err.response &&
        err.response.status >= 400 &&
        err.response.status <= 500
      ) {
        setError(err.response.data.message);
      }
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="justify-content-center row mt-5">
        <div className="col-md-10 col-lg-8">
          <h1 className="text-center">Create Account</h1>
          <div className="mb-3">
            <label htmlFor="name" className="form-label fs-4">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={data.name}
              name="name"
              onChange={handleChange}
              aria-describedby="nameHelp"
              minLength={3}
              required
            />
            <div id="nameHelp" className="form-text">
              Name requires 3 or more characters
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fs-4">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              onChange={handleChange}
              value={data.email}
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label fs-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              minLength={1}
            />
            <div id="password" className="form-text">
              Password requires 1 or more characters
            </div>
          </div>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <button type="submit" className="btn btn-lg btn-primary me-3">
            Sign Up
          </button>
          <span className="me-2 align-middle fs-4">
            Already have an account? Then -&gt;
          </span>
          <Link to="/login" className="fs-2 align-middle link-success">
            Sign In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
