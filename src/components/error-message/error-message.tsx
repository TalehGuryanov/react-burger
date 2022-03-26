import style from "./error-message.module.css";
import errorImage from "../../images/404-error.png"
import React from "react";


export const ErrorMessage: React.FC = () => {
  return(
    <div className={style.wr}>
      <img className={style.img} src={errorImage} alt="Error image"/>
    </div>
  )
};

