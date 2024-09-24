import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import VerifyReject from "./verify_reject"; // นำเข้า component ใหม่
import styles from "../Css/verifyDetail.module.css"; // นำเข้าไฟล์ CSS Module

function VerifyDetail() {
  const { id } = useParams(); // Get the verification ID from the URL
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch verification detail by ID
  const fetchVerificationDetail = async () => {
    try {
      const token = sessionStorage.getItem("token_admin");
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDetail(response.data.data);
    } catch (error) {
      console.error("Error fetching verification detail:", error);
    }
  };

  useEffect(() => {
    fetchVerificationDetail();
  }, [id]);

  // Approve verification function
  const handleApprove = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token_admin");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/${id}`,
        { newStatus: 'Approved' },
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } }
      );

      setDetail({
        ...detail,
        verifyStatus: response.data.data.verifyStatus,
        verifiedAt: new Date(),
      });

      alert("Verification approved successfully");
    } catch (error) {
      console.error("Error approving verification:", error);
      alert("Error approving verification");
    } finally {
      setLoading(false);
    }
  };

  // Callback to update status when rejected
  const handleRejectUpdate = (newStatus) => {
    setDetail((prevDetail) => ({
      ...prevDetail,
      verifyStatus: newStatus,
    }));
  };

  if (!detail) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  const { host } = detail;

  return (
    <div className={styles.container}>
      <h2>Verification Detail</h2>
      <div className={styles.card}>
        <p><strong>ID:</strong> {detail.id}</p>
        <p><strong>Verify Status:</strong> {detail.verifyStatus}</p>
        <p><strong>Admin ID:</strong> {detail.adminId || "Not assigned"}</p>
        <p><strong>Host ID:</strong> {detail.hostId}</p>
        <p><strong>Created At:</strong> {new Date(detail.createdAt).toLocaleString()}</p>
        <p><strong>Verified At:</strong> {detail.verifiedAt ? new Date(detail.verifiedAt).toLocaleString() : "Not verified"}</p>
      </div>

      <div className={styles.hostInfo}>
        <div className={styles.card}>
          <h3>Host Information</h3>
          <p><strong>Host Name:</strong> {host.name}</p>
          <p><strong>Host Type:</strong> {host.type}</p>
          <p><strong>Host Address:</strong> {host.address}</p>
          <p><strong>Host Description:</strong> {host.description}</p>
          <div className={styles.coordinates}>
            <p><strong>Latitude:</strong> {host.lat}</p>
            <p><strong>Longitude:</strong> {host.long}</p>
          </div>
        </div>
      </div>

      <div className={styles.photosContainer}>
        {host.photosHost && host.photosHost.length > 0 ? (
          host.photosHost.map((photo) => (
            <div key={photo.id} className={styles.photoItem}>
              <img src={photo.url} alt={`Host Photo ${photo.id}`} />
              <p><strong>Photo ID:</strong> {photo.id}</p>
              <p><strong>Photo Created At:</strong> {new Date(photo.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p className={styles.noPhotos}>No photos available</p>
        )}
      </div>

      {/* Conditionally render approve and reject buttons if not already approved */}
      {detail.verifyStatus !== 'Approved' && (
        <div className={styles.actions}>
          <button 
            className={styles.approveButton} 
            onClick={handleApprove} 
            disabled={loading}>
            {loading ? "Approving..." : "Approve"}
          </button>

          {/* Reject button (Modal Component) */}
          <div className={styles.rejectButton}>
            <VerifyReject id={id} onReject={handleRejectUpdate} />
          </div>
        </div>
      )}
    </div>
  );
}

export default VerifyDetail;
