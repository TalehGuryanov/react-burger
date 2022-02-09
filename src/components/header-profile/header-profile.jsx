import style from "./header-profile.module.css";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import {NavLink} from "react-router-dom";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

function HeaderProfile ({isLogged}) {
  return (
    <NavLink to={isLogged ? "/profile" : "/login"}
              className={style.profile_link}
              activeClassName={style.profile_link__active}
    >
      <div className={style.profile_link_icon}>
        <ProfileIcon type="primary" />
      </div>

      <span className={`${"text text_type_main-default"} ${style.profile_link_text}`}>
        {isLogged ? "Личный кабинет" : "Войти"}
      </span>
    </NavLink>
  )
}

HeaderProfile.propsType = {
  isLogged: PropTypes.bool
}

export default HeaderProfile;