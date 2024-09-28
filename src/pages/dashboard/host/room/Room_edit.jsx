import React, { useState, useEffect } from "react";
import Modelpopup from "../../../../component/Modelpopup";
import axios from "axios";
import styles from "./Css/roomedit.module.css";  

function Room_edit({ onClose, room, handleRoomUpdate }) {
  const [step, setStep] = useState(1); 
  const [input, setInput] = useState({
    name: "",
    quantity: "",
    type: "",
    price: "",
  });

  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    setInput({
      name: room.name || "",
      quantity: room.quantity || "",
      type: room.type || "",
      price: room.price || "",
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
      formData.append("image", imageFile);
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/room/update/${room.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Room information updated successfully!");
        handleRoomUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error updating room information:", error);
      alert("Failed to update room information. Please try again.");
    }
  };

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>แก้ไขห้อง</h2>
        <form onSubmit={handleSubmit}>

          {step === 1 && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ชื่อห้อง:</label>
                <input
                  type="text"
                  name="name"
                  className={styles.formInput}
                  placeholder="Room Name"
                  value={input.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.formLabel}>รองรับสัตว์เลี้ยง:</label>
                <input
                  type="number"
                  name="quantity"
                  className={styles.formInput}
                  placeholder="1"
                  value={input.quantity}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ประเภทห้อง:</label>
                <input
                  type="text"
                  name="type"
                  className={styles.formInput}
                  placeholder="Room Type"
                  value={input.type}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>ราคา:</label>
                <input
                  type="text"
                  name="price"
                  className={styles.formInput}
                  placeholder="123.45"
                  value={input.price}
                  onChange={handleChange}
                  required
                />
              </div>

             
            </>
          )}

          {step === 2 && (
            <>
               {room.photosRoom && room.photosRoom.length > 0 && (
                <div className={styles.imagePreview}>
                  {room.photosRoom.map((photo, index) => (
                    <img
                      key={index}
                      src={photo.url}
                      alt={`Room ${index}`}
                      className={styles.imageThumbnail}
                    />
                  ))}
                </div>
              )}
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>รูปถ่าย: *ยังไม่สามารถเพิ่มลบหรือแก้ไขรูปภาพได้</label>
                <input
                  type="file"
                  className={styles.formInput}
                  onChange={handleFileChange}
                />
              </div>
            </>
          )}

          <div className={styles.buttonGroup}>
            {step === 1 && (
              <button type="button" className={styles.button_back} onClick={onClose}>
                ปิด
              </button>
            )}
            {step > 1 && (
              <button type="button" className={styles.button} onClick={prevStep}>
                ก่อนหน้า
              </button>
            )}
            {step < 2 && (
              <button type="button" className={styles.button} onClick={nextStep}>
                ถัดไป
              </button>
            )}
            {step === 2 && (
              <button type="submit" className={styles.button}>
                ยืนยัน
              </button>
            )}
          </div>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Room_edit;
