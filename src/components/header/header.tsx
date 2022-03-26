import style from "./header.module.css";
import {HeaderMenu} from "../header-menu/header-menu";
import {HeaderLogo} from "../header-logo/header-logo"
import {HeaderProfile} from "../header-profile/header-profile";
import React from "react";
import {TIsLogged} from "../../utils/types";

type THeaderProps = {
  isLogged: TIsLogged
}

export const Header: React.FC<THeaderProps> = ({isLogged}) => {
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
};
