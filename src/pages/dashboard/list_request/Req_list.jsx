import React, { useEffect, useState } from "react";
import styles from "./Css/requests_list.module.css"; 
import axios from "axios";
import { Link } from 'react-router-dom';
import useAuth from "../../../hooks/useAuth";

function Req_list() {
  const {user} = useAuth();
  const [requests, setRequests] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/list/${user.id}`);
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };


    getRequests();
  }, []);

  useEffect(() => {
    const getOwnerRequests = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/list/owner/${user.id}`);
        console.log("Owner Requests Response:", response.data);
        setOwnerRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching owner requests:", error);
      }
    };

    getOwnerRequests();
}, []);


  console.log(ownerRequests)

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>คำขอ</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ชื่อห้อง</th>
            <th>สัตว์เลี้ยง</th>
            <th>เช็คอิน/เช็คเอาท์</th>
            <th>สถานะ</th>
            <th>จำนวนเงินรวม</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((request, index) => {
              const petCount = request.pet_count_bookings?.length || 0;
              const totalAmount = request.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

              return (
                <tr key={index}>
                  <td>{request.room?.name || "-"}</td>
                  <td>{petCount > 0 ? `${petCount}` : "-"}</td>
                  <td>
                    {request.startDate && request.endDate
                      ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`
                      : "-"}
                  </td>
                  <td>{request.bookingStatus || "-"}</td>
                  <td>{totalAmount > 0 ? `$${totalAmount.toFixed(2)}` : "-"}</td>
                  <td>
                  <Link key={request.id} to={`booking/detail/${request.id}`}> 
                    <button className={styles.actionButton}>ดู</button>
                  </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">ไม่มีคำขอใดๆ</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className={styles.title}>คำขอของเจ้าของ</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ชื่อห้อง</th>
            <th>สัตว์เลี้ยง</th>
            <th>เช็คอิน/เช็คเอาท์</th>
            <th>สถานะ</th>
            <th>จำนวนเงินรวม</th>
            <th>รายละเอียด</th>
          </tr>
        </thead>
        <tbody>
          {ownerRequests.length > 0 ? (
            ownerRequests.map((request, index) => {
              const petCount = request.pet_count_bookings?.length || 0;
              const totalAmount = request.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;

              return (
                <tr key={index}>
                  <td>{request.room?.name || "-"}</td>
                  <td>{petCount > 0 ? `${petCount}` : "-"}</td>
                  <td>
                    {request.startDate && request.endDate
                      ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(request.endDate).toLocaleDateString()}`
                      : "-"}
                  </td>
                  <td>{request.bookingStatus || "-"}</td>
                  <td>{totalAmount > 0 ? `$${totalAmount.toFixed(2)}` : "-"}</td>
                  <td>
                  <Link key={request.id} to={`booking/detail/host/${request.id}`}>
                    <button className={styles.actionButton}>ดู</button>
                  </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">ไม่มีคำขอเจ้าของที่มีอยู่</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Req_list;
