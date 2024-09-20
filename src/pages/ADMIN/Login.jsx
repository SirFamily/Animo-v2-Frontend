import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function AdminLogin() {
    const [input, setInput] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const { setAdmin } = useAuth();
    const handleChange = (e) => {
        setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // ส่งข้อมูลไปที่ API เพื่อ Login
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/a/login`, input);
            const { token } = res.data;
            sessionStorage.setItem("token_admin", token);
            console.log(token)
            const res2 = await axios.get(`${import.meta.env.VITE_API_URL}/auth/a/getad`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
            setAdmin(res2.data)
            console.log(res2)
            alert("Login successful");
            navigate("/"); 
        } catch (err) {
            console.error(err);
            alert("Login failed");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button type="submit">Login</button>
            <Link to="/register/a">Login here</Link>
        </form>
    );
}

export default AdminLogin;
