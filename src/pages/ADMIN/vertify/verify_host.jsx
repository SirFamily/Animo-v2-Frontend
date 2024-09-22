import React, { useState, useEffect } from "react";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import verifyhost from "../Css/verifyhost.module.css"; 

function VerifyHostList() {
  const [pendingVerifications, setPendingVerifications] = useState([]);
  const [approvedVerifications, setApprovedVerifications] = useState([]);
  const [rejectedVerifications, setRejectedVerifications] = useState([]);

  const [showPending, setShowPending] = useState(true);   // เปิด/ปิดตาราง Pending
  const [showApproved, setShowApproved] = useState(true); // เปิด/ปิดตาราง Approved
  const [showRejected, setShowRejected] = useState(true); // เปิด/ปิดตาราง Rejected

  const { admin, logoutAdmin } = useAuth();

  const fetchVerifications = async (status, setState) => {
    try {
      const token = sessionStorage.getItem("token_admin");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/verify/list/${status}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setState(response.data.data);
    } catch (error) {
      console.error(`Error fetching ${status} verifications:`, error);
    }
  };

  useEffect(() => {
    // ดึงข้อมูลการตรวจสอบตามสถานะ
    fetchVerifications("pending", setPendingVerifications);
    fetchVerifications("approved", setApprovedVerifications);
    fetchVerifications("rejected", setRejectedVerifications);
  }, []);

  const hdlLogout = () => {
    logoutAdmin();
    navigate("/");
  };

  const renderTable = (verifications) => (
    <table className={verifyhost.table} border="1" cellPadding="10" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Verify Status</th>
          <th>Admin ID</th>
          <th>Host ID</th>
          <th>Created At</th>
          <th>Verified At</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {verifications.map((verification) => (
          <tr key={verification.id}>
            <td>{verification.id}</td>
            <td>{verification.verifyStatus}</td>
            <td>{verification.adminId || "Not assigned"}</td>
            <td>{verification.hostId}</td>
            <td>{new Date(verification.createdAt).toLocaleString()}</td>
            <td>
              {verification.verifiedAt
                ? new Date(verification.verifiedAt).toLocaleString()
                : "Not verified"}
            </td>
            <td>
              <Link to={`/verify/detail/${verification.id}`}>
                <div className={verifyhost.button02}>
                  <button>Detail</button>
                </div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  

  return (
    <div className={verifyhost.body}>
      <h2>Verification List</h2>
      <div className={verifyhost.allbutton}>
      <div className={verifyhost.button01}>
      <button onClick={() => setShowPending(!showPending)}>
        {showPending ? "ซ่อนตาราง Pending" : "โชว์ตาราง Pending"}
      </button>
      </div>
      <div className={verifyhost.button01}>
      <button onClick={() => setShowApproved(!showApproved)}>
        {showApproved ? "ซ่อนตาราง Approved" : "โชว์ตาราง Approved"}
      </button>
      </div>
      <div className={verifyhost.button01}>
      <button onClick={() => setShowRejected(!showRejected)}>
        {showRejected ? "ซ่อนตาราง Rejected" : "โชว์ตาราง Rejected"}
      </button>
      </div>
      </div>
      
      {showPending && (
        <>
          <h3>Pending Verifications</h3>
          {pendingVerifications.length > 0 ? (
            renderTable(pendingVerifications)
          ) : (
            <p>No pending verifications</p>
          )}
        </>
      )}
      {showApproved && (
        <>
          <h3>Approved Verifications</h3>
          {approvedVerifications.length > 0 ? (
            renderTable(approvedVerifications)
          ) : (
            <p>No approved verifications</p>
          )}
        </>
      )}
      {showRejected && (
        <>
          <h3>Rejected Verifications</h3>
          {rejectedVerifications.length > 0 ? (
            renderTable(rejectedVerifications)
          ) : (
            <p>No rejected verifications</p>
          )}
        </>
      )}
    </div>
  );
}

export default VerifyHostList;