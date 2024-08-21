import React, { useState, useEffect } from 'react';
import styles from './Css/hostadd.module.css'; // Importing CSS Module

function HostAdd() {
  const [step, setStep] = useState(1);
  const [hostData, setHostData] = useState({
    name: '',
    type: '',
    address: '',
    lat: '',
    long: '',
    description: '',
    publish: false,
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      const newImages = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setHostData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newImages],
      }));
    } else {
      setHostData({
        ...hostData,
        [name]: type === 'checkbox' ? checked : value,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = hostData.images.filter((_, imgIndex) => imgIndex !== index);
    URL.revokeObjectURL(hostData.images[index].preview);
    setHostData({ ...hostData, images: updatedImages });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted Host Data:', hostData);
    // Add your submit logic here (e.g., send data to an API)
  };

  useEffect(() => {
    return () => {
      hostData.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.progress}>
        <div className={`${styles.step} ${step >= 1 ? styles.active : ''}`}>Step 1</div>
        <div className={`${styles.step} ${step >= 2 ? styles.active : ''}`}>Step 2</div>
        <div className={`${styles.step} ${step >= 3 ? styles.active : ''}`}>Step 3</div>
        <div className={`${styles.step} ${step >= 4 ? styles.active : ''}`}>Step 4</div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <label>Name</label>
            <input type="text" name="name" value={hostData.name} onChange={handleChange} required />
            <label>Type</label>
            <input type="text" name="type" value={hostData.type} onChange={handleChange} required />
          </div>
        )}

        {step === 2 && (
          <div className={styles.formGroup}>
            <label>Address</label>
            <input type="text" name="address" value={hostData.address} onChange={handleChange} required />
            <label>Latitude</label>
            <input type="text" name="lat" value={hostData.lat} onChange={handleChange} required />
            <label>Longitude</label>
            <input type="text" name="long" value={hostData.long} onChange={handleChange} required />
          </div>
        )}

        {step === 3 && (
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea name="description" value={hostData.description} onChange={handleChange} />
          </div>
        )}

        {step === 4 && (
          <div className={styles.formGroup}>
            <label>Upload Images</label>
            <input type="file" name="images" onChange={handleChange} multiple accept="image/*" />
            <div className={styles.imagePreview}>
              {hostData.images.length > 0 &&
                hostData.images.map((image, index) => (
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

        <div className={styles.buttons}>
          {step > 1 && <button type="button" onClick={prevStep}>Back</button>}
          {step < 4 && <button type="button" onClick={nextStep}>Next</button>}
          {step === 4 && <button type="submit">Submit</button>}
        </div>
      </form>
    </div>
  );
}

export default HostAdd;
