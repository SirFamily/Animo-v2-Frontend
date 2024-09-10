import React, { useState, useEffect } from "react";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";
import Host_list from "./Host_list";
import Room_list from "./room/Room_list";
import Features_list from "./features/Features_list";
import { Link } from "react-router-dom";
import axios from "axios";
import useAuth from "../../../hooks/useAuth";

function Hosts() {
  const [hasHostData, setHasHostData] = useState(false);
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
      const hosts = response.data.data;
      setHasHostData(hosts && hosts.length > 0);
      if (hosts && hosts.length > 0) {
        setSelectedHostId(hosts[0].id); // Set the first host as selected by default
      }
    } catch (error) {
      console.error("Error fetching hosts:", error);
    }
  };

  useEffect(() => {
    fetchHosts();
  }, [uid]);

  const handleHostsUpdate = (hosts) => {
    setHasHostData(hosts.length > 0);
    if (hosts.length > 0) {
      setSelectedHostId(hosts[0].id); // Update selectedHostId if new hosts are fetched
    }
  };

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
          {!hasHostData && (
            <div className={csslayer.button_container}>
              <Link to="create-host">
                <button className={csslayer.bt}>Add host</button>
              </Link>
            </div>
          )}
        </div>
        {hasHostData && selectedHostId && (
          <div className={csslayer.container_layer_buttom_host}>
            <div>
              <div className={csslayer.container_in_l_button_host}>
                <Room_list hostId={selectedHostId} />
                <div className={csslayer.button_container}>
                  <Link to="create-host/room">
                    <button className={csslayer.bt}>Add Room</button>
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
        )}
      </div>
    </div>
  );
}

export default Hosts;
