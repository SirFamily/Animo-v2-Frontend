import React, { useState, useEffect } from "react";
import styles from "./Css/roomadd.module.css";
import axios from "axios";

function Room_add() {
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    quantity: 1,  // Default quantity to 1
    price: "",
    images: [],
  });
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
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
        [name]: type === "checkbox" ? checked : value,
      });
    }
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

    roomData.images.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:8112/room/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Room created successfully:", response.data);
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
      <div className={styles.progress}>
        <div
          className={`${styles.step} ${step >= 1 ? styles.active : ""}`}
          data-step="1"
          data-title="Name"
        ></div>
        <div
          className={`${styles.step} ${step >= 2 ? styles.active : ""}`}
          data-step="2"
          data-title="Quantity"
        ></div>
        <div
          className={`${styles.step} ${step >= 3 ? styles.active : ""}`}
          data-step="3"
          data-title="Price"
        ></div>
        <div
          className={`${styles.step} ${step >= 4 ? styles.active : ""}`}
          data-step="4"
          data-title="Image"
        ></div>
        <div
          className={`${styles.step} ${step >= 5 ? styles.active : ""}`}
          data-step="5"
          data-title="Confirm"
        ></div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={roomData.name}
              onChange={handleChange}
              required
            />
            <label>Type Room</label>
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
            <label>Quantity</label>
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
            <label>Price</label>
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
            <label>Upload Images</label>
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

        {step === 5 && <div>Confirm</div>}

        <div className={styles.buttons}>
          {step > 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {step < 5 && (
            <button
              type="button"
              className={styles.button_next}
              onClick={nextStep}
            >
              Next
            </button>
          )}
          {step === 5 && (
            <button type="submit" className={styles.button_next}>
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Room_add;
