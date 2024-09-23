import React, { useState } from "react";
import Modelpopup from "../../../component/Modelpopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import styles from "./Css/petsadd.module.css";
import speciesList from "../../../component/data/petdata.json"; 

function Pets_add({ onClose, setPetData }) {
  const { user } = useAuth();
  const uid = user.id;
  const [input, setInput] = useState({
    petName: "",
    species: "",
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

  const handleSpeciesChange = (e) => {
    const { value } = e.target;
    setInput((prev) => ({ ...prev, species: value, breed: "" }));
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    const validValue = value.match(/^\d{0,3}(\.\d{0,2})?$/) ? value : input[name];
    setInput({
      ...input,
      [name]: validValue,
    });
  };

  const handleHeightChange = (e) => {
    const { name, value } = e.target;
    const validValue = value.match(/^\d{0,3}(\.\d{0,2})?$/) ? value : input[name];
    setInput({
      ...input,
      [name]: validValue,
    });
  };

  const handleFileChange = (e) => {
    setInput((prev) => ({ ...prev, url: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("petName", input.petName);
    formData.append("species", input.species);
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
        `${import.meta.env.VITE_API_URL}/pets/create/${uid}`,
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
        setPetData(); 
        setInput({
          petName: "",
          species: "",
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

  const getBreedsForSpecies = (species) => {
    const selectedSpecies = speciesList.species.find((s) => s.name === species);
    return selectedSpecies ? selectedSpecies.breeds : [];
  };

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>เพิ่มสัตว์เลี้ยง</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="petName"
              placeholder='ชื่อสัตว์เลี้ยง'
              value={input.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <select
              name="species"
              value={input.species}
              onChange={handleSpeciesChange}
              required
            >
              <option value="">ประเภท</option>
              {speciesList.species.map((species) => (
                <option key={species.id} value={species.name}>
                  {species.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <select
              name="breed"
              value={input.breed}
              onChange={handleChange}
              required
              disabled={!input.species}
            >
              <option value="">สายพันธุ์</option>
              {getBreedsForSpecies(input.species).map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.DuoformGroup}>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="weight"
              placeholder="น้ำหนัก"
              value={input.weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className={styles.formGroup}>
            <input
              type="text"
              name="height"
              placeholder="ส่วนสูง"
              value={input.height}
              onChange={handleHeightChange}
            />
          </div>
          </div>
          <div className={styles.formGroup}>
            <select
              name="gender"
              value={input.gender}
              onChange={handleChange}
            >
              <option value="">เพศ</option>
              <option value="ชาย">ชาย</option>
              <option value="หญิง">หญิง</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>วันเกิด:</label>
            <input
              type="date"
              name="birthday"
              value={input.birthday}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              name="petHistory"
              placeholder="ประวัติสัตว์เลี้ยง"
              value={input.petHistory}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>รูปถ่าย:</label>
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={handleFileChange}
            />
          </div>
          <div className={styles.allButton}>
          <button className={styles.submitButton} type="submit">
            เพิ่มสัตว์เลี่ยง
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            ปิด
          </button>
          </div>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Pets_add;
