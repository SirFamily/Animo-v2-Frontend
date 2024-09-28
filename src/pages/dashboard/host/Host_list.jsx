import React, { useEffect, useState } from "react";
import styles from "./Css/hostlist.module.css";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Host_delete from "./Host_delete";
import Host_edit from "./Host_edit";

function Host_list({ onUpdate, onHostSelect,handleHostUpdate }) {
  const [hosts, setHosts] = useState([]);
  const { user } = useAuth();
  const uid = user.id;
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedHost, setSelectedHost] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

    const getHosts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/host/list/${uid}`
        );
        const hostsData = response.data.data;
        setHosts(hostsData); 
        onUpdate(hostsData); 
      } catch (error) {
        console.error("Error hosts:", error);
      }
    };


  useEffect(() => {
    getHosts();
  }, [uid]);

  const toggleDeletePopup = (id) => {
    setSelectedHost(id);
    setDeletePopupOpen(!isDeletePopupOpen);
  };

  const toggleEditPopup = (pet) => {
    setSelectedHost(pet);
    setPopupOpen(!isPopupOpen);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ที่พัก</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>รูป</th>
            <th>ชื่อ</th>
            <th>ประเภทที่พัก</th>
            <th>รายละเอียด</th>
            <th>ที่ตั้ง</th>
            <th>สร้างวันที่</th>
            <th>ตั้งค่า</th>
          </tr>
        </thead>
        <tbody>
          {hosts && hosts.length > 0 ? (
            hosts.map((host, index) => (
              <tr key={index} onClick={() => onHostSelect(host.id)}>
                <td>
                  {host.photosHost && host.photosHost.length > 0 ? (
                    <img src={host.photosHost[0].url} alt={host.name} />
                  ) : (
                    <img src="default_image_path" alt={host.name} />
                  )}
                </td>
                <td>{host.name}</td>
                <td>{host.type}</td>
                <td>{host.description}</td>
                <td>{host.address}</td>
                <td>{new Date(host.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className={styles.editLink} onClick={() => toggleEditPopup(hosts)}>แก้ไข</div>
                  <div className={styles.deleteLink} onClick={() => toggleDeletePopup(host.id)}>ลบ</div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">ไม่มีที่พักที่พร้อมใช้งาน</td>
            </tr>
          )}
        </tbody>
      </table>
      {isPopupOpen && <Host_edit onClose={toggleEditPopup} host={selectedHost[0]} handleHostUpdate={getHosts} />}
      {isDeletePopupOpen && (
        <Host_delete onClose={toggleDeletePopup} selectedHost={selectedHost} handleHostUpdate={handleHostUpdate} handleHostUpdateData={getHosts}/>
      )}
    </div>
  );
}

export default Host_list;
