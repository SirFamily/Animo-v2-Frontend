import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../../component/Modelpopup';
import styles from './Css/featuresedit.module.css';  // Import CSS Module

function Features_add({hostId, onClose, refreshFeatures }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleAdd = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/features/create/${hostId}`, {
        name,
        price,
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
        <h2 className={styles.title}>เพิ่มบริการเสริม</h2>
        <input
          type="text"
          placeholder="ชื่อบริการเสริม"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="ราคา"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={styles.input}
        />
        <div className={styles.buttonGroup}>
          <button onClick={handleAdd} className={styles.button}>เพิ่ม</button>
          <button onClick={onClose} className={styles.button}>ปิด</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Features_add;
