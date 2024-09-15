import React from 'react'
import Menu from "../../../menu/Menu"
import csslayer from "../dashboardcss/dashlayer.module.css";

function history() {
  return (
    <div className={csslayer.container}>
    <Menu />
    <div className={csslayer.container_g_layer}>
      <div className={csslayer.container_layer_buttom_his}>
        <h1>history</h1>
      </div>
    </div>
  </div>
  )
}

export default history
