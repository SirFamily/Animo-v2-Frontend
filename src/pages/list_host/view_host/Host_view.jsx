import React, { useEffect, useState } from 'react';
import styles from './Css/hostview.module.css';
import { useParams } from "react-router-dom";
import axios from 'axios';

function Host_view() {
    const { hostId } = useParams(); // ดึง hostId จากพารามิเตอร์ใน URL
  const [host, setHost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // ยิง API เพื่อดึงข้อมูล host
    const fetchHostData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pre/host/list/${hostId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

        setHost(response.data.data);
        setLoading(false);
        console.log(response.data.data)
      } catch (err) {
        console.log(host)
        setError(err.message);
        setLoading(false);
        
      }
    };

    fetchHostData();
  }, [hostId]); // วิ่งครั้งเดียวเมื่อ hostId เปลี่ยน

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className={styles.container}>
      Main Image and Gallery
      <div className={styles.gallery}>
        <div className={styles.mainImage}>
          <img src={host.photosHost[0].url} alt={host.name} />
        </div>
        <div className={styles.imageGrid}>
          {host.photosHost.slice(1).map((photo, index) => (
            <img key={index} src={photo.url} alt={`Host image ${index}`} />
          ))}
        </div>
      </div>

      {/* Host Details */}
      <div className={styles.details}>
        <h2 className={styles.hostName}>{host.name}</h2>
        <p className={styles.hostLocation}>📍 {host.address.split(', ')[1]}</p>
        <p className={styles.hostType}>🏠 {host.type}</p>
        <p className={styles.description}>{host.description}</p>
      </div>

      {/* Rooms Section */}
      <div className={styles.rooms}>
        <h3>Available Rooms</h3>
        <div className={styles.roomGrid}>
          {host.rooms.map((room) => (
            <div key={room.id} className={styles.roomCard}>
              <img
                src={room.photosRoom.length > 0 ? room.photosRoom[0].url : 'https://via.placeholder.com/200'}
                alt={room.name}
              />
              <div className={styles.roomDetails}>
                <h4>{room.name}</h4>
                <p>Type: {room.type}</p>
                <p>Price: 💵 {room.price}$</p>
                <p>Supports Pets: {room.supportPets.map((pet) => pet.name).join(', ') || 'N/A'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Map */}
      <div className={styles.map}>
        <h3>Location</h3>
        <iframe
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${host.lat},${host.long}`}
          width="600"
          height="450"
          allowFullScreen=""
          loading="lazy"
          title="Host Location"
        ></iframe>
      </div>

      {/* Reviews Section */}
      <div className={styles.reviews}>
        <h3>Reviews</h3>
        <div className={styles.reviewCard}>
          {/* Placeholder review data */}
          <div className={styles.review}>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text...</p>
            <div className={styles.reviewRating}>⭐ 4.6 / 5</div>
            <div className={styles.reviewUser}>Posted by joe21312</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Host_view;
