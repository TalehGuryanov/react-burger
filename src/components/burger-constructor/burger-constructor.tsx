import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import ConstructorBox from "../constructor-box/constructor-box";
import React from "react";
import PropTypes from "prop-types";

function BurgerConstructor(props: any) {
  const burgerItems = props.data.filter((item: { type: string; }) => item.type !== "bun");
  const constructorItems = burgerItems.map((item: {
    _id: any;
    image: string;
    price: number;
    name: string;
    type: string; }) => {
    return <ConstructorBox name={item.name} price={item.price} image={item.image} key={item._id}/>
  });

  const burgerBuns = props.data.filter((item: { type: string; }) => item.type === "bun");
  const topBun = burgerBuns.map(
    (item: {
      image: string;
      name: string;
      price: number;
    }, index: number) => {
    if(index === 0) {
      return (
      <ConstructorElement
        type="top" isLocked={true}
        text={`${item.name} (вверх)`}
        price={item.price}
        thumbnail={item.image}
      />)
    }
  });

  const bottomBun = burgerBuns.map(
    (item: {
      image: string;
      name: string;
      price: number;
    }, index: number) => {
      if(index === 0) {
        return (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${item.name} (низ)`}
            price={item.price}
            thumbnail={item.image}
          />)
      }
    })

  return(
    <div className={style.wr}>
      <div className={style.block}>
        <div className={style.block__main_item}>
          {topBun}
        </div>

        <div className={style.block__items}>
          {constructorItems}
        </div>

        <div className={style.block__main_item}>
          {bottomBun}
        </div>
      </div>

      <OrderButton onOpen={props.handlers.openOrder}/>
    </div>
  )
};

BurgerConstructor.propsType = {
  data: PropTypes.array,
}

export default BurgerConstructor;