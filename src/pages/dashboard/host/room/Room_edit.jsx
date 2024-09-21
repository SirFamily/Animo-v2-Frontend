import React, { useState, useEffect } from 'react';
import Modelpopup from "../../../../component/Modelpopup";
import axios from 'axios';
import styles from './Css/roomedit.module.css';

function Room_edit({ onClose, room, handleRoomUpdate }) {
  const [input, setInput] = useState({
    name: '',
    quantity: '',
    type: '',
    price: '',
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setInput({
      name: room.name || '',
      quantity: room.quantity || '',
      type: room.type || '',
      price: room.price || '',
    });
  }, [room]);

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
    formData.append("name", input.name);
    formData.append("quantity", input.quantity);
    formData.append("type", input.type);
    formData.append("price", input.price);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/room/update/${room.id}`, 
        formData, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert('Room information updated successfully!');
        handleRoomUpdate();
        onClose();
      }
    } catch (error) {
      console.error('Error updating room information:', error);
      alert('Failed to update room information. Please try again.');
    }
  };

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>แก้ไขห้อง</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>ชื่อห้อง:</label>
            <input
              type="text"
              name="name"
              placeholder='Room Name'
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>รองรับสัตว์เลี้ยง:</label>
            <input
              type="number"
              name="quantity"
              placeholder="1"
              value={input.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>ประเภทห้อง:</label>
            <input
              type="text"
              name="type"
              placeholder="Room Type"
              value={input.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label>ราคา:</label>
            <input
              type="text"
              name="price"
              placeholder="123.45"
              value={input.price}
              onChange={handleChange}
              required
            />
          </div>

          {room.photosRoom && room.photosRoom.length > 0 && (
            <div className={styles.imagePreview}>
              {room.photosRoom.map((photo, index) => (
                <img key={index} src={photo.url} alt={`Room ${index}`} width="64" height="64" />
              ))}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>รูปถ่าย: *ยังไม่สามารถเพิ่มลบหรือแก้ไขรูปภาพได้</label>
            <input type="file" onChange={handleFileChange} />
          </div>
          <button className={styles.submitButton} type="submit">บันทึก</button>
          <button className={styles.closeButton} onClick={onClose}>ปิด</button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Room_edit;
