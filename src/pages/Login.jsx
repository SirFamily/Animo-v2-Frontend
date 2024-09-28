import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logincss from "./logincss/login.module.css";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const hdlChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        input
      );
      localStorage.setItem("userData", JSON.stringify(response.data.data));

      if (response.status === 200) {
        alert("Login successful");
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={logincss.body}>
      <div className={logincss.dog}>
        <img
          src="https://img5.pic.in.th/file/secure-sv1/left-dog.png"
          alt="dog"
        />
      </div>

      <div className={logincss.boxlogin}>
        <Link to="/" className={logincss["close-link"]}>
          X
        </Link>

        <div className={logincss.head}>
          <h2>สวัสดีและยินดีต้อนรับกลับมา</h2>
        </div>

        <form onSubmit={hdlSubmit}>
          <div className={logincss.login}>
            <div>
              <p>อีเมล</p>
              <input
                type="text"
                name="email"
                required
                value={input.email}
                onChange={hdlChange}
              />
            </div>

            <div>
              <p>รหัสผ่าน</p>
              <input
                type="password"
                name="password"
                required
                value={input.password}
                onChange={hdlChange}
              />
            </div>
          </div>

          <br />
          <div className={logincss.submit}>
            <button type="submit">เข้าสู่ระบบ</button>
          </div>

          <div className={logincss.or}>
            <hr />
            <p>หรือ</p>
            <hr />
          </div>

          <div className={logincss.register}>
            <p>
              คุณยังไม่มีบัญชีใช่ไหม? <Link to="/register">ลงทะเบียน</Link>
            </p>
          </div>
        </form>
      </div>

      <div className={logincss.cat}>
        <img
          src="https://img5.pic.in.th/file/secure-sv1/right-cat.png"
          alt="cat"
        />
      </div>
    </div>
  );
}

export default Login;
