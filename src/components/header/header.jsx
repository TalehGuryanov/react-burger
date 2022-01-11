import style from "./header.module.css";
import HeaderMenu from "../header-menu/header-menu";
import HeaderLogo from "../header-logo/header-logo"
import HeaderProfile from "../header-profile/header-profile";

function Header () {
  return (
    <header className={style.wr}>
      <div className={`${"pb-4 pt-4"} ${style.in}`}>
        <nav className={style.nav}>
          <HeaderMenu />

          <HeaderLogo />

          <HeaderProfile />
        </nav>
      </div>
    </header>
  )
}

export default Header;