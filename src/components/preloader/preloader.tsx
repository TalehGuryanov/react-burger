import style from "./preloader.module.css"
import React from "react";

export const Preloader: React.FC = () => {
  return(
    <div className={style.wr}>
      <div className={style.loader}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
};
