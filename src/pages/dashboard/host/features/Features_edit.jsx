import React, { useState } from 'react';
import axios from 'axios';
import Modelpopup from '../../../../component/Modelpopup';
import styles from './Css/featuresedit.module.css';  

function Features_edit({ feature, onClose, refreshFeatures }) {
  const [name, setName] = useState(feature.name);
  const [price, setPrice] = useState(feature.price);
  const [status, setStatus] = useState(feature.status || "");  

  const token = localStorage.getItem("token");  

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
      }, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
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
        <h2 className={styles.title}>Edit Feature</h2>
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
          <option value="">Select Status</option>
          <option value="ready">Ready</option>
          <option value="not ready">Not Ready</option>
        </select>
        <div className={styles.buttonGroup}>
          <button onClick={handleEdit} className={styles.button}>Save</button>
          <button onClick={onClose} className={styles.button}>Close</button>
        </div>
      </div>
    </Modelpopup>
  );
}

export default Features_edit;
