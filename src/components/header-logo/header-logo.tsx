import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./header-logo.module.css"
import React from "react";

export const HeaderLogo: React.FC = () => {
  return (
    <div className={style.wr}>
      <Logo />
    </div>
  )
};
