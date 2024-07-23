import React from 'react';
import { Link } from "react-router-dom";
import css from './Css/menu.module.css';

function Menu() {
  return (
    <div className={css.container}>
      <div className={css.container_list_menu}>
        <div>
          <Link to="/dashboard/"><img className={css.icon} src="https://cdn-icons.flaticon.com/svg/16105/16105467.svg?token=exp=1721714834~hmac=ec059f895017546a1254b503682aaf26" alt="" /></Link>
        </div>
        <div>
          <Link to="/dashboard/pets"><img className={css.icon} src="https://www.flaticon.com/svg/vstatic/svg/14656/14656016.svg?token=exp=1721656274~hmac=bd782e86faff39714ec2490bb083c674" alt="" /></Link>
        </div>
        <div>
          <Link to="/dashboard/host"><img className={css.icon} src="https://www.flaticon.com/svg/vstatic/svg/9239/9239302.svg?token=exp=1721657681~hmac=a8b685f96a6430cd92f23c664ef2eb3a" alt="" /></Link>
        </div>
        <div>
          <Link to="/dashboard/request"><img className={css.icon} src="https://www.flaticon.com/svg/vstatic/svg/14703/14703155.svg?token=exp=1721658107~hmac=8404c81a73ac5b1e0b9cc6053975fff7" alt="" /></Link>
        </div>
        <div>
          <Link to="/dashboard/history"><img className={css.icon} src="https://www.flaticon.com/svg/vstatic/svg/3917/3917332.svg?token=exp=1721658195~hmac=34de3ca9efb98ae7252cbcaf62c3c0af" alt="" /></Link>
        </div>
        <div>
          <Link to="/dashboard/profile"><img className={css.icon} src="https://www.flaticon.com/svg/vstatic/svg/16861/16861487.svg?token=exp=1721658666~hmac=d0ea085f566f28ef678ddecd9c80ae8b" alt="" /></Link>
        </div>
      </div>
    </div>
  )
}

export default Menu;
