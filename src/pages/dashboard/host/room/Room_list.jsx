import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Css/hostlist.module.css";
import Room_delete from "./Room_delete";

function Room_list({ hostId }) {
  const [rooms, setRooms] = useState([]);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const fetchRooms = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8112/room/list/${hostId}`,
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

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Room</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Type</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Setting</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map((room) => (
              <tr key={room.id}>
                <td>
                  {room.photosRoom && room.photosRoom.length > 0 ? (
                    <img
                      src={room.photosRoom[0].url} // ใช้ URL ของรูปภาพจาก photosRoom
                      alt={room.name}
                      className={styles.image}
                      onError={(e) => {
                        e.target.src = "path_to_default_image"; // ใช้ URL ของรูปภาพเริ่มต้น
                        e.target.onerror = null; // ป้องกัน loop ของ onError
                      }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>{room.name}</td>
                <td>{room.type}</td>
                <td>{room.quantity}</td>
                <td>${room.price}</td>
                <td>
                  <div className={styles.editLink}>Edit</div>
                  <div
                    className={styles.deleteLink}
                    onClick={() => toggleDeletePopup(room)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No rooms available</td>
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
    </div>
  );
}

export default Room_list;
