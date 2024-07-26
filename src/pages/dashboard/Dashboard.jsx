import React from "react";
import Menu from "../../menu/Menu";
import csslayer from "./dashboardcss/dashlayer.module.css";
function Dashboard() {
  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        {/* <div className={csslayer.container_layer_top}>
          <div className={csslayer.container_in_top}></div>
        </div> */}
        <div className={csslayer.container_layer_buttom}>
          <h1>Dashboard</h1>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
