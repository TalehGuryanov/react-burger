import style from "./header-profile.module.css";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function HeaderProfile () {
  return (
    <a href="#"
       className={style.wr}
    >
      <div className={style.icon}>
        <ProfileIcon type="primary" />
      </div>

      <span className={`${"text text_type_main-default"} ${style.text}`}>
        Личный кабинет
      </span>
    </a>
  )
}

export default HeaderProfile;