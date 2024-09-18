import React from 'react'
import Menu from "../../../menu/Menu"
import csslayer from "../dashboardcss/dashlayer.module.css";
import History_list from './History_list';
function history() {
  return (
    <div className={csslayer.container}>
    <Menu />
    <div className={csslayer.container_g_layer}>
      <div className={csslayer.container_layer_buttom_his}>
        <History_list />
      </div>
    </div>
  </div>
  )
}

export default history
