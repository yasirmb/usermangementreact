import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminUserTable from "./AdminUserTable";
import axios from "../../axios/axios";

const AdminHome = () => {
  const [adminjwt, setAdminJwt] = useState();
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  console.log(users, "usersss are");

  const fetch = () => {
    axios.get("/admin/userslist").then((res) => {
      console.log(res.data, "responseeeee");
      setUsers(res.data);
    });
  };

  useEffect(() => {
    const details = async () => {
      let token = localStorage.getItem("adminjwt");
      if (token) {
        setAdminJwt(token);

        fetch();
      } else {
        navigate("/admin");
      }
    };
    details();
  }, []);
  console.log(adminjwt, "adminjwt");

  const logout = () => {
    localStorage.removeItem("adminjwt");
    navigate("/admin");
  };
  return (
    <div>
      <nav className="flex px-4 border-b md:shadow-lg items-center relative">
        <div className="text-lg font-bold md:py-0 py-4">Admin</div>
        <ul className="md:px-2 ml-auto md:flex md:space-x-2 absolute md:relative top-full left-0 right-0">
          <li>
            <a
              href="#"
              className="flex md:inline-flex p-4 items-center hover:bg-gray-50"
            >
              <span>Home</span>
            </a>
          </li>

          <li>
            <a
              className="flex md:inline-flex p-4 items-center hover:bg-gray-50 cursor-pointer"
              onClick={logout}
            >
              <span>LogOut</span>
            </a>
          </li>
        </ul>
        <div className="ml-auto md:hidden text-gray-500 cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </nav>

      <AdminUserTable users={users} fetch={fetch} />
    </div>
  );
};

export default AdminHome;
