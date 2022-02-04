import style from "./profile-nav.module.css";
import {Link, useLocation} from "react-router-dom";


function ProfileNav() {
  const { pathname } = useLocation();

  const isProfile = pathname === "/profile" || false;
  const isOrders = pathname === "/profile/orders" || false;

  return (
    <div className={style.wr}>
      <Link className={`${style.link } ${isProfile ? style.link__active : ""} text text_type_main-medium`} to={"/profile"}>
        Профиль
      </Link>

      <Link className={`${style.link } ${isOrders ? style.link__active : ""} text text_type_main-medium`} to={"/profile/orders"}>
        История заказов
      </Link>

      <button className={style.link + " text text_type_main-medium"}>
        Выход
      </button>

      <p className="text text_type_main-small text_color_inactive pt-20">
        {isProfile && "В этом разделе вы можете изменить свои персональные данные"}
        {isOrders && "В этом разделе вы можете посмотреть историю заказов"}
      </p>
    </div>
  )
};

export default ProfileNav;