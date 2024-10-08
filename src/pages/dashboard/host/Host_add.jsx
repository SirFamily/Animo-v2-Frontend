import React, { useState, useEffect } from "react";
import styles from "./Css/hostadd.module.css"; 
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import housing_types from "../../../component/data/hostingtype.json";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios"; 
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Host_add() {
  const [step, setStep] = useState(1);
  const [hostData, setHostData] = useState({
    name: "",
    type: "",
    address: "",
    lat: "",
    long: "",
    description: "",
    images: [],
  });
  const { user } = useAuth();
  const uid = user.id;
  const [position, setPosition] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const newImages = Array.from(files);
      setHostData((prevState) => ({
        ...prevState,
        images: [...prevState.images, ...newImages],
      }));
    } else {
      setHostData({
        ...hostData,
        [name]: value,
      });
    }
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
  
    hostData.images.forEach((image) => {
      formData.append(`images`, image);
    });
  
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/host/create/${uid}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      console.log("Accommodation created successfully:", response.data);
      alert("created successfully");
      navigate("/dashboard/host");
    } catch (error) {
      console.error("Error creating accommodation:", error);
    }
  };

  const handleGetAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.longdo.com/map/services/address?lon=${lng}&lat=${lat}&noelevation=1&key=e7511f741ce6876a9fc6f0a1429dbdae`
      );

      const fetchedAddress = response.data;
      console.log(fetchedAddress);
      const formattedAddress = `${fetchedAddress.country}, ${fetchedAddress.province}, ${fetchedAddress.district}, ${fetchedAddress.subdistrict}, ${fetchedAddress.postcode}`;
      setHostData((prevData) => ({
        ...prevData,
        address: formattedAddress,
        lat,
        long: lng,
      }));
    } catch (error) {
      console.error("Error  address:", error);
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
      <h1>เพิ่มสถานที่พัก</h1>
      <div className={styles.progress}>
        <div
          className={`${styles.step} ${step >= 1 ? styles.active : ""}`}
          data-step="1"
          data-title="ชื่อ"
        ></div>
        <div
          className={`${styles.step} ${step >= 2 ? styles.active : ""}`}
          data-step="2"
          data-title="ที่อยู๋"
        ></div>
        <div
          className={`${styles.step} ${step >= 3 ? styles.active : ""}`}
          data-step="3"
          data-title="คำอธิบาย"
        ></div>
        <div
          className={`${styles.step} ${step >= 4 ? styles.active : ""}`}
          data-step="4"
          data-title="รูปภาพ"
        ></div>
        <div
          className={`${styles.step} ${step >= 5 ? styles.active : ""}`}
          data-step="5"
          data-title="ยืนยันข้อมูล"
        ></div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className={styles.formGroup}>
            <label>ชื่อ</label>
            <input
              type="text"
              name="name"
              value={hostData.name}
              onChange={handleChange}
              required
            />
            <label>ประเภท:</label>
            <select
              name="type"
              value={hostData.type}
              onChange={handleChange}
              required
            >
              <option value="">เลือกประเภท</option>
              {housing_types.housing_types.map((item) => (
                <option key={item.id} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>
        )}

        {step === 2 && (
          <div className={styles.formGroup}>
            <label>ที่อยู่</label>
            <input
              type="text"
              name="address"
              value={hostData.address}
              onChange={handleChange}
              required
              disabled
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
            <label>คำอธิบาย</label>
            <textarea
              name="description"
              value={hostData.description}
              onChange={handleChange}
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
          </div>
        )}

        {step === 5 && <div>ยืนยัน</div>}

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
          {step < 5 && (
            <button
              type="button"
              className={styles.button_next}
              onClick={nextStep}
            >
              ถัดไป
            </button>
          )}
          {step === 5 && (
            <button type="submit" className={styles.button_next}>
              ยืนยัน
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Host_add;
