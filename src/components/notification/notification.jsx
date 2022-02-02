import style from "./notification.module.css"

function Notification({text, status})  {
  return(
    <div className={`${style.wr} ${status ? style.success : style.error}`}>
      {text}
    </div>
  )
}

export default Notification;