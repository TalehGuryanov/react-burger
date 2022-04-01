import React from "react";
import style from "./order-card.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const OrderCart: React.FC = () => {
  return (
      <div className={style.order_card}>
        <div className={style.order_card__top}>
          <span className={style.order_card__top_id}>
            id
          </span>
          
          <span className={style.order_card__top_time}>
            time
          </span>
        </div>
        
        <div className={style.order_card__title}>
          Title
        </div>
  
        <div className={style.order_card__bottom}>
          <ul className={style.order_card__bottom_images}>
            <li className={style.order_card__bottom_image}>
              <span className={style.order_card__bottom_image_circle}>
                circle
              </span>
              
              <img src="" alt=""/>
            </li>
          </ul>
          
          <div className={style.order_card__bottom_price}>
            <span>480</span>
  
            <div className={style.order_card__bottom_price_icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderCart;