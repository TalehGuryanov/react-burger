import React, {useEffect, useMemo, useState} from "react";
import {TOrder} from "../../services/types/web-socket";
import style from "./orders-number-list.module.css"

type TOrdersNumberListProps = {
  orders: TOrder[]
  isDone: boolean
}

const OrdersNumberList: React.FC<TOrdersNumberListProps> = ({ orders, isDone }) => {
  const doneOrdersNumber = useMemo(() =>
          orders.filter(order => order.status === 'done')
                .map(order => order.number), [orders])
  
  const pendingOrdersNumber = useMemo(() =>
          orders.filter(order => order.status === 'pending')
              .map((order, index) => order.number), [orders]);
  const resultOrdersNumber = isDone ? doneOrdersNumber : pendingOrdersNumber;
  
  const colsToRender = useMemo(() => resultOrdersNumber.reduce((acc: number[][], current, index) => {
    const idx = Math.floor(index / 5);
    acc[idx] = acc[idx] || [];
    acc[idx].push(current);
    return acc;
  }, []), [orders])
  
  return (
      <div className={style.orders_number_list}>
        {colsToRender.map((orderNumbers, index) =>
          <div className={style.orders_number_item} key={index}>
            {orderNumbers.map((orderNumber, index) => (
                <div className={ style.orders_number_item__number + " text text_type_digits-default text_color_success"} key={index}>
                  {orderNumber}
                </div>
            ))}
          </div>
        )}
      </div>
  )
}

export default OrdersNumberList