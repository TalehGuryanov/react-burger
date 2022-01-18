import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";

function OrderButton({selectedIngredientsPrice, showOrderData}) {
  const [price, setPrice] = React.useState(0);

  React.useEffect(() => {
    const setTotalPrice = () => selectedIngredientsPrice.reduce((sum, item) => sum + item, 0);
    const totalPrice = setTotalPrice();

    setPrice(totalPrice);
  }, [selectedIngredientsPrice]);

  return (
    <div className={style.wr}>
      <div className={style.total}>
        <span className={`${"text text_type_main-large"} ${style.total__text}`}>
          {price}
        </span>

        <div className={style.total__icon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>

      <Button type="primary"
              size="large"
              onClick={showOrderData}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

OrderButton.propsType = {
  selectedIngredientsPrice: PropTypes.arrayOf(PropTypes.number),
  showOrderData: PropTypes.func
}

export default OrderButton;