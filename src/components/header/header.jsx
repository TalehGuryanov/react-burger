import style from "./header.module.css";
import HeaderMenu from "../header-menu/header-menu";
import HeaderLogo from "../header-logo/header-logo"
import HeaderProfile from "../header-profile/header-profile";
import PropTypes from "prop-types";

function Header ({isLogged}) {
  return (
    <header className={style.wr}>
      <div className={`${"pb-4 pt-4"} ${style.in}`}>
        <nav className={style.nav}>
          <HeaderMenu />

          <HeaderLogo />

          <HeaderProfile isLogged={isLogged}/>
        </nav>
      </div>
    </header>
  )
}

Header.propsType = {
  isLogged: PropTypes.bool
}

export default Header;