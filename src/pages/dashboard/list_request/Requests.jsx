import React from 'react'
import Menu from "../../../menu/Menu"
import csslayer from "../dashboardcss/dashlayer.module.css";
import Req_list from './Req_list';

function request() {
  return (
    <div className={csslayer.container}>
      <Menu />
      <div className={csslayer.container_g_layer}>
        <div className={csslayer.container_layer_buttom_req}>
          <div><Req_list /></div>
        </div>
      </div>
    </div>
  )
}

export default request
