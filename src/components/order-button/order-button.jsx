import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";

function OrderButton({selectedIngredientsPrice, showOrderData, isLogged}) {
  const { bun } = useSelector((store) => store.constructorData);
  const [price, setPrice] = React.useState(0);
  const history = useHistory();

  React.useEffect(() => {
    const setTotalPrice = () => selectedIngredientsPrice.reduce((sum, item) => sum + item, 0);
    const totalPrice = setTotalPrice();

    setPrice(totalPrice);
  }, [selectedIngredientsPrice]);

  const redirectToLogin = () => history.replace("/login");

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
              onClick={isLogged ? showOrderData : redirectToLogin}
              disabled={!bun}
      >
        Оформить заказ
      </Button>
    </div>
  )
};

OrderButton.propsType = {
  selectedIngredientsPrice: PropTypes.arrayOf(PropTypes.number),
  showOrderData: PropTypes.func,
  isLogged: PropTypes.bool.isRequired
}

export default OrderButton;
