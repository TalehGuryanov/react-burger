import React, {useMemo, useState} from "react";
import style from './order-card-list.module.css'
import {useSelector} from "../../services/hooks";
import OrderCart from "../order-card/order-card";
import {TOrder} from "../../services/types/orders";
import {TIngredient} from "../../services/types/ingredientsTypes";

type TOrderCardList = {
  orders: TOrder[]
}

const OrderCardList: React.FC<TOrderCardList> = ({orders}) => {
  const { ingredientItems }  = useSelector(store => store.ingredients);
  
  const orderCard = useMemo(() =>
      orders.map((order, index) => {
        
        const orderIngredients: (TIngredient | undefined)[] = order.ingredients.map((id) =>
            ingredientItems.find((ingredient) => ingredient._id === id))
  
          const ingredientsImages = orderIngredients.map((orderIngredient) => orderIngredient?.image_mobile)
          const orderPrice: number = orderIngredients.reduce((acc, ingredient) => {
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