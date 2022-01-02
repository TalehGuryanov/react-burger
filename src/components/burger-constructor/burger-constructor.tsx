import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import React from "react";
import PropTypes from "prop-types";
import { IngredientsContext } from "../../utils/ingredients-context";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function BurgerConstructor() {
  const [isModal, setModal] = React.useState<boolean>(false);
  const [orderDetails, setOrderDetails] = React.useState<any>();
  const constructorState = React.useContext(IngredientsContext);

  function onCloseModal() {
    setModal(false);
  }

  function openOrderModal() {
    const body = {"ingredients": [constructorState._id]};
    const post = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    };

    fetch("https://norma.nomoreparties.space/api/orders", post)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((result) => {
        setOrderDetails(result);
        setModal(true);
      })
      .catch((error) => console.log(error));
  }

  return(
    <div className={style.wr}>
      <div className={style.block}>
        <div className={style.block__main_item}>
          {constructorState &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${constructorState.name} (вверх)`}
              price={constructorState.price}
              thumbnail={constructorState.image}
            />
          }
        </div>

        <div className={style.block__main_item}>
          {constructorState &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${constructorState.name} (низ)`}
              price={constructorState.price}
              thumbnail={constructorState.image}
            />
          }
        </div>
      </div>

      <OrderButton openOrderModal={openOrderModal} selectedIngredients={[constructorState]}/>

      {isModal &&
        <Modal onCloseModal={onCloseModal}>
            <OrderDetails orderDetails={orderDetails} onCloseModal={onCloseModal}/>
        </Modal>
      }
    </div>
  )
};

BurgerConstructor.propsType = {
  openOrderModal: PropTypes.func
}

export default BurgerConstructor;