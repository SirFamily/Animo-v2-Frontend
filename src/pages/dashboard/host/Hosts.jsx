import React, { useState, useEffect } from "react";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";
import Host_list from "./Host_list";
import Room_list from "./room/Room_list";
import Features_list from "./features/Features_list";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";
import Hamster from "../../../component/loading/Hamster"; // Hamster loading component
import Modelpopup from "../../../component/Modelpopup";

function Hosts() {
  const [hosts, setHosts] = useState([]); // Store hosts data
  const [selectedHostId, setSelectedHostId] = useState(null);
  const { user } = useAuth();
  const uid = user.id;

  const fetchHosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/host/list/${uid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const hostsData = response.data.data;
      setHosts(hostsData); // Store hosts data
      if (hostsData && hostsData.length > 0) {
        setSelectedHostId(hostsData[0].id);
      }
    } catch (error) {
      console.error("Error fetching hosts:", error);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, [uid]);

  const handleHostsUpdate = (updatedHosts) => {
    setHosts(updatedHosts);
    if (updatedHosts.length > 0) {
      setSelectedHostId(updatedHosts[0].id);
    }
  };

  // Check if the selected host has a pending verification status
  const isPending = hosts.some(
    (host) =>
      host.verifyHosts &&
      host.verifyHosts.some((verify) => verify.verify_status === "Pending")
  );

  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer_host}>
        <div className={csslayer.container_layer_top_host}>
          <Host_list
            onUpdate={handleHostsUpdate}
            onHostSelect={setSelectedHostId}
            handleHostUpdate={fetchHosts}
          />
          {hosts.length === 0 && (
            <div className={csslayer.button_container}>
              <Link to="create-host">
                <button className={csslayer.bt}>เพิ่มที่พัก</button>
              </Link>
            </div>
          )}
        </div>
        {isPending ? (
          <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFFF",
            borderRadius: "15px",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", 
            paddingTop: "20px"
          }}
        >
          <Hamster  />
          <h1 style={{ color: "#00B2CA" }}>
            อยู่ในระหว่างการยืนยัน
          </h1>
        </div>
        
        ) : (
          hosts.length > 0 &&
          selectedHostId && (
            <div className={csslayer.container_layer_buttom_host}>
              <div>
                <div className={csslayer.container_in_l_button_host}>
                  <Room_list hostId={selectedHostId} />
                  <div className={csslayer.button_container}>
                    <Link to="create-host/room">
                      <button className={csslayer.bt}>เพิ่มห้องพัก</button>
                    </Link>
                  </div>
                </div>
              </div>
              <div>
                <div className={csslayer.container_in_r_button_host}>
                  <Features_list />
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Hosts;
