import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function OrderButton(props: any) {
  return (
    <div className={style.wr}>
      <div className={style.total}>
        <span className={`${"text text_type_main-large"} ${style.total__text}`}>
          610
        </span>

        <div className={style.total__icon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>

      <Button type="primary"
              size="large"
              onClick={props.openOrderModal}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

OrderButton.propsType = {
  openOrderModal: PropTypes.func
}

export default OrderButton;