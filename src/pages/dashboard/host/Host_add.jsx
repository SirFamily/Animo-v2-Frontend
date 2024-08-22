import React, { useState, useEffect } from "react";
import styles from "./Css/hostadd.module.css"; 
import useAuth from "../../../hooks/useAuth";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios"; // Make sure axios is imported
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function HostAdd() {
  const [step, setStep] = useState(1);
  const [hostData, setHostData] = useState({
    name: "",
    type: "",
    address: "",
    lat: "",
    long: "",
    description: "",
    publish: false,
    images: [],
  });
  const { user } = useAuth();
  const uid = user.id;
  const [position, setPosition] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
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
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = hostData.images.filter(
      (_, imgIndex) => imgIndex !== index
    );
    URL.revokeObjectURL(hostData.images[index].preview);
    setHostData({ ...hostData, images: updatedImages });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', hostData.name);
    formData.append('type', hostData.type);
    formData.append('address', hostData.address);
    formData.append('lat', hostData.lat);
    formData.append('long', hostData.long);
    formData.append('description', hostData.description);
    formData.append('publish', hostData.publish);
  
    // Append images to the form data
    hostData.images.forEach((image, index) => {
      formData.append(`images`, image.file);
    });
  
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`http://localhost:8112/host/create/${uid}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
      console.log("Accommodation created successfully:", response.data);
      // You can also redirect or update UI based on the response here
    } catch (error) {
      console.error("Error creating accommodation:", error);
    }
  };
  
  useEffect(() => {
    return () => {
      hostData.images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [hostData.images]);

  // ส่วนของแผนที่
  const handleGetAddress = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.longdo.com/map/services/address?lon=${lon}&lat=${lat}&noelevation=1&key=e7511f741ce6876a9fc6f0a1429dbdae`
      );

      const fetchedAddress = response.data;
      console.log(fetchedAddress);
      const formattedAddress = `${fetchedAddress.country}, ${fetchedAddress.province}, ${fetchedAddress.district}, ${fetchedAddress.subdistrict}, ${fetchedAddress.postcode}`;
      setHostData((prevData) => ({
        ...prevData,
        address: formattedAddress,
        lat,
        long: lon,
      }));
    } catch (error) {
      console.error("Error fetching address:", error);
    }
  };

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [28, 46],
    iconAnchor: [17, 46],
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  const LocationMarker = () => {
    const map = useMapEvents({
      async click(e) {
        map.flyTo(e.latlng, 14);
        setPosition(e.latlng);
        await handleGetAddress(e.latlng.lat, e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          {position.lat}, {position.lng}
        </Popup>
      </Marker>
    );
  };

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
          data-title="Address"
        ></div>
        <div
          className={`${styles.step} ${step >= 3 ? styles.active : ""}`}
          data-step="3"
          data-title="Description"
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
              value={hostData.name}
              onChange={handleChange}
              required
            />
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={hostData.type}
              onChange={handleChange}
              required
            />
          </div>
        )}

        {step === 2 && (
          <div className={styles.formGroup}>
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={hostData.address}
              onChange={handleChange}
              required
            />
            <label>Latitude</label>
            <input
              type="text"
              name="lat"
              value={hostData.lat}
              onChange={handleChange}
              required
            />
            <label>Longitude</label>
            <input
              type="text"
              name="long"
              value={hostData.long}
              onChange={handleChange}
              required
            />
            <MapContainer
              className={styles.mapContainer}
              center={[13, 100]}
              zoom={5}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>
        )}

        {step === 3 && (
          <div className={styles.formGroup}>
            <label>Description</label>
            <textarea
              name="description"
              value={hostData.description}
              onChange={handleChange}
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

export default HostAdd;
