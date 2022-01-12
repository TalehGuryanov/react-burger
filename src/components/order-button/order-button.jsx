import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrder, SHOW_ORDER_DATA} from "../../services/actions/actions";

function OrderButton({selectedIngredientsPrice, constructorItemsIds}) {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState(0);


  React.useEffect(() => {
    const setTotalPrice = () => selectedIngredientsPrice.reduce((sum, item) => sum + item, 0);
    const totalPrice = setTotalPrice();

    setPrice(totalPrice);
  }, [selectedIngredientsPrice]);

  const openOrderModal = () => {
    if(constructorItemsIds) {
      const body = {"ingredients": constructorItemsIds};
      const post = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      };

      dispatch(getOrder(post));
      dispatch({type: SHOW_ORDER_DATA});
    }
  }

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
  selectedIngredientsPrice: PropTypes.arrayOf(PropTypes.number),
  constructorItemsIds: PropTypes.arrayOf(PropTypes.string)
}

export default OrderButton;