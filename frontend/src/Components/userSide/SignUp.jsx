import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { isSignUp } from "../../Redux/isAuthReducer";

export const SignUp = () => {
  const isAuth = useSelector((state) => {
    return state.isAuth;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    err = validation(userData);
    let errLength = Object.keys(err).length;
    console.log(errLength, "err length");

    if (Object.keys(err).length === 0) {
      console.log(userData, "user data is");
      axios
        .post("/usersignup", userData)
        .then((response) => {
          if (response.data.status === false) {
            let err = {};
            err.user = "email is already exisisted";
            setErrors(err);
          } else {
            console.log(response.data.accessToken, "responseeeee");
            localStorage.setItem("userjwt", response.data.accessToken);
            dispatch(isSignUp());
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err, "error");
        });
    } else {
      setErrors(err);
      console.log(errors, "errorrsss");
    }
  };

  //---------------------------------------------validation-------------------------------------------
  const validation = (data) => {
    let err = {};
    console.log(data, "dataaaa");
    const name = data?.name;
    console.log(name);
    const email = data?.email;
    const phone = data?.phone;
    const password = data?.password;

    const isFullname = name.includes(" ");
    const nameFormat = /^[a-zA-Z\s]+$/.test(name);
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phonenumberFormat = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phone);
    if (!data) {
      err.name = "enter the your name";
    } else if (!name || !isFullname) {
      err.name = "enter your full name";
    } else if (name.length < 2 || name.length > 40 || !nameFormat) {
      err.name = "check your name";
    } else if (!email || !emailFormat) {
      err.email = "check your email";
    } else if (phonenumberFormat === false) {
      err.phone = "enter the correct number";
    } else if (!password) {
      err.password = "enter the password";
    }
    return err;
  };
  //-------------------------------validation ends-----------------------------------

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  const viewPassword = () => {
    let password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  return (
    <div>
      <div>
        <section className="bg-gray-50  min-h-screen flex items-center justify-center ">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 m-4  ">
            <div className="md:w-1/2 px-16">
              <h2 className="font-bold text-2xl text-[#464B87] ">SignUp</h2>
              <p className="text-sm m-3 text-[#464B87]">
                for connect with our family
              </p>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                {errors?.user && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.user}
                  </p>
                )}
                <input
                  className="mt-1 p-2 rounded-xl border  focus:outline-none"
                  type="text"
                  value={userData.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="enter your full name"
                  required
                />
                {errors?.name && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.name}
                  </p>
                )}
                <input
                  className="mt-1 p-2 rounded-xl border  focus:outline-none"
                  type="text"
                  value={userData.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="enter your email"
                />
                {errors?.email && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.email}
                  </p>
                )}
                <input
                  className="mt-1 p-2 rounded-xl border  focus:outline-none"
                  type="text"
                  value={userData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="enter phone number"
                />
                {errors?.phone && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.phone}
                  </p>
                )}
                <div className="relative">
                  <input
                    id="password"
                    className="w-full p-2 rounded-xl border  focus:outline-none "
                    type="password"
                    name="password"
                    value={userData.password}
                    onChange={handleChange}
                    placeholder="enter the password "
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-eye absolute right-5 top-4 opacity-50 cursor-pointer"
                    viewBox="0 0 16 16"
                    onClick={viewPassword}
                  >
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                </div>
                {errors?.password && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.password}
                  </p>
                )}
                <button
                  type="submit"
                  className="bg-[#464B87] text-white py-2 rounded-xl mb-3 shadow-lg hover:scale-105 duration-300"
                >
                  SignUp
                </button>
              </form>

              <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                <hr className="border-gray-400" />
                <p className="text-center text-sm">OR</p>
                <hr className="border-gray-400" />
              </div>
              <button className="bg-white border py-2 w-full mt-5 rounded-xl text-sm flex justify-center items-center hover:scale-105 duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-google m-3  "
                  viewBox="0 0 16 16"
                >
                  <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                </svg>{" "}
                SignUp with Google
              </button>

              <div className="mt-3 text-xs flex justify-between items-center text-[#464B87]">
                <p>If you already have an account....</p>
                <button
                  className="py-2 border px-5 bg-white rounded-xl text-black  hover:scale-110 duration-300"
                  onClick={navigateToLogin}
                >
                  Login
                </button>
              </div>
            </div>

            <div className="md:block hidden w-1/2 ">
              <img
                className=" rounded-2xl "
                src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration_335657-3875.jpg?size=626&ext=jpg"
                alt="carimage"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
