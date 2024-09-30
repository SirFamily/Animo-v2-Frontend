import React, { useEffect, useState } from "react";
import Select from "react-select";
import styles from "./Css/hostview.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import useAuth from "../../../hooks/useAuth";

function Host_view() {
  const { hostId } = useParams();
  const { user } = useAuth();
  const [host, setHost] = useState(null);
  const [pets, setPets] = useState([]);
  const uid = user.id;
  const [position, setPosition] = useState(null);
  const [input, setInput] = useState({
    lat: null,
    long: null,
    room: "",
    pets: [],
    checkin: "",
    checkout: "",
  });

  const [price, setPrice] = useState({
    extraServiceFee: 0.7,
    additionalPetCharge: 50,
  });

  const [selectedFeatures, setSelectedFeatures] = useState([]);

  useEffect(() => {
    const getHostData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pre/host/get/${hostId}`
        );

        const hostData = response.data.data;
        setHost(hostData);
        if (hostData.lat && hostData.long) {
          const position = {
            lat: parseFloat(hostData.lat),
            lng: parseFloat(hostData.long),
          };
          setPosition(position);
          setInput((prev) => ({
            ...prev,
            lat: hostData.lat,
            long: hostData.long,
          }));
        }
      } catch (err) {
        console.error("Error host data", err.message);
      }
    };

    getHostData();
  }, [hostId]);

  useEffect(() => {
    const getPetsData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pets/find/${user.id}`
        );

        setPets(response.data.pet);
      } catch (err) {
        console.error("Error pets data", err.message);
      }
    };

    getPetsData();
  }, [hostId]);

  const handleFeatureChange = (featureId, isChecked) => {
    setSelectedFeatures((prevSelected) =>
      isChecked
        ? [...prevSelected, featureId]
        : prevSelected.filter((id) => id !== featureId)
    );
  };

  const handleBooking = async () => {
    const petsData = input.pets.map((pet) => ({
      petId: pet.value,
    }));

    const bookingData = {
      hostId: hostId,
      roomId: host.rooms.find((r) => r.name === input.room)?.id,
      userId: uid,
      startDate: input.checkin,
      endDate: input.checkout,
      pets: petsData,
      features: selectedFeatures,
      paymentAmount: calculateTotalPrice(),
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking/create`,
        bookingData
      );
      console.log("Booking successful:", response.data);
      alert("Booking created successfully!");
    } catch (error) {
      console.error("Booking failed:", error);
      alert("Booking failed. Please try again.");
    }
  };

  const calculateTotalPrice = () => {
    const { checkin, checkout, pets, room } = input;
    const { extraServiceFee, additionalPetCharge } = price;

    if (!checkin || !checkout || !room) return 0;

    const selectedRoom = host.rooms.find((r) => r.name === room);
    if (!selectedRoom) return 0;

    const roomPrice = selectedRoom.price;

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = Math.abs(checkoutDate - checkinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalPrice = roomPrice * diffDays;

    totalPrice += pets.length * diffDays;

    if (pets.length > 1) {
      totalPrice += (pets.length - 1) * additionalPetCharge;
    }

    selectedFeatures.forEach((featureId) => {
      const feature = host.features.find((f) => f.id === featureId);
      if (feature) totalPrice += feature.price;
    });

    totalPrice += extraServiceFee;

    return parseFloat(totalPrice.toFixed(2));
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
      if (position) {
        map.flyTo(position, 14);
      }
    }, [position, map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>📍 {host?.address}</Popup>
      </Marker>
    );
  };

  if (!host) return <div>No Host Data Available</div>;

  const petOptions = pets.map((pet) => ({
    value: pet.id,
    label: pet.petName,
  }));

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
            <p className={styles.hostLocation}>📍 {host.address}</p>
            <div className={styles.hostContainer}>
              <img src={host.user.url} alt="" className={styles.hostImage} />
              <p className={styles.hostType}>
                เจ้าของโดย {host.user.firstName} {host.user.lastName}
              </p>
            </div>
            <p className={styles.hostType}>🏠 {host.type}</p>
            <p className={styles.description}>{host.description}</p>
          </div>

          <div className={styles.rooms}>
            <h3>ห้องว่าง</h3>
            <div className={styles.roomScrollContainer}>
              <div className={styles.roomGrid}>
                {host.rooms.map((room) => (
                  <div key={room.id} className={styles.roomCard}>
                    <img
                      src={
                        room.photosRoom.length > 0 ? room.photosRoom[0].url : ""
                      }
                      alt={room.name}
                    />
                    <div className={styles.roomDetails}>
                      <h4>{room.name}</h4>
                      <p>ประเภทห้อง: {room.type}</p>
                      <p>ราคา: 💵 {room.price}฿</p>
                      <p>
                        สัตว์เลี้ยงที่รองรับ:{" "}
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
            <h3>สถานที่ตั้ง</h3>
            <MapContainer
              className={styles.mapContainer}
              center={position || [13, 100]}
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
        </div>
      </div>

      <div className={styles.container_box_section2}>
        <div className={styles.booking_box}>
          <div className="booking-info">
            <div>
              <label>Check-in</label>
              <input
                type="date"
                value={input.checkin}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, checkin: e.target.value }))
                }
              />
            </div>
            <div>
              <label>Check-out</label>
              <input
                type="date"
                value={input.checkout}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, checkout: e.target.value }))
                }
              />
            </div>
            <div>
              <label>Room</label>
              <select
                value={input.room}
                onChange={(e) =>
                  setInput((prev) => ({ ...prev, room: e.target.value }))
                }
              >
                <option value="">เลือกห้อง</option>
                {host.rooms.map((room) => (
                  <option key={room.id} value={room.name}>
                    ห้อง : {room.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label>Pets</label>

              <Select
                isMulti
                value={input.pets}
                onChange={(selectedPets) =>
                  setInput((prev) => ({
                    ...prev,
                    pets: selectedPets,
                  }))
                }
                options={petOptions}
              />
            </div>

            <div className={styles.extraFeatures}>
              <label>Extra Features</label>
              {host.features.map((feature) => (
                <div className={styles.checkboxContainer} key={feature.id}>
                  <input
                    type="checkbox"
                    id={feature.id}
                    value={feature.id}
                    onChange={(e) =>
                      handleFeatureChange(feature.id, e.target.checked)
                    }
                  />
                  <label htmlFor={feature.id}>
                    {feature.name} - ฿{feature.price}
                  </label>
                </div>
              ))}
            </div>

            <div className="price">
              <p>
                ราคาต่อคืน: ฿
                {input.room
                  ? host.rooms.find((r) => r.name === input.room)?.price
                  : "0"}
              </p>
              <p>ค่าบริการ: ฿{price.extraServiceFee}</p>
              {input.pets.length > 1 && (
                <p>
                  ค่าธรรมเนียมสัตว์เลี้ยงเพิ่มเติม (เริ่มจากสัตว์เลี้ยงตัวที่
                  2): ฿{(input.pets.length - 1) * price.additionalPetCharge}
                </p>
              )}
            </div>

            <div className="total-price">
              <strong>จำนวนเงินที่ต้องชำระ: ฿{calculateTotalPrice()}</strong>
            </div>
            <div className="reserve-button">
              <button onClick={handleBooking}>จอง</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Host_view;
