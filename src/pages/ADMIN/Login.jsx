import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import logincss from "./Css/loginadmin.module.css";

function Login() {
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setAdmin } = useAuth();

  const handleChange = (e) => {
    setInput((prv) => ({ ...prv, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/a/login`,
        input
      );
      const { token } = res.data;
      sessionStorage.setItem("token_admin", token);
      const res2 = await axios.get(
        `${import.meta.env.VITE_API_URL}/auth/a/getad`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAdmin(res2.data);
      if (res.status === 200) {
        alert("Login successful");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("Login failed");
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
          <p>สวัสดีและยินดีต้อนรับกลับมา (Admin)</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={logincss.login}>
            <div>
              <p>อีเมล</p>
              <input
                type="text"
                id="email"
                name="email"
                required
                value={input.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>รหัสผ่าน</p>
              <input
                type="password"
                name="password"
                required
                value={input.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <br />
          <div className={logincss.submit}>
            <button type="submit">
              <div>เข้าสู่ระบบ</div>
            </button>
          </div>
          <div className={logincss.or}>
            <hr />
            <p>หรือ</p>
            <hr />
          </div>
          <div className={logincss.register}>
            <p>
              คุณยังไม่มีบัญชีใช่ไหม? <Link to="/register/a">ลงทะเบียน</Link>
            </p>
          </div>
          {/* <div className={logincss.google_facebook}>
            <button className={logincss.google}>
              <img
                src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png"
                alt="Google logo"
              />
              <p>Google</p>
            </button>
            <button className={logincss.facebook}>
              <img
                src="https://cdn3.iconfinder.com/data/icons/social-network-flat-3/100/Facebook-256.png"
                alt="Facebook logo"
              />
              <p>Facebook</p>
            </button>
          </div> */}
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