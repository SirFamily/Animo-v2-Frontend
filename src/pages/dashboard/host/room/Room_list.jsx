import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Css/hostlist.module.css";
import Room_delete from "./Room_delete";
import Room_edit from "./Room_edit";
function Room_list({ hostId }) {
  const [rooms, setRooms] = useState([]);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/room/list/${hostId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRooms(response.data.data || []);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    if (!hostId) return;
    fetchRooms();
  }, [hostId]);

  const toggleDeletePopup = (room) => {
    setSelectedRoom(room);
    setDeletePopupOpen(!isDeletePopupOpen);
  };

  const toggleEditPopup = (room) => {
    setSelectedRoom(room);
    setPopupOpen(!isPopupOpen);
  };
console.log(rooms)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ห้องพัก</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>รูป</th>
            <th>ชื่อ</th>
            <th>ประเภท</th>
            <th>รองรับสัตว์เลี้ยง</th>
            <th>ราคา</th>
            <th>ตั้งค่า</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <tr key={room.id}>
                <td>
                  {room.photosRoom && room.photosRoom.length > 0 ? (
                    <img
                      src={room.photosRoom[0].url} 
                      alt={room.name}
                      className={styles.image}
                      onError={(e) => {
                        e.target.src = "path_to_default_image"; 
                        e.target.onerror = null; 
                      }}
                    />
                  ) : (
                    <span>ไม่มีรูปภาพ</span>
                  )}
                </td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.quantity}</td>
                <td>${room.price}</td>
                <td>
                  <div
                    className={styles.editLink}
                    onClick={() => toggleEditPopup(room)}
                  >
                    แก้ไข
                  </div>
                  <div
                    className={styles.deleteLink}
                    onClick={() => toggleDeletePopup(room)}
                  >
                    ลบ
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">ไม่มีห้องที่พร้อมใช้งาน</td>
            </tr>
          )}
        </tbody>
      </table>
      {isDeletePopupOpen && (
        <Room_delete
          handleRoomUpdate={fetchRooms}
          selectedRoom={selectedRoom}
          onClose={toggleDeletePopup}
        />
      )}
      {isPopupOpen && (
        <Room_edit
          handleRoomUpdate={fetchRooms}
          room={selectedRoom}
          onClose={toggleEditPopup}
        />
      )}
    </div>
  );
}

export default Room_list;
