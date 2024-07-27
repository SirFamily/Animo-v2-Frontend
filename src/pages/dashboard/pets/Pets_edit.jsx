import React, { useState, useEffect } from 'react';
import Modelpopup from "../../../component/Modelpopup";
import axios from 'axios';
import styles from './Css/petedit.module.css';

function Pets_edit({ onClose, pet, setPetData }) {
  const [input, setInput] = useState({
    petName: '',
    breed: '',
    animalType: '',
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
      animalType: pet.animalType || '',
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

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
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

    if (imageFile) {
      formData.append('url', imageFile);
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(`http://localhost:8112/pets/update/${pet.id}`, 
        formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.status === 200) {
        alert('Pet information updated successfully!');
        setPetData(); // Call the callback to fetch new data
        onClose();
      }
    } catch (error) {
      console.error('Error updating pet information:', error);
      alert('Failed to update pet information. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>แก้ไขข้อมูลสัตว์เลี้ยง</h2>
        <form onSubmit={handleSubmit}>
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
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={input.breed}
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
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={input.weight}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Height:</label>
            <input
              type="number"
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
          {input.url && (
            <div className={styles.imagePreview}>
              <img src={input.url} alt="Pet" width="64" height="64" />
            </div>
          )}
          <div className={styles.formGroup}>
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className={styles.submitButton} type="submit">บันทึก</button>
          <button className={styles.closeButton} onClick={onClose}>ปิด</button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Pets_edit;
