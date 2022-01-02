import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import React from "react";

function OrderButton(props: any) {
  const [price, setPrice] = React.useState(0);

  const setTotalPrice = () => {
    if(props.selectedIngredients[0]) {
      const burgerBuns = props.selectedIngredients.find((item: any) => item.type === "bun");
      const burgerFilling = props.selectedIngredients.filter((item: any) => item.type !== "bun");

      const burgerBunsPrice = burgerBuns.price * 2;

      if(burgerFilling) {
        const burgerFillingPrice = burgerFilling.reduce((sum: number, item: any) => sum + item.price, 0);
        return burgerBunsPrice + burgerFillingPrice;
      } else {
        return burgerBunsPrice
      }
    }
  }

  React.useEffect(() => {
    const totalPrice = setTotalPrice();
    setPrice(totalPrice)
  }, [props.selectedIngredients]);

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
              onClick={props.openOrderModal}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

OrderButton.propsType = {
  openOrderModal: PropTypes.func,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired
}

export default OrderButton;