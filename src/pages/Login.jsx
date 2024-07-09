import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

function Login() {
  const { setUser } = useAuth();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const hdlChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };
  const hdlSubmit = async (e) => {
    try {
      e.preventDefault();
      const rs = await axios.post("http://localhost:8112/auth/login", input);
      console.log(rs.data.token);
      localStorage.setItem("token", rs.data.token);
      const rs1 = await axios.get("http://localhost:8112/auth/getme", {
        headers: {
          Authorization: `Bearer ${rs.data.token}`,
        },
      });
      console.log(rs1.data);
      setUser(rs1.data);
      if (rs.status === 200) {
        alert("Login successful");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
    <Link to="/">X</Link>
    <form onSubmit={hdlSubmit}>
                <input
                  type="text"
                  id="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={input.email}
                  onChange={hdlChange}
              
                />
                <br />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={input.password}
                  onChange={hdlChange}
                />
                <br/>

                <button type="submit">
                  <div>LOGIN</div>
                </button>
                <br />
              </form>
    </>
  );
}

export default Login;
