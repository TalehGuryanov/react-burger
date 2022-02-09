import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./header-logo.module.css"

function HeaderLogo() {
  return (
    <div className={style.wr}>
      <Logo />
    </div>
  )
}

export  default HeaderLogo;