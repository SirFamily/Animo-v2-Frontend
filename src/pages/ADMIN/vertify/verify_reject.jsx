import React, { useState } from "react";
import axios from "axios";

function VerifyReject({ id, onReject }) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    try {
      setLoading(true);
      const token = sessionStorage.getItem("token_admin");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/${id}`,
        { newStatus: "Rejected" }, // เปลี่ยนสถานะเป็น "Rejected"
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
      );

      // อัปเดตสถานะการตรวจสอบและเรียก callback ที่รับมาจาก props
      if (onReject) {
        onReject(response.data.data.verifyStatus);
      }

      alert("Verification rejected successfully");
    } catch (error) {
      console.error("Error rejecting verification:", error);
      alert("Error rejecting verification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={handleReject} disabled={loading}>
        {loading ? "Rejecting..." : "Reject"}
      </button>
    </div>
  );
}

export default VerifyReject;
