import React, { useState, useEffect } from "react";
import Modelpopup from "../../../component/Modelpopup";
import axios from "axios";
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
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import styles from "./Css/hostedit.module.css"; // Import CSS module

function Host_edit({ onClose, host, handleHostUpdate }) {
  const [step, setStep] = useState(1);
  const [input, setInput] = useState({
    name: "",
    type: "",
    address: "",
    lat: "",
    long: "",
    description: "",
    publish: false,
  });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    setInput({
      name: host.name || "",
      type: host.type || "",
      address: host.address || "",
      lat: host.lat || "",
      long: host.long || "",
      description: host.description || "",
      publish: host.publish || false,
    });

    if (host.lat && host.long) {
      setPosition({ lat: host.lat, lng: host.long });
    }
  }, [host]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInput({
      ...input,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleGetAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.longdo.com/map/services/address?lon=${lng}&lat=${lat}&noelevation=1&key=e7511f741ce6876a9fc6f0a1429dbdae`
      );
      const fetchedAddress = response.data;
      const formattedAddress = `${fetchedAddress.country}, ${fetchedAddress.province}, ${fetchedAddress.district}, ${fetchedAddress.subdistrict}, ${fetchedAddress.postcode}`;
      setInput((prev) => ({
        ...prev,
        address: formattedAddress,
        lat,
        long: lng,
      }));
    } catch (error) {
      console.error("Failed to get address:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("type", input.type);
    formData.append("address", input.address);
    formData.append("lat", input.lat);
    formData.append("long", input.long);
    formData.append("description", input.description);
    formData.append("publish", input.publish);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/host/update/${host.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Accommodation updated successfully!");
        handleHostUpdate();
        onClose();
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
      alert("Failed to update accommodation. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Map icon setup
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
        const newLatLng = e.latlng;
        map.flyTo(newLatLng, 14);
        setPosition(newLatLng);
        await handleGetAddress(newLatLng.lat, newLatLng.lng);
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

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  const togglePublish = () => {
    setInput((prev) => ({ ...prev, publish: !prev.publish }));
  };

  return (
    <Modelpopup>
      <div className={styles.container}>
        <h2 className={styles.title}>แก้ไขที่พัก</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>ชื่อ:</label>
              <input
                type="text"
                name="name"
                className={styles.formInput}
                placeholder="Enter name"
                value={input.name}
                onChange={handleChange}
                required
              />
              <label className={styles.formLabel}>ประเภท:</label>
              <select
                name="type"
                className={styles.formSelect}
                value={input.type}
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
              <div className={styles.formGroup}>
            <label className={styles.formLabel}>สถานะ</label>
            <button
            type="button"
            onClick={togglePublish}
            className={
              input.publish ?  styles.buttonPublish : styles.buttonUnpublish 
            }
          >
            {input.publish ? "เผยแพร่" : "ยกเลิกการเผยแพร่"}
          </button>
          </div>
            </div>
          )}

          {step === 2 && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>ที่อยู่:</label>
              <input
                type="text"
                name="address"
                className={styles.formInput}
                value={input.address}
                onChange={handleChange}
                required
                disabled
              />
              <div className={styles.mapContainer}>
                <MapContainer
                  center={[input.lat || 13, input.long || 100]}
                  zoom={5}
                  scrollWheelZoom={true}
                  style={{ height: "400px", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationMarker />
                </MapContainer>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>คำอธิบาย:</label>
              <textarea
                name="description"
                className={styles.formTextarea}
                placeholder="Enter description"
                value={input.description}
                onChange={handleChange}
                required
              />
            </div>
          )}

          {step === 4 && (
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                รูปภาพ: *ยังไม่สามารถแก้ไขรูปได้
              </label>
              <input type="file" onChange={handleFileChange} />
              {host.photosHost && host.photosHost.length > 0 && (
                <div className={styles.imagePreview}>
                  {host.photosHost.map((photo, index) => (
                    <div key={index}>
                      <img
                        src={photo.url}
                        alt={`Accommodation ${index + 1}`}
                        style={{ width: "64px", height: "64px" }}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className={styles.buttonGroup}>
            {step === 1 && (
              <button
                type="button"
                onClick={onClose}
                className={styles.button_back}
              >
                ปิด
              </button>
            )}
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className={styles.button}
              >
                ก่อนหน้า
              </button>
            )}
            {step < 4 && (
              <button
                type="button"
                onClick={nextStep}
                className={styles.button}
              >
                ถัดไป
              </button>
            )}
            {step === 4 && (
              <button
                type="submit"
                disabled={submitting}
                className={styles.button}
              >
                {submitting ? "กำลังบันทึก..." : "ยืนยัน"}
              </button>
            )}
          </div>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Host_edit;
