import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import ConstructorBox from "../constructor-box/constructor-box";
import React from "react";
import PropTypes from "prop-types";

function BurgerConstructor(props: any) {
  const burgerItems = React.useMemo(
    () => props.data.filter((item: { type: string; }) => item.type !== "bun"),
    [props.data]
  );

  const constructorItems = React.useMemo(
    () =>
      burgerItems.map((item: {
        _id: any;
        image: string;
        price: number;
        name: string;
        type: string; }) => {
        return <ConstructorBox name={item.name} price={item.price} image={item.image} key={item._id}/>
      }), [props.data]
  );

  const topBunData = {
    name: "Краторная булка N-200i (верх)",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    price: 20
  }

  const bottomBunData = {
    name: "Краторная булка N-200i (низ)",
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    price: 20
  }

  return(
    <div className={style.wr}>
      <div className={style.block}>
        <div className={style.block__main_item}>
          <ConstructorElement
            type="top" isLocked={true}
            text={topBunData.name}
            price={topBunData.price}
            thumbnail={topBunData.image}
          />
        </div>

        <div className={style.block__items}>
          {constructorItems}
        </div>

        <div className={style.block__main_item}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={bottomBunData.name}
            price={bottomBunData.price}
            thumbnail={bottomBunData.image}
          />
        </div>
      </div>

      <OrderButton openOrderModal={props.openOrderModal}/>
    </div>
  )
};

BurgerConstructor.propsType = {
  data: PropTypes.array.isRequired,
}

export default BurgerConstructor;