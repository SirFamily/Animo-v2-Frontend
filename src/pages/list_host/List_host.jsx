import React, { useEffect, useState } from 'react';
import styles from './Css/list_host.module.css';
import axios from 'axios';

function ListHost() {
  const [hosts, setHosts] = useState([]);

  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pre/host/list/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setHosts(response.data.data); // Access the 'data' array from the response
        console.log(response)
      } catch (error) {
        console.error("Error fetching host data:", error);
      }
    };

    fetchHosts();
  }, []);

  return (
    <div className={styles.container}>
      {/* Filter Section */}
      <div className={styles.filterSection}>
        {/* Search Bar */}
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Find Province"
            className={styles.searchInput}
          />
          <input
            type="text"
            placeholder="Find Name"
            className={styles.searchInput}
          />
        </div>

        {/* Date and Filters */}
        <div className={styles.filterTags}>
          <div className={styles.filterTag}>Sat, Nov 10 - Fri, Nov 24</div>
          <div className={styles.filterTag}>Home</div>
          <div className={styles.filterTag}>Room - 2</div>
          <div className={styles.filterTag}>Cat - Dog - Snake</div>
          <div className={styles.filterTag}>Pets - 3</div>
          <div>ยังไม่สามารถใช้งานได้</div>
        </div>
      </div>

      {/* Card Grid */}
      <div className={styles.cardGrid}>
        {hosts.length === 0 ? (
          <p>No hosts available</p>
        ) : (
          hosts.map((host) => (
            <div key={host.id} className={styles.card}>
              <img
                src={host.photosHost[1]?.url || 'https://via.placeholder.com/200'}
                alt={host.name}
                className={styles.cardImage}
              />
              <div className={styles.cardTitle}>{host.name}</div>
              <div className={styles.cardLocation}>
                <span>📍 {host.address.split(', ')[1]}</span>
                <span>🏠 {host.type}</span>
              </div>
              <div className={styles.cardPrice}>
                {host.rooms.length > 0
                  ? `💵 ${host.rooms[0].price}–${Math.max(...host.rooms.map(room => room.price))}$`
                  : 'N/A'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ListHost;
