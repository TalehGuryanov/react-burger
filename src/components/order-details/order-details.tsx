import style from "./order-details.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import doneImg from "../../images/graphics.png"

function OrderDetails(props: any) {
  const ordersData = props.orderDetails;

  return (
    <div className={style.wr}>
      <div className={style.icon_close}>
        <CloseIcon type="primary" onClick={props.onClose}/>
      </div>

      <div className={`${style.title} ${"text text_type_digits-large"}`}>
        {ordersData.id}
      </div>

      <div className={`${style.id_text} ${"text text_type_main-medium"}`}>
        {ordersData.idText}
      </div>

      <div className={style.img}>
        <img src={doneImg} alt="done"/>
      </div>

      <div className={`${style.notification} ${"text text_type_main-default"}`}>
        {ordersData.notification}
      </div>

      <div className={`${style.subtitle} ${"text text_type_main-default text_color_inactive"}`}>
        {ordersData.subTitle}
      </div>
    </div>
  )
}

OrderDetails.propsType = {
  ordersData: PropTypes.object
}

export default OrderDetails;