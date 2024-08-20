import React from "react";
import Menu from "../../../menu/Menu";
import csslayer from "../dashboardcss/dashlayer.module.css";

function host() {
  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer_host}>
        <div className={csslayer.container_layer_top_host}>
         test
        </div>
        <div className={csslayer.container_layer_buttom_host}>
          <div className={csslayer.container_in_button_host}>
          test
          </div>
          <div className={csslayer.container_in_button_host}>test</div>
        </div>
      </div>
    </div>
  );
}

export default host;
