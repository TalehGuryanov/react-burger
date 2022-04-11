import style from "./order-button.module.css"
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useSelector} from "../../services/hooks";
import {useHistory} from "react-router-dom";
import {RootState, TIsLogged} from "../../services/types";

type TOrderButtonProps = {
  selectedIngredientsPrice: Array<number>;
  showOrderData: () => void;
  isLogged: TIsLogged
};

const OrderButton: React.FC<TOrderButtonProps> = ({selectedIngredientsPrice, showOrderData, isLogged}) => {
  const { bun } = useSelector(store => store.constructorData);
  const [price, setPrice] = React.useState<number>(0);
  const history = useHistory();

  React.useEffect(() => {
    const setTotalPrice: () => number = () => selectedIngredientsPrice.reduce((sum, item) => sum + item, 0);
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

export default OrderButton;
