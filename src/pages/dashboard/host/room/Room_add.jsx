import React, { useState, useEffect } from "react";
import styles from "./Css/roomadd.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Room_add() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [roomData, setRoomData] = useState({
    name: "",
    type: "",
    quantity: 1, // Default quantity to 1
    price: "",
    images: [],
    supportPetName: "", // New: Support pet name
    supportPetDescription: "" // New: Support pet description
  });

  // Handle input changes
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

  // Remove image
  const handleRemoveImage = (index) => {
    const updatedImages = roomData.images.filter(
      (_, imgIndex) => imgIndex !== index
    );
    URL.revokeObjectURL(roomData.images[index].preview);
    setRoomData({ ...roomData, images: updatedImages });
  };

  // Step navigation
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", roomData.name);
    formData.append("type", roomData.type);
    formData.append("quantity", roomData.quantity);
    formData.append("price", roomData.price);
    formData.append("supportPetName", roomData.supportPetName); // Append support pet name
    formData.append("supportPetDescription", roomData.supportPetDescription); // Append support pet description

    roomData.images.forEach((image) => {
      formData.append("images", image.file);
    });

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/room/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Room created successfully:", response.data);
      alert("created successfully");
      navigate("/dashboard/host");
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  // Clean up image previews on unmount
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
          data-title="Support Pet"
        ></div>
        <div
          className={`${styles.step} ${step >= 6 ? styles.active : ""}`}
          data-step="6"
          data-title="Confirm"
        ></div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Step 1: Room Name and Type */}
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

        {/* Step 2: Quantity */}
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

        {/* Step 3: Price */}
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

        {/* Step 4: Image Upload */}
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

        {/* Step 5: Support Pet Information */}
        {step === 5 && (
          <div className={styles.formGroup}>
            <label>Support Pet Name</label>
            <input
              type="text"
              name="supportPetName"
              value={roomData.supportPetName}
              onChange={handleChange}
            />
            <label>Support Pet Description</label>
            <textarea
              name="supportPetDescription"
              value={roomData.supportPetDescription}
              onChange={handleChange}
            ></textarea>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {step === 6 && <div>Confirm</div>}

        {/* Navigation Buttons */}
        <div className={styles.buttons}>
          {step === 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={() => navigate("/dashboard/host")}
            >
              Exit
            </button>
          )}
          {step > 1 && (
            <button
              type="button"
              className={styles.button_back}
              onClick={prevStep}
            >
              Previous
            </button>
          )}
          {step < 6 && (
            <button
              type="button"
              className={styles.button_next}
              onClick={nextStep}
            >
              Next
            </button>
          )}
          {step === 6 && (
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
