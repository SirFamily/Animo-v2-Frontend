import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/requests_detail.module.css";

function Req_detail() {
  const { reqId } = useParams();
  const [request, setRequest] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequestDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/request/list/${reqId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRequest(response.data.data);
      } catch (error) {
        console.error("Error fetching request detail:", error);
      }
    };

    fetchRequestDetail();
  }, [reqId]);

  if (!request) {
    return <div>Loading...</div>;
  }

  const totalAmount =
    request.payments?.reduce((sum, payment) => sum + payment.amount, 0) || 0;
  const petCount = request.pet_count_bookings?.length || 0;

  return (
    <div className={styles.detailContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        Back
      </button>
      <h2 className={styles.title}>Booking Details</h2>
      <div className={styles.infoBox}>
        <div className={styles.infoRow}>
          <label className={styles.label}>Host Name:</label>
          <span className={styles.value}>{request.host?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Host Address:</label>
          <span className={styles.value}>{request.host?.address || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Name:</label>
          <span className={styles.value}>{request.room?.name || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Type:</label>
          <span className={styles.value}>{request.room?.type || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Price:</label>
          <span className={styles.value}>${request.room?.price || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Pets:</label>
          <span className={styles.value}>
            {petCount > 0 ? `${petCount}` : "-"}
          </span>
        </div>
        {request.pet_count_bookings?.map((petBooking, index) => (
          <div key={index} className={styles.petDetail}>
            <img
              src={petBooking.pet.url}
              alt={petBooking.pet.petName}
              className={styles.petImage}
            />
            <div className={styles.petInfo}>
              <p className={styles.petName}>
                <strong>{petBooking.pet.petName}</strong>
              </p>
              <p className={styles.petSpecies}>
                Species: {petBooking.pet.species}
              </p>
              <p className={styles.petBreed}>Breed: {petBooking.pet.breed}</p>
            </div>
          </div>
        ))}

        <div className={styles.userDetail} />
        <h3 className={styles.subTitle}>Total</h3>

        <div className={styles.infoRow}>
          <label className={styles.label}>Check-in/Check-out:</label>
          <span className={styles.value}>
            {request.startDate && request.endDate
              ? `${new Date(
                  request.startDate
                ).toLocaleDateString()} - ${new Date(
                  request.endDate
                ).toLocaleDateString()}`
              : "-"}
          </span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Room Price:</label>
          <span className={styles.value}>${request.room?.price || "-"}</span>
        </div>
        {request.bookingFeatures?.map((feature, index) => (
          <div key={index} className={styles.infoRow}>
            <span className={styles.label}>
              Feature: <span>{feature.feature.name}</span>
            </span>
            <span className={styles.value}>
              {" "}
              $ {feature.feature.price.toFixed(2)}
            </span>
          </div>
        ))}

        <div className={styles.infoRow}>
          <label className={styles.label}>Status:</label>
          <span className={styles.value}>{request.bookingStatus || "-"}</span>
        </div>
        <div className={styles.infoRow}>
          <label className={styles.label}>Total Amount:</label>
          <span className={styles.value}>${totalAmount.toFixed(2)}</span>
        </div>

        <h3 className={styles.subTitle}>Host Owner Details</h3>
        <div className={styles.userDetail}>
          <img
            src={request.host?.user?.url}
            alt={request.host?.user?.firstName}
            className={styles.userImage}
          />
          <div className={styles.userInfo}>
            <p>
              <strong>Name:</strong> {request.host?.user?.firstName}{" "}
              {request.host?.user?.lastName}
            </p>
            <p>
              <strong>Email:</strong> {request.host?.user?.email}
            </p>
            <p>
              <strong>Phone:</strong> {request.host?.user?.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Req_detail;
