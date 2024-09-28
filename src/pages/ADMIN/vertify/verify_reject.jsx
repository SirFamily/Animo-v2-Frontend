import React, { useState } from "react";
import axios from "axios";

function VerifyReject({ id, onReject }) {
  const [loading, setLoading] = useState(false);

  const handleReject = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/verify/${id}`,
        { newStatus: "Rejected" },
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
