import React, { useState, useEffect } from 'react';
import Modelpopup from "../../../component/Modelpopup";
import axios from 'axios';

function Pets_edit({ onClose, pet }) {
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
        // Update the input state with the updated data
        setInput({
          ...input,
          url: response.data.url || input.url, // Update with the new image URL if available
        });
      }
      console.log(response)
    } catch (error) {
      console.error('Error updating pet information:', error);
      alert('Failed to update pet information. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <div>
        <button onClick={onClose}>x</button>
        <h2>Edit Pet Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Pet Name:</label>
            <input
              type="text"
              name="petName"
              value={input.petName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Breed:</label>
            <input
              type="text"
              name="breed"
              value={input.breed}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Animal Type:</label>
            <input
              type="text"
              name="animalType"
              value={input.animalType}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Weight:</label>
            <input
              type="number"
              name="weight"
              value={input.weight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Height:</label>
            <input
              type="number"
              name="height"
              value={input.height}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <input
              type="text"
              name="gender"
              value={input.gender}
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
            <label>Pet History:</label>
            <textarea
              name="petHistory"
              value={input.petHistory}
              onChange={handleChange}
            />
          </div>
          <img src={input.url} alt="" width="64" height="64" />
          <div>
            <label>Image:</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Pets_edit;
