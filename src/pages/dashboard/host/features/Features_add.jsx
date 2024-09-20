import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../../component/Modelpopup';
import styles from './Css/featuresedit.module.css';  // Import CSS Module

function Features_add({ onClose, refreshFeatures }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('ready');
  const token = localStorage.getItem("token");

  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/features/create`, {
        name,
        price,
        status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      refreshFeatures();
      onClose();
    } catch (error) {
      console.error("Error adding feature:", error);
    }
  };

  return (
    <Modelpopup>
      <div className={styles.container}>
        <h2 className={styles.title}>Add Feature</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={styles.select}
        >
          <option value="ready">Ready</option>
          <option value="not ready">Not Ready</option>
        </select>
        <div className={styles.buttonGroup}>
          <button onClick={handleAdd} className={styles.button}>Add</button>
          <button onClick={onClose} className={styles.button}>Close</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Features_add;
