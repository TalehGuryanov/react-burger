import style from "./profile-nav.module.css";
import {useDispatch, useSelector} from "../../services/hooks";
import {logoutThunk} from "../../services/actions/auth";
import {getCookie} from "../../utils/cookie";
import {Notification} from "../notification/notification";
import {NavLink, useRouteMatch} from "react-router-dom";
import React from "react";
import {RootState} from "../../services/types";

const ProfileNav: React.FC = () => {
  const {isAuthError} = useSelector(store => store.authResponse);
  const dispatch = useDispatch();
  const {path} = useRouteMatch();

  const onLogout: () => void = () => {
    const refreshToken: string = getCookie("refreshToken");

    dispatch(logoutThunk(refreshToken));
  }

  return (
    <div className={style.wr}>
      <NavLink className={`${style.link } text text_type_main-medium`}
               activeClassName={style.link__active}
               to={path}
               exact
      >
        Профиль
      </NavLink>

      <NavLink className={`${style.link } text text_type_main-medium`}
               activeClassName={style.link__active}
               to={`${path}/orders`}
               exact
      >
        История заказов
      </NavLink>

      <button className={style.link + " text text_type_main-medium"} onClick={onLogout}>
        Выход
      </button>

      <p className="text text_type_main-small text_color_inactive pt-20">
        "В этом разделе вы можете изменить свои персональные данные"
      </p>

      {isAuthError && <Notification status={false} text="Что-то пошло не так. Попробуйте еще раз"/>}
    </div>
  )
};

export default ProfileNav;
