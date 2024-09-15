import React, { useEffect, useState } from "react";
import Select from "react-select"; // import Select from react-select
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    petFoodPerDay: 10,
    extraServiceFee: 0.7,
    additionalPetCharge: 50,
  });

  useEffect(() => {
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
        console.log(host);
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

  useEffect(() => {
    // Fetch pets data
    const fetchPetsData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/pets/find`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setPets(response.data.pet);
        console.log(pets);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPetsData();
  }, [hostId]);

  const handleBooking = async () => {
    const token = localStorage.getItem("token");
  
    // Prepare pets data for the API
    const petsData = input.pets.map((pet) => ({
      petId: pet.value, // Assuming value is the pet ID from react-select options
      count: 1, // Assuming each pet has count 1; modify if needed
    }));
  
    const bookingData = {
      hostId: hostId, // From useParams
      roomId: host.rooms.find((r) => r.name === input.room)?.id, // Get room ID based on the selected room name
      userId: uid, // Replace with actual user ID (retrieve from context or other source)
      startDate: input.checkin,
      endDate: input.checkout,
      pets: petsData,
      paymentAmount: calculateTotalPrice(), // Use the calculated price
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/booking/create`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
    const { petFoodPerDay, extraServiceFee, additionalPetCharge } = price;

    if (!checkin || !checkout || !room) return 0;

    const selectedRoom = host.rooms.find((r) => r.name === room);
    if (!selectedRoom) return 0;

    const roomPrice = selectedRoom.price;

    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = Math.abs(checkoutDate - checkinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let totalPrice = roomPrice * diffDays;

    totalPrice += pets.length * petFoodPerDay * diffDays;

    if (pets.length > 1) {
      totalPrice += (pets.length - 1) * additionalPetCharge;
    }

    totalPrice += extraServiceFee;

    return totalPrice;
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
        <Popup>📍 {host.address}</Popup>
      </Marker>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
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
                Host By {host.user.firstName}
                {host.user.lastName}
              </p>
            </div>
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
                        room.photosRoom.length > 0 ? room.photosRoom[0].url : ""
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
              center={[input.lat || 13, input.long || 100]}
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
              <label>Extra Features *ยังใช้งานไม่ได้</label>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="extra1" />
                <label htmlFor="extra1">Test01</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="extra2" />
                <label htmlFor="extra2">Test01</label>
              </div>
              <div className={styles.checkboxContainer}>
                <input type="checkbox" id="extra3" />
                <label htmlFor="extra3">Test01</label>
              </div>
            </div>
            <div className="price">
              <p>
                One Night: $
                {input.room
                  ? host.rooms.find((r) => r.name === input.room)?.price
                  : "0"}
              </p>
              <p>Food per day per pet: ${price.petFoodPerDay}</p>
              <p>Service fee: ${price.extraServiceFee}</p>
              {input.pets.length > 1 && (
                <p>
                  Extra pet charge (starting from 2nd pet): $
                  {(input.pets.length - 1) * price.additionalPetCharge}
                </p>
              )}
            </div>

            <div className="total-price">
              <p>Total Payment: ${calculateTotalPrice()}</p>
            </div>
            <div className="reserve-button">
            <button onClick={handleBooking}>Reserve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Host_view;
