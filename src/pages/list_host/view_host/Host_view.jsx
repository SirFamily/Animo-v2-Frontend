import React, { useEffect, useState } from "react";
import styles from "./Css/hostview.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

function Host_view() {
  const { hostId } = useParams(); // Get hostId from URL parameters
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [position, setPosition] = useState(null); // Store map position
  const [input, setInput] = useState({ lat: null, long: null, address: "" }); // To manage lat, long, and address

  useEffect(() => {
    // Fetch host data
    const fetchHostData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pre/host/list/${hostId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const hostData = response.data.data;
        setHost(hostData);
        setLoading(false);

        // Set position if lat/long exists in the host data
        if (hostData.lat && hostData.long) {
          setPosition({ lat: hostData.lat, lng: hostData.long });
          setInput((prev) => ({
            ...prev,
            lat: hostData.lat,
            long: hostData.long,
          }));
        }
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchHostData();
  }, [hostId]);

  // Leaflet default marker icon
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

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          {position.lat}, {position.lng}
        </Popup>
      </Marker>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!host) return <div>No Host Data Available</div>; // Add this fallback to prevent null reference

  return (
    <div className={styles.container}>
      <div className={styles.container_box_section1}>
        <div className={styles.row2_sectiopn1}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={host.photosHost[0]?.url || ""} alt={host.name} />
            </div>
            <div className={styles.fix_col}>
              <div className={styles.imageGrid}>
                <img src={host.photosHost[1]?.url || ""} alt="Host image" />
              </div>
              <div className={styles.imageGrid}>
                <img src={host.photosHost[2]?.url || ""} alt="Host image" />
              </div>
              <div className={styles.imageGrid}>
                <img src={host.photosHost[3]?.url || ""} alt="Host image" />
              </div>
            </div>
          </div>

          <div className={styles.details}>
            <h2 className={styles.hostName}>{host.name}</h2>
            <p className={styles.hostLocation}>
              📍 {host.address.split(", ")[1]}
            </p>
            <p className={styles.hostType}>🏠 {host.type}</p>
            <p className={styles.description}>{host.description}</p>
          </div>

          <div className={styles.rooms}>
            <h3>Available Rooms</h3>
            <div className={styles.roomScrollContainer}>
              <div className={styles.roomGrid}>
                {host.rooms.map((room) => (
                  <div key={room.id} className={styles.roomCard}>
                    <img
                      src={
                        room.photosRoom.length > 0
                          ? room.photosRoom[0].url
                          : "https://via.placeholder.com/200"
                      }
                      alt={room.name}
                    />
                    <div className={styles.roomDetails}>
                      <h4>{room.name}</h4>
                      <p>Type: {room.type}</p>
                      <p>Price: 💵 {room.price}$</p>
                      <p>
                        Supports Pets:{" "}
                        {room.supportPets.map((pet) => pet.name).join(", ") ||
                          "N/A"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.map}>
            <h3>Location</h3>
            <MapContainer
              className={styles.mapContainer}
              center={[input.lat || 13, input.long || 100]} // Default center
              zoom={5}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker />
            </MapContainer>
          </div>

          <div className={styles.reviews}>
            <h3>Reviews</h3>
            <div className={styles.reviewCard}>
              <div className={styles.review}>
                <p>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text...
                </p>
                <div className={styles.reviewRating}>⭐ 4.6 / 5</div>
                <div className={styles.reviewUser}>Posted by joe21312</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.container_box_section2}>
          <div className={styles.booking_box}>
          <div className="booking-info">
            <div>
              <label>Check-in</label>
              <input type="text" value="Oct 7, 2024" disabled />
            </div>
            <div>
              <label>Check-out</label>
              <input type="text" value="Oct 24, 2024" disabled />
            </div>
            <div>
              <label>Room</label>
              <select>
                <option>Room 1</option>
                <option>Room 2</option>
              </select>
            </div>
            <div>
              <label>Pets</label>
              <select>
                <option>Dog, Cat</option>
              </select>
            </div>
            <div className="extra-features">
              <label>Extra Features</label>
              <div>
                <input type="checkbox" id="extra1" />
                <label htmlFor="extra1">Test01</label>
              </div>
              <div>
                <input type="checkbox" id="extra2" />
                <label htmlFor="extra2">Test01</label>
              </div>
              <div>
                <input type="checkbox" id="extra3" />
                <label htmlFor="extra3">Test01</label>
              </div>
            </div>
            <div className="price">
              <p>1 Night: $120</p>
              <p>Food per day per pet: $10</p>
              <p>Service fee: $0.7</p>
            </div>
            <div className="total-price">
              <p>Total Payment: $130.7</p>
            </div>
            <button>Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Host_view;
