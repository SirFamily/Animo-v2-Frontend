import React, { useEffect, useState } from "react";
import styles from "./Css/requests_list.module.css"; 
import axios from "axios";
import { Link } from 'react-router-dom';

function Req_list() {
  const [requests, setRequests] = useState([]);
  const [ownerRequests, setOwnerRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/list`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };


    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchOwnerRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/request/list/owner`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Owner Requests Response:", response.data);
        setOwnerRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching owner requests:", error);
      }
    };

    fetchOwnerRequests();
}, []);


  console.log(ownerRequests)

  return (
    <div className={styles.tableContainer}>
      <h1 className={styles.title}>Request</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Pets</th>
            <th>Check-in/out</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Detail</th>
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
                    <button className={styles.actionButton}>View</button>
                  </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No requests available</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2 className={styles.title}>Owner Requests</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Pets</th>
            <th>Check-in/out</th>
            <th>Status</th>
            <th>Total Amount</th>
            <th>Detail</th>
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
                    <button className={styles.actionButton}>View</button>
                  </Link>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No owner requests available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Req_list;
