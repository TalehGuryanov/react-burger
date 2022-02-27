import style from "./notification.module.css"
import React from "react";

type TNotificationProps = {
  text: string
  status: boolean
};

export const Notification:React.FC<TNotificationProps> = ({text, status}) => {
  return(
    <div className={`${style.wr} ${status ? style.success : style.error}`}>
      {text}
    </div>
  )
};
