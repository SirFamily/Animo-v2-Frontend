import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./Css/req_detail_host.module.css";

function Req_detail_host() {
  const { reqId } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(""); // Status from API
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
        setStatus(response.data.data.bookingStatus); // Set the initial status from API
      } catch (error) {
        console.error("Error fetching request detail:", error);
      }
    };

    fetchRequestDetail();
  }, [reqId]);

  const handleUpdateStatus = async (newStatus) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios.put(
        `${import.meta.env.VITE_API_URL}/request/update-status/${reqId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLoading(false);
      setStatus(newStatus); // Update status after API call
    } catch (error) {
      console.error("Error updating booking status:", error);
      setLoading(false);
    }
  };

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
      <h2 className={styles.title}>Booking Details (Host View)</h2>
      {/* Booking Information */}
      <div className={styles.infoBox}>
        {/* Room Information */}
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
        {/* Pet Information */}
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
        {/* Host Information */}
        <h3 className={styles.subTitle}>User Details</h3>
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

      {/* Booking Status */}
      <div className={styles.infoRow}>
        <label className={styles.label}>Check-in/Check-out:</label>
        <span className={styles.value}>
          {request.startDate && request.endDate
            ? `${new Date(request.startDate).toLocaleDateString()} - ${new Date(
                request.endDate
              ).toLocaleDateString()}`
            : "-"}
        </span>
      </div>
      <div className={styles.infoRow}>
        <label className={styles.label}>Status:</label>
        <span className={styles.value}>{status || "-"}</span>
      </div>

      <div className={styles.infoRow}>
        <label className={styles.label}>Total Amount:</label>
        <span className={styles.value}>${totalAmount.toFixed(2)}</span>
      </div>
      <div className={styles.infoRow}>
        <label className={styles.label}>Payment Status:</label>
        <span className={styles.value}>
          {request.payments[0]?.status || "-"}
        </span>
      </div>

      {/* Status Update Buttons */}
      <div className={styles.buttonGroup}>
        {status !== "reject" && status !== "completed" && (
          <>
            {status !== "confirmed" && (
              <button
                className={styles.confirmButton}
                onClick={() => handleUpdateStatus("confirmed")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Confirm"}
              </button>
            )}
            {status !== "confirmed" && (
              <button
                className={styles.cancelButton}
                onClick={() => handleUpdateStatus("reject")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Reject"}
              </button>
            )}
            {status === "confirmed" && (
              <button
                className={styles.confirmButton}
                onClick={() => handleUpdateStatus("completed")}
                disabled={loading}
              >
                {loading ? "Updating..." : "Complete"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Req_detail_host;
