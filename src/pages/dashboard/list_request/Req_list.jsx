import React, { useEffect, useState } from 'react';
import styles from './Css/Req_list.module.css'; // Import CSS Module
import axios from 'axios';

function Req_list() {
  // สร้าง state สำหรับจัดการข้อมูลที่ได้จาก API
  const [requests, setRequests] = useState([]);

  // ใช้ useEffect เพื่อดึงข้อมูลเมื่อ component โหลดเสร็จ
  useEffect(() => {
    // ฟังก์ชัน async เพื่อดึงข้อมูลจาก API
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/${bookingId}`); // ระบุ endpoint ที่ต้องการดึงข้อมูล
        console.log('API Response:', response.data); // แสดงข้อมูลใน console

        // สมมติว่า response.data มีข้อมูลในรูปแบบที่ตรงกับตาราง
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching request data:', error);
      }
    };

    fetchRequests(); // เรียกใช้งานฟังก์ชันเมื่อ component โหลด
  }, []); // [] เพื่อให้ทำงานครั้งเดียวตอนโหลด

  return (
    <div className={styles.tableContainer}>
      {/* <h1 className={styles.title}>Request</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Booking type</th>
            <th>Room</th>
            <th>Pets</th>
            <th>Check-in/out</th>
            <th>Status</th>
            <th>Total amount</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => (
              <tr key={index}>
                <td>{request.bookingType ? request.bookingType : '-'}</td>
                <td>{request.room ? request.room : '-'}</td>
                <td>{request.pets ? request.pets : '-'}</td>
                <td>{request.checkInOut ? request.checkInOut : '-'}</td>
                <td>{request.status ? request.status : '-'}</td>
                <td>{request.totalAmount ? request.totalAmount : '-'}</td>
                <td>
                  <button className={styles.actionButton}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No requests available</td>
            </tr>
          )}
        </tbody>
      </table> */}
    </div>
  );
}

export default Req_list;
