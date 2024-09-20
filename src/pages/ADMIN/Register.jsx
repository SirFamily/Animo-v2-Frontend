import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import registercss from "./Css/register.module.css";

function Register() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const navigate = useNavigate();

  // ฟังก์ชันสำหรับเปลี่ยนค่าของ input
  const handleChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ฟังก์ชันสำหรับจัดการการส่งฟอร์ม
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (input.password !== input.confirmPassword) {
        alert("Passwords do not match");
        return;
      }

      // Using FormData
      const formData = new FormData();
      formData.append("firstName", input.firstName);
      formData.append("lastName", input.lastName);
      formData.append("email", input.email);
      formData.append("password", input.password);
      formData.append("confirmPassword", input.confirmPassword);
      formData.append("phone", input.phone);

      // ส่งข้อมูลไปยัง API เพื่อทำการลงทะเบียน
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/a/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important when using FormData
        },
      });
      
      if (res.status === 201) {
        alert("Registration successful");
        navigate("/login/a"); // หลังลงทะเบียนเสร็จ ให้เปลี่ยนเส้นทางไปที่หน้า Login
      }
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className={registercss.container}>
      <div className={registercss.formBox}>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className={registercss.formGroup}>
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={input.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={registercss.formGroup}>
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={input.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={registercss.formGroup}>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={registercss.formGroup}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={registercss.formGroup}>
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label >Phone:</label>
            <input
              type="text"
              name="phone"
              value={input.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className={registercss.submitBtn}>
            Register
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login/a">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
