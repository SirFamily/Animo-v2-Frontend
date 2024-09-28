import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../../component/Modelpopup';
import styles from './Css/featuresedit.module.css';  

function Features_edit({ feature, onClose, refreshFeatures }) {
  const [name, setName] = useState(feature.name);
  const [price, setPrice] = useState(feature.price);
  const [status, setStatus] = useState(feature.status || "");  

  const handleEdit = async () => {
    if (!name || !price || !status) {
      alert("Please make sure all fields are filled.");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/features/update/${feature.id}`, {
        name,
        price,
        status
      });
      refreshFeatures(); 
      onClose();
    } catch (error) {
      console.error("Error editing feature:", error);
    }
  };

  return (
    <Modelpopup>
      <div className={styles.container}>
        <h2 className={styles.title}>แก้ไขบริการเสริม</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className={styles.input}
        />
        <input 
          type="text" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          className={styles.input}
        />
        <select 
          value={status} 
          onChange={(e) => setStatus(e.target.value)} 
          className={styles.select}
        >
          <option value="">เลือกสถานะ</option>
          <option value="ready">พร้อม</option>
          <option value="not ready">ยังไม่พร้อม</option>
        </select>
        <div className={styles.buttonGroup}>
          <button onClick={handleEdit} className={styles.button}>บันทึก</button>
          <button onClick={onClose} className={styles.button}>ปิด</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Features_edit;
