import React, { useState } from "react";
import Modelpopup from "../../../component/Modelpopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import styles from "./Css/petsadd.module.css";
import speciesList from "../../../component/data/petdata.json"; // Ensure the path is correct

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
    setInput((prev) => ({ ...prev, species: value, breed: "" })); // Reset breed when species changes
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
        setPetData(); // Call the callback to fetch new data
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
            <select
              name="species"
              value={input.species}
              onChange={handleSpeciesChange}
              required
            >
              <option value="">เลือกประเภท</option>
              {speciesList.species.map((species) => (
                <option key={species.id} value={species.name}>
                  {species.name}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Breed:</label>
            <select
              name="breed"
              value={input.breed}
              onChange={handleChange}
              required
              disabled={!input.species}
            >
              <option value="">เลือกสายพันธุ์</option>
              {getBreedsForSpecies(input.species).map((breed, index) => (
                <option key={index} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
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
          <button className={styles.submitButton} type="submit">
            เพิ่มสัตว์เลี่ยง
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            ปิด
          </button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Pets_add;
