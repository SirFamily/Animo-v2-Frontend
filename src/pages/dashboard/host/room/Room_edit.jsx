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

  // Populate the form with existing room data when the component mounts
  useEffect(() => {
    setInput({
      name: room.name || '',
      quantity: room.quantity || '',
      type: room.type || '',
      price: room.price || '',
    });
  }, [room]);

  // Handle changes to the input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  // Handle file change (for room images)
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit the form to update room data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("quantity", input.quantity);
    formData.append("type", input.type);
    formData.append("price", input.price);

    if (imageFile) {
      formData.append('image', imageFile); // Image field
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
        handleRoomUpdate(); // Call the callback to fetch updated room data
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
        <h2>Edit Room</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Room Name:</label>
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
            <label>Quantity:</label>
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
            <label>Type:</label>
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
            <label>Price:</label>
            <input
              type="text"
              name="price"
              placeholder="123.45"
              value={input.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Display multiple images */}
          {room.photosRoom && room.photosRoom.length > 0 && (
            <div className={styles.imagePreview}>
              {room.photosRoom.map((photo, index) => (
                <img key={index} src={photo.url} alt={`Room ${index}`} width="64" height="64" />
              ))}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Image: *ยังไม่สามารถเพิ่มลบหรือแก้ไขรูปภาพได้</label>
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
