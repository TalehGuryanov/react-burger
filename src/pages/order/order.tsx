import React from "react";
import OrderPreview from "../../components/order-preview/order-preview";
import style from "./order.module.css"

const Order: React.FC = () => {
  return (
      <div className={style.order_wr}>
        <OrderPreview/>
      </div>
  )
}

export default Order;