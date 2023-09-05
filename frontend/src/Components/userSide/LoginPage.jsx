import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axios/axios";
import { isSignUp } from "../../Redux/isAuthReducer";
import { useDispatch, useSelector } from "react-redux";

export const LoginPage = () => {
  const [loginInfo, setLoginInfo] = useState({});
  const [errors, setErrors] = useState();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => {
    return state.isAuth;
  });
  console.log(isAuth, "isAuth");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    let err = {};
    err = validation(loginInfo);
    if (Object.keys(err).length === 0) {
      console.log("valid login info move to authentication");
      axios
        .post("/userlogin", loginInfo)
        .then((response) => {
          console.log(response);
          if (response.data.status === false) {
            err.user = response.data.message;
            setErrors(err);
          } else {
            console.log(response.data.accessToken, "responseeeee");
            localStorage.setItem("userjwt", response.data.accessToken);
            dispatch(isSignUp());
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err, "error found");
        });
    } else {
      setErrors(err);
      console.log(errors, ":errors");
    }
  };

  const handleChange = (e) => {
    console.log(loginInfo);
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };
  const navigateToSignUp = () => {
    navigate("/signup");
  };
  const viewPassword = () => {
    let password = document.getElementById("password");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  };

  //---------------------------///validation///-------------------------
  const validation = (data) => {
    console.log(data, "dataa");
    let err = {};
    const email = data?.email;
    const password = data?.password;
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!data) {
      err.email = "enter your email";
    } else if (!email) {
      err.email = "enter your email";
    } else if (!emailFormat) {
      err.email = "enter a valid email";
    } else if (!password) {
      err.password = "enter the password";
    }
    return err;
  };
  //----------------------------------///validationends///---------

  return (
    <div>
      <div>
        <section className="bg-gray-50  min-h-screen flex items-center justify-center">
          <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-3 m-4">
            <div className="md:w-1/2 px-16">
              <h2 className="font-bold text-2xl text-[#464B87] ">Login</h2>
              <p className="text-sm m-3 text-[#464B87]">
                If you already a member you can easily login
              </p>
              {errors?.user && (
                <p className="text-sm m-3 text-red-500 text-center">
                  {errors?.user}
                </p>
              )}
              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                  className="mt-6 p-2 rounded-xl border  focus:outline-none"
                  type="text"
                  value={loginInfo.email}
                  onChange={handleChange}
                  name="email"
                  placeholder="enter email"
                />
                {errors?.email && (
                  <p className="text-sm m-3 text-red-500 text-center">
                    {errors?.email}
                  </p>
                )}
                <div className="relative">
                  <input
                    id="password"
                    className="w-full p-2 rounded-xl border  focus:outline-none "
                    type="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    name="password"
                    placeholder="enter the password "
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-eye absolute right-5 top-4 opacity-50 cursor-pointer"
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

                <button className="bg-[#464B87] text-white py-2 rounded-xl mb-3 shadow-lg hover:scale-105 duration-300">
                  Login
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
                Login with Google
              </button>
              <p className="mt-5 text-xs py-6  border-b">Forget password ?</p>

              <div className="mt-3 text-xs flex justify-between items-center text-[#464B87]">
                <p>If you don't have an account....</p>
                <button
                  className="py-2 border px-5 bg-white rounded-xl text-black  hover:scale-110 duration-300"
                  onClick={navigateToSignUp}
                >
                  Register
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

export default LoginPage;
