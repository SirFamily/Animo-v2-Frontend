import React, { useState, useEffect } from 'react';
import Modelpopup from "../../../component/Modelpopup";
import axios from 'axios';
import styles from './Css/petedit.module.css';
import speciesList from "../../../component/data/petdata.json";

function Pets_edit({ onClose, pet, setPetData }) {
  const [input, setInput] = useState({
    petName: '',
    breed: '',
    species: '',
    weight: '',
    height: '',
    gender: '',
    birthday: '',
    petHistory: '',
    url: '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setInput({
      petName: pet.petName || '',
      breed: pet.breed || '',
      species: pet.species || '',
      weight: pet.weight || '',
      height: pet.height || '',
      gender: pet.gender || '',
      birthday: pet.birthday ? new Date(pet.birthday).toISOString().substr(0, 10) : '',
      petHistory: pet.petHistory || '',
      url: pet.url || '',
    });
  }, [pet]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const handleSpeciesChange = (e) => {
    const { value } = e.target;
    setInput({
      ...input,
      species: value,
      breed: '',
    });
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
    setImageFile(e.target.files[0]);
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

    if (imageFile) {
      formData.append('url', imageFile);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/pets/update/${pet.id}`, 
        formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert('Pet information updated successfully!');
        setPetData();
        onClose();
      }
    } catch (error) {
      console.error('Error updating pet information:', error);
      alert('Failed to update pet information. Please try again.');
    }
  };

  const getBreedsForSpecies = (species) => {
    const selectedSpecies = speciesList.species.find(s => s.name === species);
    return selectedSpecies ? selectedSpecies.breeds : [];
  };

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>แก้ไขข้อมูลสัตว์เลี้ยง</h2>
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>ชื่อสัตว์เลี้ยง:</label>
            <input
              type="text"
              name="petName"
              placeholder='เป่าเปา'
              value={input.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
          <label>ประเภท:</label>
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
          <label>สายพันธุ์:</label>
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
          <div className={styles.DuoformGroup}>
          <div className={styles.formGroup}>
          <label>น้ำหนัก:</label>
            <input
              type="text"
              name="weight"
              placeholder="5.2 กก."
              value={input.weight}
              onChange={handleWeightChange}
            />
          </div>
          <div className={styles.formGroup}>
          <label>ส่วนสูง:</label>
            <input
              type="text"
              name="height"
              placeholder="15 ซม."
              value={input.height}
              onChange={handleHeightChange}
            />
          </div>
          </div>
          <div className={styles.formGroup}>
            <label>เพศ:</label>
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
            <label>วันเกิด:</label>
            <input
              type="date"
              name="birthday"
              value={input.birthday}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
          <label>ประวัติสัตว์เลี้ยง:</label>
            <textarea
              name="petHistory"
              value={input.petHistory}
              onChange={handleChange}
            />
          </div>
          {input.url && (
            <div className={styles.imagePreview}>
              <img src={input.url} alt="Pet" width="64" height="64" />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>รูปถ่าย:</label>
            <input type="file" onChange={handleFileChange} />
          </div> 
          <div className={styles.allButton}>
          <button className={styles.submitButton} type="submit">
            บันทึก
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

export default Pets_edit;
