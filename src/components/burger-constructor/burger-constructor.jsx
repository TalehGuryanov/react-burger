import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import React from "react";
import { IngredientsContext } from "../../services/ingredients-context";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import ConstructorBox from "../constructor-box/constructor-box";
import {URL} from "../../utils/constants";

function BurgerConstructor() {
  const [orderDetails, setOrderDetails] = React.useState(false);
  const ingredients = React.useContext(IngredientsContext);
  const selectedBun = React.useMemo(() => ingredients.find((item) => item.type === "bun"), [ingredients]);
  const selectedFilling = React.useMemo(() => ingredients.filter((item) => item.type !== "bun"), [ingredients]);
  const selectedBunPrice = selectedBun.price * 2;
  const selectedFillingPrices = React.useMemo( () => selectedFilling.map((item) => item.price), [selectedFilling]);

  const constructorItems = React.useMemo(
    () =>
      selectedFilling.map((item) => {
        return <ConstructorBox name={item.name} price={item.price} image={item.image} key={item._id}/>
      }), [selectedFilling]
  );

  function onCloseModal() {
    setOrderDetails(false);
  }

  function openOrderModal() {
    const selectedIngredientsIds = ingredients.map((item) => item._id);
    const body = {"ingredients": selectedIngredientsIds};
    const post = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    };

    fetch(`${URL}/orders`, post)
      .then((response) => {
        if(!response.ok) {
          throw new Error('Something went wrong');
        }
        return response.json()
      })
      .then((result) => {
        setOrderDetails(result);
      })
      .catch((error) => console.log(error));
  }

  return(
    <div className={style.wr}>
      <div className={style.block}>
        <div className={style.block__main_item}>
          {selectedBun &&
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${selectedBun.name} (вверх)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          }
        </div>

        {selectedFilling &&
          <div className={style.block__items}>
            {constructorItems}
          </div>
        }

        <div className={style.block__main_item}>
          {selectedBun &&
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${selectedBun.name} (низ)`}
              price={selectedBun.price}
              thumbnail={selectedBun.image}
            />
          }
        </div>
      </div>

      <OrderButton openOrderModal={openOrderModal} selectedIngredientsPrice={[...selectedFillingPrices, selectedBunPrice]}/>

      {orderDetails &&
        <Modal onCloseModal={onCloseModal}>
            <OrderDetails orderDetails={orderDetails} />
        </Modal>
      }
    </div>
  )
};

export default BurgerConstructor;