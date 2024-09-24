import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./registercss/register.module.css"; // Import the CSS module

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

  const [step, setStep] = useState(1); // สำหรับการเปลี่ยน Step
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

    try {
      const rs = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (rs.status === 201) {
        alert("Registration Successful");
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed", error.response.data);
    }
  };

  const nextStep = () => {
    if (step < 4) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const closeForm = () => {
    navigate(-1);
  };

  return (
    <div className={styles.registerContainer}>
      <form
        onSubmit={hdlSubmit}
        className={styles.registerForm}
        encType="multipart/form-data"
      >
        <h2 className={styles.head}>สมัครสมาชิก</h2>
        <div className={styles.stepContainer}>
          <div className={`${styles.step} ${step >= 1 ? styles.active : ""}`}>
            1
          </div>
          <div className={`${styles.step} ${step >= 2 ? styles.active : ""}`}>
            2
          </div>
          <div className={`${styles.step} ${step >= 3 ? styles.active : ""}`}>
            3
          </div>
          <div className={`${styles.step} ${step >= 4 ? styles.active : ""}`}>
            4
          </div>
        </div>

        {step === 1 && (
          <>
            <div className={styles.formGroup}>
              <label>ชื่อจริง:</label>
              <input
                type="text"
                name="firstName"
                value={input.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>นามสกุล:</label>
              <input
                type="text"
                name="lastName"
                value={input.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>อีเมล:</label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className={styles.formGroup}>
              <label>รหัสผ่าน:</label>
              <input
                type="password"
                name="password"
                value={input.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>ยืนยันรหัสผ่าน:</label>
              <input
                type="password"
                name="password2"
                value={input.password2}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className={styles.formGroup}>
              <label>เบอร์โทร:</label>
              <input
                type="text"
                name="phone"
                value={input.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>วันเกิด:</label>
              <input
                type="date"
                name="birthday"
                value={input.birthday}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>ที่อยู่:</label>
              <input
                type="text"
                name="address"
                value={input.address}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className={styles.formGroup}>
              <label>ตำบล:</label>
              <input
                type="text"
                name="subDistrict"
                value={input.subDistrict}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>อำเภอ:</label>
              <input
                type="text"
                name="district"
                value={input.district}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>จังหวัด:</label>
              <input
                type="text"
                name="province"
                value={input.province}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>รหัสไปรษณีย์:</label>
              <input
                type="text"
                name="postalCode"
                value={input.postalCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label>ประวัติ:</label>
              <textarea
                className={styles.textarea}
                name="bio"
                value={input.bio}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label>รูปโปรไฟล์:</label>
              <input
                type="file"
                name="img"
                accept="image/png,image/jpeg"
                onChange={handleFileChange}
              />
            </div>
          </>
        )}
        <div className={styles.login}>
          <p>
            มีบัญชีอยู่แล้ว? <Link to="/login">เข้าสู่ระบบที่นี่</Link>
          </p>
        </div>

        <div className={styles.buttonGroup}>
          {step === 1 && (
            <button
              type="button"
              onClick={closeForm}
              className={styles.button_back}
            >
              ปิด
            </button>
          )}
          {step > 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={prevStep}
            >
              ก่อนหน้า
            </button>
          )}
          {step < 4 && (
            <button type="button" className={styles.button} onClick={nextStep}>
              ถัดไป
            </button>
          )}
          {step === 4 && (
            <button type="submit" className={styles.button}>
              ยืนยัน
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
