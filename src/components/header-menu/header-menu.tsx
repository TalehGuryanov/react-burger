import style from "../header-menu/header-menu.module.css";
import {BurgerIcon, ListIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function HeaderMenu () {
  return (
    <ul className={style.wr}>
      <li className={style.item}>
        <a href="#"
           className={style.item_link}
        >
          <div className={style.item_link_icon}>
            <BurgerIcon type="primary" />
          </div>

          <span className={`${"text text_type_main-default"} ${style.item_text}`}>
            Конструктор
          </span>
        </a>
      </li>

      <li className={style.item}>
        <a href="#"
           className={style.item_link}
        >
          <div className={style.item_link_icon}>
            <ListIcon type="primary" />
          </div>

          <span className={`${"text text_type_main-default"} ${style.item_text}`}>
            Лента заказов
          </span>
        </a>
      </li>
    </ul>
  )
}

export default HeaderMenu;