import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import UsersList from "./UsersList";
import { useNavigate } from "react-router-dom";

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [currentName, setCurrentName] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [checkedUsersBlock, setCheckedUsersBlock] = useState([]);
  const [checkedUsersUnblock, setCheckedUsersUnblock] = useState([]);
  const [checkedIdDelete, setCheckedIdDelete] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [checkboxAll, setCheckboxAll] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = "https://admin-panel-task4.herokuapp.com/";

  const getAllUsers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const url = `${BASE_URL}api/all`;
      const { data, status } = await axios.get(url, {
        headers: { authorization: localStorage.getItem("token") },
      });
      if (status !== 200) {
        throw new Error(`Something went wrong!`);
      }
      setUsers(data.users);
      setCurrentName(data.name);
      setCurrentId(data._id);
    } catch (e) {
      setError(e.message);
    }
    setIsLoading(false);
  }, []);

  const blockHandler = async () => {
    try {
      if (checkboxAll) {
        const url = `${BASE_URL}api/updateAll`;
        await axios.put(url, { users, status: false });
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        const url = `${BASE_URL}api/update`;
        const { data: res } = await axios.put(url, checkedUsersBlock);
        if (res.find((item) => item._id === currentId)) {
          localStorage.removeItem("token");
          navigate("/login");
        } else {
          await getAllUsers();
        }
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

  const unBlockHandler = async () => {
    try {
      if (checkboxAll) {
        const url = `${BASE_URL}api/updateAll`;
        await axios.put(url, { users, status: true });
        await getAllUsers();
      } else {
        const url = `${BASE_URL}api/update`;
        await axios.put(url, checkedUsersUnblock);
        await getAllUsers();
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

  const deleteHandler = async () => {
    try {
      if (checkboxAll) {
        const url = `${BASE_URL}api/deleteAll`;
        await axios.delete(url, {
          data: { users },
        });
        setCheckedUsersBlock([]);
        setCheckedUsersUnblock([]);
        setCheckedIdDelete([]);
        navigate("/signup");
      } else {
        const url = `${BASE_URL}api/delete`;
        const { data: res } = await axios.delete(url, {
          data: { deleteIds: checkedIdDelete },
        });
        setCheckedUsersBlock([]);
        setCheckedUsersUnblock([]);
        setCheckedIdDelete([]);
        if (res.find((item) => item._id === currentId)) {
          await getAllUsers();
        } else {
          navigate("/signup");
        }
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

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const checkboxAllHandler = (e) => {
    setCheckboxAll(e.target.checked);
  };

  const addPanelIdHandler = (userId) => {
    setCheckedUsersBlock((prev) => prev.concat({ ...userId, status: false }));
    setCheckedUsersUnblock((prev) => prev.concat({ ...userId, status: true }));
    setCheckedIdDelete((prev) => [...prev, userId]);
  };

  const removePanelIdHandler = (userId) => {
    setCheckedUsersBlock((prev) =>
      prev.filter((item) => item._id !== userId._id)
    );
    setCheckedUsersUnblock((prev) =>
      prev.filter((item) => item._id !== userId._id)
    );
    setCheckedIdDelete((prev) =>
      prev.filter((item) => item._id !== userId._id)
    );
  };

  let content = (
    <h1 className="text-center fw-bolder mt-5 text-warning">Users not found</h1>
  );

  if (error) {
    content = (
      <h1 className="text-center fw-bolder mt-5 text-danger">{error}</h1>
    );
  }

  return (
    <>
      <Navbar />
      <div className="btn-group" role="group" aria-label="Basic mixed styles">
        <button
          type="button"
          className="btn btn-warning"
          onClick={blockHandler}
        >
          <i className="bi bi-lock-fill pe-2"></i>Block
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={unBlockHandler}
        >
          <i className="bi bi-unlock-fill pe-2"></i>Unblock
        </button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={deleteHandler}
        >
          <i className="bi bi-person-dash-fill pe-2"></i>Delete
        </button>
      </div>
      {isLoading && (
        <div className="text-center">
          <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {users?.length > 0 ? (
        <>
          <h2 className="fs-2 my-4">
            Welcome to admin panel -
            <span className="text-primary"> {currentName}</span>
          </h2>
          <div
            className="table-responsive"
            style={{ maxHeight: 450, overflowY: "auto" }}
          >
            <table className="table table-light text-center caption-top table-hover">
              <caption>List of users</caption>
              <thead>
                <tr>
                  <th scope="col">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="selectAll"
                      value="all"
                      checked={checkboxAll}
                      onChange={checkboxAllHandler}
                    />
                  </th>
                  <th scope="col">Status</th>
                  <th scope="col">Name</th>
                  <th scope="col">E-mail</th>
                  <th scope="col">Register date</th>
                  <th scope="col">Update date</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                <UsersList
                  users={users}
                  check={checkboxAll}
                  onAddtoPanel={addPanelIdHandler}
                  onRemovePanel={removePanelIdHandler}
                />
              </tbody>
            </table>
          </div>
        </>
      ) : (
        content
      )}
    </>
  );
};

export default UsersPanel;
