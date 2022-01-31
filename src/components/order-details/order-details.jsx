import style from "./order-details.module.css"
import PropTypes from "prop-types";
import doneImg from "../../images/graphics.png"

function OrderDetails({ orderDetails }) {
  return (
    <div className={style.wr}>
      <div className={`${style.title} ${"text text_type_digits-large"}`}>
        {orderDetails.order.number}
      </div>

      <div className={`${style.id_text} ${"text text_type_main-medium"}`}>
        идентификатор заказа
      </div>

      <div className={style.img}>
        <img src={doneImg} alt="done"/>
      </div>

      <div className={`${style.notification} ${"text text_type_main-default"}`}>
        Ваш заказ начали готовить
      </div>

      <div className={`${style.subtitle} ${"text text_type_main-default text_color_inactive"}`}>
        Дождитесь готовности на орбитальной станции
      </div>
    </div>
  )
}

OrderDetails.propsType = {
  orderDetails: PropTypes.object
}

export default OrderDetails;