import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import React from "react";

function OrderButton({selectedIngredientsPrice, openOrderModal}:any) {
  const [price, setPrice] = React.useState(0);

  const setTotalPrice = () => selectedIngredientsPrice.reduce((sum: number, item: number) => sum + item, 0);

  React.useEffect(() => {
    const totalPrice = setTotalPrice();
    setPrice(totalPrice)
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
              onClick={openOrderModal}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

OrderButton.propsType = {
  openOrderModal: PropTypes.func,
  selectedIngredientsPrice: PropTypes.arrayOf(PropTypes.number).isRequired
}

export default OrderButton;