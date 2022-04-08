import React, {useMemo, useState} from "react";
import style from './order-card-list.module.css'
import {useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import OrderCart from "../order-card/order-card";
import {ErrorMessage} from "../error-message/error-message";
import {Preloader} from "../preloader/preloader";
import {TOrder} from "../../services/types/web-socket";
import {TIngredient} from "../../services/types/ingredientsTypes";

type TOrderCardList = {
  orders: TOrder[]
}

const OrderCardList: React.FC<TOrderCardList> = ({orders}) => {
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  
  const orderCard = useMemo(() =>
      orders.map((order: TOrder, index: number) => {
        
        const orderIngredients: (TIngredient | undefined)[] = order.ingredients.map((id) =>
            ingredientItems.find((ingredient) => ingredient._id === id))
  
          const ingredientsImages = orderIngredients.map((orderIngredient) => orderIngredient?.image_mobile)
          const orderPrice: number = orderIngredients.reduce((acc: number, ingredient) => {
            return ingredient ? acc + ingredient.price : acc
          }, 0)
  
          return <OrderCart order={order} key={index} ingredientsImages={ingredientsImages} price={orderPrice}/>
      }), [orders, ingredientItems])
  

  return (
    <div className={style.order_list}>
      {orderCard}
    </div>
  )
}

export default OrderCardList