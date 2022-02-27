import style from "../header-menu/header-menu.module.css";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import React from "react";

export const HeaderMenu: React.FC = () => {
  return (
    <ul className={style.wr}>
      <li className={style.item}>
        <NavLink to="/"
                 exact
                 className={style.item_link}
                 activeClassName={style.item_link__active}
        >
          <div className={style.item_link_icon}>
            <BurgerIcon type="primary" />
          </div>

          <span className={`${"text text_type_main-default"} ${style.item_text}`}>
            Конструктор
          </span>
        </NavLink>
      </li>

      <li className={style.item}>
        <NavLink to="/profile/orders"
                 exact
                 className={style.item_link}
                 activeClassName={style.item_link__active}
        >
          <div className={style.item_link_icon}>
            <ListIcon type="primary" />
          </div>

          <span className={`${"text text_type_main-default"} ${style.item_text}`}>
            Лента заказов
          </span>
        </NavLink>
      </li>
    </ul>
  )
};
