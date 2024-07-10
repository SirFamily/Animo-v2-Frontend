import React, { useState } from "react";
import Modelpopup from "../../../component/Modelpopup";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

function Pets_add({ onClose }) {
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
      console.log(response);
      if (response.status === 201) {
        alert("ลงทะเบียนสำเร็จ");
        onClose();
      }
    } catch (error) {
      console.error("Error adding pet:", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <Modelpopup>
      <h2>เพิ่มสัตว์เลี้ยง</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div>
          Pet Name:
          <input
            type="text"
            name="petName"
            value={input.petName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          Animal Type:
          <input
            type="text"
            name="animalType"
            value={input.animalType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          Breed:
          <input
            type="text"
            name="breed"
            value={input.breed}
            onChange={handleChange}
          />
        </div>
        <div>
          Weight:
          <input
            type="number"
            step="0.01"
            name="weight"
            value={input.weight}
            onChange={handleChange}
          />
        </div>
        <div>
          Height:
          <input
            type="number"
            step="0.01"
            name="height"
            value={input.height}
            onChange={handleChange}
          />
        </div>
        <div>
          Gender:
          <input
            type="text"
            name="gender"
            value={input.gender}
            onChange={handleChange}
          />
        </div>
        <div>
          Birthday:
          <input
            type="date"
            name="birthday"
            value={input.birthday}
            onChange={handleChange}
          />
        </div>
        <div>
          Pet History:
          <textarea
            name="petHistory"
            value={input.petHistory}
            onChange={handleChange}
          />
        </div>
        <div>
          Image:
          <input
            type="file"
            accept="image/png,image/jpeg"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add Pet</button>
      </form>
      <div onClick={onClose}>X</div>
    </Modelpopup>
  );
}

export default Pets_add;
