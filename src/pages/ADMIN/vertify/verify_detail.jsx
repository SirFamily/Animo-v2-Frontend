import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

  // Approve verification function using FormData
  const handleApprove = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token_admin");

      // Create FormData
      const formData = new FormData();
      formData.append('hostId', detail.hostId); 
      formData.append('newStatus', 'Approved');

      // Send the FormData using Axios
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/verify/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update the UI to reflect the approval
      setDetail({
        ...detail,
        verifyStatus: response.data.data.verifyStatus, // Update status to "Approved"
        verifiedAt: new Date(), // Set the current date as verifiedAt
      });

      alert("Verification approved successfully");
    } catch (error) {
      console.error("Error approving verification:", error);
      alert("Error approving verification");
    } finally {
      setLoading(false);
    }
  };

  if (!detail) {
    return <p>Loading...</p>;
  }

  // Destructure host details for easier access
  const { host } = detail;

  return (
    <div>
      <h2>Verification Detail</h2>
      <p><strong>ID:</strong> {detail.id}</p>
      <p><strong>Verify Status:</strong> {detail.verifyStatus}</p>
      <p><strong>Admin ID:</strong> {detail.adminId || "Not assigned"}</p>
      <p><strong>Host ID:</strong> {detail.hostId}</p>
      <p><strong>Created At:</strong> {new Date(detail.createdAt).toLocaleString()}</p>
      <p><strong>Verified At:</strong> {detail.verifiedAt ? new Date(detail.verifiedAt).toLocaleString() : "Not verified"}</p>

      <h3>Host Information</h3>
      <p><strong>Host Name:</strong> {host.name}</p>
      <p><strong>Host Type:</strong> {host.type}</p>
      <p><strong>Host Address:</strong> {host.address}</p>
      <p><strong>Host Description:</strong> {host.description}</p>
      <p><strong>Latitude:</strong> {host.lat}</p>
      <p><strong>Longitude:</strong> {host.long}</p>
      <p><strong>Host Created At:</strong> {new Date(host.createdAt).toLocaleString()}</p>

      <h3>Host Photos</h3>
      <div>
        {host.photosHost && host.photosHost.length > 0 ? (
          host.photosHost.map((photo) => (
            <div key={photo.id}>
              <img src={photo.url} alt={`Host Photo ${photo.id}`} width="200" />
              <p><strong>Photo ID:</strong> {photo.id}</p>
              <p><strong>Photo Created At:</strong> {new Date(photo.createdAt).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No photos available</p>
        )}
      </div>

      {/* Approve button */}
      <button onClick={handleApprove} disabled={loading || detail.verifyStatus === 'Approved'}>
        {loading ? "Approving..." : detail.verifyStatus === 'Approved' ? "Already Approved" : "Approve"}
      </button>
    </div>
  );
}

export default VerifyDetail;
