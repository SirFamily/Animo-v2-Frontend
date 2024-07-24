import React from "react";
import { Link } from "react-router-dom";
import css from "./Css/menu.module.css";

function Menu() {
  return (
    <div className={css.container}>
      <div className={css.container_list_menu}>
        <div>
          <Link to="/dashboard/">
            <i class="fi fi-rr-dashboard-panel"></i>
          </Link>
        </div>
        <div>
          <Link to="/dashboard/pets">
            <i class="fi fi-rr-cat-head"></i>
          </Link>
        </div>
        <div>
          <Link to="/dashboard/host">
            <i class="fi fi-rr-home"></i>
          </Link>
        </div>
        <div>
          <Link to="/dashboard/request">
          <i class="fi fi-rr-calendar-lines"></i>
          </Link>
        </div>
        <div>
          <Link to="/dashboard/history">
          <i class="fi fi-rr-calendar-clock"></i>
          </Link>
        </div>
        <div>
          <Link to="/dashboard/profile">
          <i class="fi fi-rr-user"></i>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Menu;
