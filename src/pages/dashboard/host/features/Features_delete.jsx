import React from 'react';
import axios from 'axios';
import Modelpopup from '../../../../component/Modelpopup';
import styles from './Css/featuresdel.module.css';  // Import CSS Module

function Features_delete({ feature, onClose, refreshFeatures }) {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/features/delete/${feature.id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      refreshFeatures();
      onClose();
    } catch (error) {
      console.error("Error deleting feature:", error);
    }
  };

  return (
    <Modelpopup>
      <div className={styles.popup}>
        <h2 className={styles.header}>ลบบริการเสริม</h2>
        <p className={styles.message}>
        คุณแน่ใจว่าต้องการลบบริการเสริมนี้หรือไม่ "{feature.name}"?
        </p>
        <div className={styles.buttonGroup}>
          <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
            ลบ
          </button>
          <button onClick={onClose} className={`${styles.button} ${styles.cancelButton}`}>
            ปิด
          </button>
        </div>
      </div>
      </Modelpopup>
  );
}

export default Features_delete;
