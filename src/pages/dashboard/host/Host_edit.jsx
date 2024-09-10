import React, { useState, useEffect } from "react";
import Modelpopup from "../../../component/Modelpopup";
import axios from "axios";
import styles from "./Css/hostedit.module.css"; // You can create this CSS module for styling
import housing_types from "../../../component/data/hostingtype.json";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Host_edit({ onClose, host, handleHostUpdate }) {
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
  const [submitting, setSubmitting] = useState(false); // Manage form submit state
  const [position, setPosition] = useState(null); // Store map position

  // Set initial data when host is passed
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

  // Simulate getting an address based on coordinates
  const handleGetAddress = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://api.longdo.com/map/services/address?lon=${lng}&lat=${lat}&noelevation=1&key=e7511f741ce6876a9fc6f0a1429dbdae`
      );
      const fetchedAddress = response.data;
      console.log(fetchedAddress);
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
    setSubmitting(true); // Prevent multiple submissions

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("type", input.type);
    formData.append("address", input.address);
    formData.append("lat", input.lat);
    formData.append("long", input.long);
    formData.append("description", input.description);
    formData.append("publish", input.publish);

    if (imageFile) {
      formData.append("image", imageFile); // Add the image file if selected
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/host/update/${host.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Important for file uploads
          },
        }
      );

      if (response.status === 200) {
        alert("Accommodation updated successfully!");
        handleHostUpdate(); // Call to refresh the list of hosts after the update
        onClose(); // Close the modal popup
      }
    } catch (error) {
      console.error("Error updating accommodation:", error);
      alert("Failed to update accommodation. Please try again.");
    } finally {
      setSubmitting(false); // Re-enable form submission
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
    const map = useMap();

    useEffect(() => {
      // Center the map to the initial position if lat/long is available
      if (position) {
        map.flyTo(position, 14);
      }
    }, [position, map]);

    useMapEvents({
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

  return (
    <Modelpopup>
      <div className={styles.formContainer}>
        <h2>Edit Accommodation</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={input.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Type:</label>
            <select
              name="type"
              value={input.type}
              onChange={handleChange}
              required
              disabled={!input.type}
            >
              <option value="">เลือกประเภท</option>
              {housing_types.housing_types.map((item) => (
                <option key={item.id} value={item.type}>
                  {item.type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label>Address:</label>
            <input
              type="text"
              name="address"
              placeholder="Enter address"
              value={input.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Latitude:</label>
            <input
              type="text"
              name="lat"
              placeholder="Enter latitude"
              value={input.lat}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <div className={styles.formGroup}>
            <label>Longitude:</label>
            <input
              type="text"
              name="long"
              placeholder="Enter longitude"
              value={input.long}
              onChange={handleChange}
              required
              disabled
            />
          </div>

          <MapContainer
            className={styles.mapContainer}
            center={[input.lat || 13, input.long || 100]} // Default center
            zoom={5}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>

          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              name="description"
              placeholder="Enter description"
              value={input.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Publish:</label>
            <input
              type="checkbox"
              name="publish"
              checked={input.publish}
              onChange={handleChange}
            />
          </div>

          {host.photosHost && host.photosHost.length > 0 && (
            <div className={styles.imagePreviewContainer}>
              {host.photosHost.map((photo, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img
                    src={photo.url}
                    alt={`Accommodation ${index + 1}`}
                    width="64"
                    height="64"
                  />
                </div>
              ))}
            </div>
          )}

          <div className={styles.formGroup}>
            <label>Upload Image: *ยังไม่สามารถแก้ไขรูปได้</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          <button
            class={styles.submitButton}
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Saving..." : "Save"}
          </button>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </Modelpopup>
  );
}

export default Host_edit;
