import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/history_detail.module.css";
import useAuth from "../../../hooks/useAuth";

function History_detail() {
  const { reqId } = useParams();
  const { user } = useAuth();
  const [history, setHistory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistoryDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/history/detail/history/${reqId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistory(response.data.data);
      } catch (error) {
        console.error("Error fetching history detail:", error);
      }
    };

    fetchHistoryDetail();
  }, [reqId]);

  if (!history) {
    return <div>Loading...</div>;
  }

  console.log(user.id === history.userId)

  const totalAmount = history.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const petCount = history.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>Back</button>
      <h2 className={styles.title}>Booking History Details</h2>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Name:</label>
          <span className={styles.value}>{history.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Type:</label>
          <span className={styles.value}>{history.room?.type || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Price:</label>
          <span className={styles.value}>${history.room?.price || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Pets:</label>
          <span className={styles.value}>{petCount > 0 ? petCount : "-"}</span>
        </div>
        {history.pet_count_bookings?.map((petBooking, index) => (
          <div key={index} className={styles.petDetail}>
            <img src={petBooking.pet.url} alt={petBooking.pet.petName} className={styles.petImage} />
            <div className={styles.petInfo}>
              <p className={styles.petName}><strong>{petBooking.pet.petName}</strong></p>
              <p className={styles.petSpecies}>Species: {petBooking.pet.species}</p>
              <p className={styles.petBreed}>Breed: {petBooking.pet.breed}</p>
            </div>
          </div>
        ))}
        <div className={styles.infoRow}>
          <label className={styles.label}>Check-in/Check-out:</label>
          <span className={styles.value}>
            {history.startDate && history.endDate
              ? `${new Date(history.startDate).toLocaleDateString()} - ${new Date(history.endDate).toLocaleDateString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Status:</label>
          <span className={styles.value}>{history.bookingStatus || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Total Amount:</label>
          <span className={styles.value}>${totalAmount.toFixed(2)}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Payment Status:</label>
          <span className={styles.value}>
            {history.payments[0]?.status || "-"}
          </span>
        </div>

        {user.id === history.userId && (
          <>
            <div className={styles.infoRow}>
              <label className={styles.label}>Host Name:</label>
              <span className={styles.value}>{history.host?.name || "-"}</span>
            </div>
            <div className={styles.infoRow}>
              <label className={styles.label}>Host Address:</label>
              <span className={styles.value}>{history.host?.address || "-"}</span>
            </div>
            <h3 className={styles.subTitle}>Host Owner Details</h3>
            <div className={styles.userDetail}>
              <img src={history.host?.user?.url} alt={history.host?.user?.firstName} className={styles.userImage} />
              <div className={styles.userInfo}>
                <p><strong>Name:</strong> {history.host?.user?.firstName} {history.host?.user?.lastName}</p>
                <p><strong>Email:</strong> {history.host?.user?.email}</p>
                <p><strong>Phone:</strong> {history.host?.user?.phone}</p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default History_detail;
