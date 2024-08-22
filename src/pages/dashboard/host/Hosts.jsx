import React from "react";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";
import Host_list from "./Host_list";
import Room_list from "./room/Room_list";
import Features_list from "./features/Features_list";
import { Link } from "react-router-dom";

function host() {
  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer_host}>
        <div className={csslayer.container_layer_top_host}>
          <Host_list />  
          <Link to="create-host"><button>add host</button></Link>
        </div>
        <div className={csslayer.container_layer_buttom_host}>
          <div>
            <div className={csslayer.container_in_l_button_host}>
              <Room_list />
              <Link to="create-host/room"><button>add room</button></Link>
            </div>
          </div>
          <div>
            <div className={csslayer.container_in_r_button_host}>
              <Features_list />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default host;
