import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    birthday: "",
    address: "",
    subDistrict: "",
    district: "",
    province: "",
    postalCode: "",
    bio: "",
    img: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, img: e.target.files[0] }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.password2) {
      alert("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("firstName", input.firstName);
    formData.append("lastName", input.lastName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phone", input.phone);
    formData.append("birthday", input.birthday);
    formData.append("address", input.address);
    formData.append("subDistrict", input.subDistrict);
    formData.append("district", input.district);
    formData.append("province", input.province);
    formData.append("postalCode", input.postalCode);
    formData.append("bio", input.bio);
    formData.append("img", input.img);

    // Log formData for debugging
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      const rs = await axios.post(
        "http://localhost:8112/auth/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(rs);
      if (rs.status === 201) {
        alert("Successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  return (
    <>
      <Link to="/">X</Link>
      <form onSubmit={hdlSubmit} encType="multipart/form-data">
        <div>
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={input.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={input.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="password2"
            value={input.password2}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Birthday:</label>
          <input
            type="date"
            name="birthday"
            value={input.birthday}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={input.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Sub District:</label>
          <input
            type="text"
            name="subDistrict"
            value={input.subDistrict}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>District:</label>
          <input
            type="text"
            name="district"
            value={input.district}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Province:</label>
          <input
            type="text"
            name="province"
            value={input.province}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Postal Code:</label>
          <input
            type="text"
            name="postalCode"
            value={input.postalCode}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea name="bio" value={input.bio} onChange={handleChange} />
        </div>
        <div>
          <label>Profile Picture:</label>
          <input type="file" name="img" accept="image/png,image/jpeg" onChange={handleFileChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

export default Register;
