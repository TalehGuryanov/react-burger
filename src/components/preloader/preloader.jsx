import style from "./preloader.module.css"

function Preloader() {
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
}

export default Preloader;