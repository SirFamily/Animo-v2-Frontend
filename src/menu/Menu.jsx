import React from "react";
import { Link } from "react-router-dom";
import css from "./Css/menu.module.css";

import icondash from "../assets/dashboard-panel.png";
import iconpet from "../assets/cat-head.png";
import iconhouse from "../assets/house-building.png";
import iconcaleder from "../assets/calendar-lines.png";
import iconhistory from "../assets/calendar-clock.png";
import iconsetting from "../assets/settings.png";

function Menu() {
  return (
    <div className={css.container}>
      <div className={css.container_list_menu}>
        <div>
          <Link to="/dashboard/pets">
            <img className={css.icon} src={iconpet} alt="pets" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard/host">
            <img className={css.icon} src={iconhouse} alt="host" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard/request">
            <img className={css.icon} src={iconcaleder} alt="request" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard/history">
            <img className={css.icon} src={iconhistory} alt="history" />
          </Link>
        </div>
        <div>
          <Link to="/dashboard/profile">
            <img className={css.icon} src={iconsetting} alt="profile" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
