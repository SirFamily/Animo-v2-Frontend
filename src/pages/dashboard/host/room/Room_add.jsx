import React, { useState, useEffect } from "react";
import styles from "./Css/roomadd.module.css";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import speciesList from "../../../../component/data/petdata.json"; 

function Room_add() {
  const navigate = useNavigate();
  const { hid } = useParams();
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    quantity: 1,
    price: "",
    images: [],
    supportPetName: "", 
    supportPetDescription: ""
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setRoomData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newImages],
      }));
    } else {
      setRoomData({
        ...roomData,
        [name]: value,
      });
    }
  };

  const handleSpeciesChange = (e) => {
    setRoomData({
      ...roomData,
      supportPetName: e.target.value,
    });
  };

  const handleRemoveImage = (index) => {
    const updatedImages = roomData.images.filter(
      (_, imgIndex) => imgIndex !== index
    );
    URL.revokeObjectURL(roomData.images[index].preview);
    setRoomData({ ...roomData, images: updatedImages });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", roomData.name);
    formData.append("type", roomData.type);
    formData.append("quantity", roomData.quantity);
    formData.append("price", roomData.price);
    formData.append("supportPetName", roomData.supportPetName);
    formData.append("supportPetDescription", roomData.supportPetDescription);

    roomData.images.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/room/create/${hid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Room created successfully:", response.data);
      alert("Created successfully");
      navigate("/dashboard/host");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  useEffect(() => {
    return () => {
      roomData.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [roomData.images]);

  return (
    <div className={styles.container}>
      <h1>เพิ่มห้อง</h1>
      <div className={styles.progress}>
        <div
          className={`${styles.step} ${step >= 1 ? styles.active : ""}`}
          data-step="1"
          data-title="ชื่อ"
        ></div>
        <div
          className={`${styles.step} ${step >= 2 ? styles.active : ""}`}
          data-step="2"
          data-title="จำนวน"
        ></div>
        <div
          className={`${styles.step} ${step >= 3 ? styles.active : ""}`}
          data-step="3"
          data-title="ราคา"
        ></div>
        <div
          className={`${styles.step} ${step >= 4 ? styles.active : ""}`}
          data-step="4"
          data-title="รูป"
        ></div>
        <div
          className={`${styles.step} ${step >= 5 ? styles.active : ""}`}
          data-step="5"
          data-title="สัตว์เลี้ยงที่รองรับ"
        ></div>
        <div
          className={`${styles.step} ${step >= 6 ? styles.active : ""}`}
          data-step="6"
          data-title="ยืนยัน"
        ></div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <label>ชื่อ</label>
            <input
              type="text"
              name="name"
              value={roomData.name}
              onChange={handleChange}
              required
            />
            <label>ประเภทห้อง</label>
            <input
              type="text"
              name="type"
              value={roomData.type}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className={styles.formGroup}>
            <label>รองรับสัตว์เลี้ยง</label>
            <input
              type="number"
              name="quantity"
              value={roomData.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
        )}

        {step === 3 && (
          <div className={styles.formGroup}>
            <label>ราคา</label>
            <input
              type="number"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              step="0.01"
              required
            />
          </div>
        )}

        {step === 4 && (
          <div className={styles.formGroup}>
            <label>อัพโหลดรูปภาพ</label>
            <input
              type="file"
              name="images"
              onChange={handleChange}
              multiple
              accept="image/*"
            />
            <div className={styles.imagePreview}>
              {roomData.images.length > 0 &&
                roomData.images.map((image, index) => (
                  <div key={index} className={styles.previewContainer}>
                    <img
                      src={image.preview}
                      alt={`Preview ${index + 1}`}
                      className={styles.previewImage}
                    />
                    <button
                      type="button"
                      className={styles.removeButton}
                      onClick={() => handleRemoveImage(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div className={styles.formGroup}>
            <label>รองรับสัตว์เลี้้ยงประเภท</label>
            <select
              name="supportPetName"
              value={roomData.supportPetName}
              onChange={handleSpeciesChange}
            >
              <option value="">เลือกสายพันธุ์สัตว์เลี้ยง</option>
              {speciesList.species.map((species) => (
                <option key={species.id} value={species.name}>
                  {species.name}
                </option>
              ))}
            </select>
            {/* <label>คำอธิบาย การรองรับสัตว์เลี้ยง</label>
            <textarea
              name="supportPetDescription"
              value={roomData.supportPetDescription}
              onChange={handleChange}
            ></textarea> */}
          </div>
        )}

        {step === 6 && <div>ยืนยัน</div>}

        <div className={styles.buttons}>
          {step === 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={() => navigate("/dashboard/host")}
            >
              ออก
            </button>
          )}
          {step > 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={prevStep}
            >
              ก่อนหน้า
            </button>
          )}
          {step < 6 && (
            <button
              type="button"
              className={styles.button_next}
              onClick={nextStep}
            >
              ถัดไป
            </button>
          )}
          {step === 6 && (
            <button type="submit" className={styles.button_next}>
              ยืนยัน
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Room_add;
