import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LoginPage from "./Components/userSide/LoginPage";
import SignUp from "./Components/userSide/SignUp";
import AdminLogin from "./Components/adminSide/AdminLogin";
import UserHome from "./Components/userSide/UserHome";
import { Provider } from "react-redux";
import store from "./Redux/store";
import AdminHome from "./Components/adminSide/AdminHome";
import PageNotFound from "./Components/userSide/PageNotFound";

function App() {

 
 useEffect(() => {
    const userjwt = localStorage.getItem("userjwt");
    const adminjwt = localStorage.getItem("adminjwt");
    if (userjwt) {
      if (
        window.location.pathname === "/login" ||
        window.location.pathname === "/signup"
      ) {
        window.location.replace("/");
      }
    }
    if (adminjwt) {
      if (window.location.pathname === "/admin") {
        window.location.replace("/admin/adminhome");
      }
    }
  }, []);

  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<UserHome />} />
            <Route path="*" element={<PageNotFound />} />
           
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/adminhome" element={<AdminHome />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
