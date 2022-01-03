import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./header-logo.module.css"

function HeaderLogo() {
  return (
    <a href="#"
      className={style.wr}
    >
      <Logo />
    </a>
  )
}

export  default HeaderLogo;