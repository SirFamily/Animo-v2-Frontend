import React, { useState } from "react";
import Modelpopup from "../../../component/Modelpopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import styles from "./Css/petsadd.module.css";

function Pets_add({ onClose, setPetData }) {
  const { user } = useAuth();
  const uid = user.id;
  const [input, setInput] = useState({
    petName: "",
    animalType: "",
    breed: "",
    weight: "",
    height: "",
    gender: "",
    birthday: "",
    url: null,
    petHistory: "",
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, url: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("petName", input.petName);
    formData.append("animalType", input.animalType);
    formData.append("breed", input.breed);
    formData.append("weight", input.weight);
    formData.append("height", input.height);
    formData.append("gender", input.gender);
    formData.append("birthday", input.birthday);
    formData.append("petHistory", input.petHistory);
    if (input.url) formData.append("url", input.url);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8112/pets/create/${uid}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("ลงทะเบียนสำเร็จ");
        setPetData((prev) => [...prev, response.data.data]); // Update pet list
        setInput({ // Reset form
          petName: "",
          animalType: "",
          breed: "",
          weight: "",
          height: "",
          gender: "",
          birthday: "",
          url: null,
          petHistory: "",
        });
        onClose();
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      alert("เกิดข้อผิดพลาดในการลงทะเบียนสัตว์เลี้ยง");
    }
  };

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>เพิ่มสัตว์เลี้ยง</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Pet Name:</label>
            <input
              type="text"
              name="petName"
              value={input.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Species:</label>
            <input
              type="text"
              name="animalType"
              value={input.animalType}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={input.breed}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Weight:</label>
            <input
              type="number"
              step="0.01"
              name="weight"
              value={input.weight}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Height:</label>
            <input
              type="number"
              step="0.01"
              name="height"
              value={input.height}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Gender:</label>
            <select
              name="gender"
              value={input.gender}
              onChange={handleChange}
            >
              <option value="">เลือกเพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Birthday:</label>
            <input
              type="date"
              name="birthday"
              value={input.birthday}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Pet History:</label>
            <textarea
              name="petHistory"
              value={input.petHistory}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Image:</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <button className={styles.submitButton} type="submit">เพิ่มสัตว์เลี่ยง</button>
        <button className={styles.closeButton} onClick={onClose}>ปิด</button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Pets_add;
