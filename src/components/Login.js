import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const url_login = "https://admin-panel-task4.herokuapp.com/api/auth";
      const { data: res } = await axios.post(url_login, data);
      if (res.token) {
        localStorage.setItem("token", res.token);
        navigate("/adminpanel");
      }
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
          <h1 className="text-center">Login to your account</h1>
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
          <button type="submit" className="btn btn-lg btn-success me-3">
            Sign In
          </button>
          <span className="me-2 align-middle fs-4">
            No account yet? Then -&gt;
          </span>
          <Link to="/signup" className="fs-2 align-middle link-primary">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
