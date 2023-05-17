import { Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./Form";
import Home from "./Home";
import TableComp from "./TableComp";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

function App() {
  const cookies = new Cookies();
  const [auth, setAuth] = useState("");
  const [admin, setAdmin] = useState("");

  useEffect(() => {
    let ck = cookies.get("user");
    let temp = cookies.get("login-user");
    // setAuth(ck || '')
    // setAdmin(admin || '')
    ck && ck !== undefined && setAuth("user");
    temp && temp !== undefined && setAuth("login_user");
  }, []);

  return (
    <>
      {auth === "" ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign-in" element={<Signin />} />
          <Route path="/Sign-up" element={<Signup />} />
        </Routes>
      ) : auth === "user" ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Sign-in" element={<Signin />} />
          <Route path="/Sign-up" element={<Signup />} />
          <Route path="/Sign-up/:userId" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/table" element={<TableComp />} />
          <Route path="/Sign-in" element={<Signin />} />
          <Route path="/Sign-up" element={<Signup />} />
          <Route path="/Sign-up/:userId" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      )}
    </>
  );
}

export default App;
