import React, {useMemo} from "react";
import style from "./order-card.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../services/types/web-socket";
import formatTime from "../../utils/format-time";

type TOrderCartProps = {
  order: TOrder
  ingredientsImages: (string | undefined)[]
  price: number
}

const OrderCart: React.FC<TOrderCartProps> = ({order, ingredientsImages, price}) => {
  const date = formatTime(order.createdAt);
  
  const reducedImages = ingredientsImages.slice(0,6);
  const isLastImage: (index: number) => boolean = (index) => reducedImages.length - 1 === index;
  const diff = ingredientsImages.length - reducedImages.length
  const ingredientImage = useMemo(() => reducedImages
      .map((image, index) =>
          <li className={style.order_card__bottom_image}
              key={index}
              style={{zIndex: index, transform: `translateX(${-index * 10}px)`}}
          >
            <img src={image}
                 alt=""
            />
            
            {!!diff && isLastImage(index) && (<span data-index={index} className="text text_type_main-default">+{diff}</span>)}
          </li>
      ), [ingredientsImages])
  
  return (
      <div className={style.order_card}>
        <div className={style.order_card__top}>
          <span className={style.order_card__top_id + " text text_type_digits-default"}>
            #{order.number}
          </span>
          
          <span className={style.order_card__top_time + " text text_type_main-default text_color_inactive"}>
            {date}
          </span>
        </div>
        
        <div className={style.order_card__title + " text text_type_main-medium"}>
          {order.name}
        </div>
  
        <div className={style.order_card__bottom}>
          <ul className={style.order_card__bottom_images}>
            {ingredientImage}
          </ul>
          
          <div className={style.order_card__bottom_price}>
            <span className={"text text_type_digits-default"}>{price}</span>
  
            <div className={style.order_card__bottom_price_icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
  )
}

export default OrderCart;