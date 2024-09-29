import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../Css/verifyDetail.module.css"; // ใช้ CSS Module
import useAuth from "../../../hooks/useAuth";

function VerifyDetail() {
  const { id } = useParams(); 
  const {admin, run} = useAuth();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState({ approve: false, reject: false });

  const verificationDetail = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/verify/detail/${id}`);
      setDetail(response.data.data);
    } catch (error) {
      console.error("Error verification detail:", error);
    }
  };

  useEffect(() => {
    verificationDetail();
  }, [id]);

  // Approve verification function
  const handleApprove = async () => {
    try {
      setLoading((prev) => ({ ...prev, approve: true }));

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/${id}/${admin.id}`,
        { newStatus: 'Approved' },
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
      setLoading((prev) => ({ ...prev, approve: false }));
    }
  };

  // Reject verification function
  const handleReject = async () => {
    try {
      setLoading((prev) => ({ ...prev, reject: true }));
      const token = sessionStorage.getItem("token_admin");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/${id}/${admin.id}`,
        { newStatus: "Rejected" },
      );

      setDetail({
        ...detail,
        verifyStatus: response.data.data.verifyStatus,
      });

      alert("Verification rejected successfully");
    } catch (error) {
      console.error("Error rejecting verification:", error);
      alert("Error rejecting verification");
    } finally {
      setLoading((prev) => ({ ...prev, reject: false }));
    }
  };

  if (!detail) {
    return <p className={styles.loadingMessage}>Loading...</p>;
  }

  const { host } = detail;

  return (
    <div className={styles.verifyDetailContainer}>
      <h2 className={styles.title}>Verification Detail</h2>
      <div className={styles.detailCard}>
        <p><strong>ID:</strong> {detail.id}</p>
        <p><strong>Verify Status:</strong> {detail.verifyStatus}</p>
        <p><strong>Admin ID:</strong> {detail.adminId || "Not assigned"}</p>
        <p><strong>Host ID:</strong> {detail.hostId}</p>
        <p><strong>Created At:</strong> {new Date(detail.createdAt).toLocaleString()}</p>
        <p><strong>Verified At:</strong> {detail.verifiedAt ? new Date(detail.verifiedAt).toLocaleString() : "Not verified"}</p>
      </div>

      <div className={styles.hostInfo}>
        <div className={styles.hostCard}>
          <h3 className={styles.hostTitle}>Host Information</h3>
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
              <img src={photo.url} alt={`Host Photo ${photo.id}`} className={styles.photo} />
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
            disabled={loading.approve}>
            {loading.approve ? "Approving..." : "Approve"}
          </button>

          <button 
            className={styles.rejectButton} 
            onClick={handleReject} 
            disabled={loading.reject}>
            {loading.reject ? "Rejecting..." : "Reject"}
          </button>
        </div>
      )}
    </div>
  );
}

export default VerifyDetail;
