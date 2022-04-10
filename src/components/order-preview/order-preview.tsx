import React, {useMemo} from "react";
import style from "./order-preview.module.css";
import {useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {useParams} from "react-router-dom";
import {TIngredient} from "../../services/types/ingredientsTypes";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {TOrder} from "../../services/types/orders";
import formatTime from "../../utils/format-time";
import {ErrorMessage} from "../error-message/error-message";

type OrderPreviewProps = {
  allOrders: TOrder[]
}

const OrderPreview: React.FC<OrderPreviewProps> = ({allOrders}) => {
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  const {id} : {id: string} = useParams();
  const status: () => string = () => {
    switch (selectedOrder?.status) {
      case "done": return "Выполнен";
      case "pending": return "Готовится";
      case "created": return "Создан";
      default: return ''
    }
  }
  const selectedOrder = useMemo(() => allOrders.find(order => order.number === Number(id)), [allOrders]);
  const orderIngredients: (TIngredient | undefined)[] | undefined = selectedOrder?.ingredients.map((id) =>
      ingredientItems.find((ingredient) => ingredient._id === id))
  const calcIngredientCount = (id: string) => {
    let names: any | {string: number} = {};
    
    orderIngredients?.forEach((item) => {
      if(item) {
        names[item._id] = (names[item._id] || 0) + 1;
      }
    });
    
    return names[id]
  }
  const uniqueOrderIngredients = Array.from(new Set(orderIngredients));
  const date = formatTime(selectedOrder?.createdAt || '');
  const orderPrice: number | undefined = orderIngredients?.reduce((acc: number, ingredient) => {
    return ingredient ? acc + ingredient.price : acc
  }, 0)
  
  const isOrderDone = selectedOrder?.status === "done";
  
  return (
      selectedOrder ? <div className={style.order_preview_wr}>
        <div className={style.order_preview__number + " text text_type_digits-default"}>
          #{selectedOrder.number}
        </div>
        
        <div className={style.order_preview__title + " text text_type_main-medium"}>
          {selectedOrder.name}
        </div>
        
        <div className={style.order_preview__status + " text text_type_main-default" + `${isOrderDone ? " text_color_success" : ""}`}>
          {status()}
        </div>
        
        <div className={style.order_preview__ingredients_title + " text text_type_main-medium"}>
          Состав
        </div>
        
        <ul className={style.order_preview__ingredients_list}>
          {uniqueOrderIngredients?.map((orderIngredient, index) => {
            if(orderIngredient) {
              return (
                  <li className={style.order_preview__ingredients_item} key={index}>
                    <div className={style.order_preview__ingredients_item__info}>
                      <div className={style.order_preview__ingredients_item__info_img}>
                        <img src={orderIngredient?.image_mobile} alt={orderIngredient?.name} />
                      </div>
                      
                      <div className={style.order_preview__ingredients_item__info_name + " text text_type_main-default"}>
                        {orderIngredient?.name}
                      </div>
                    </div>
                    
                    <div className={style.order_preview__ingredients_item__price}>
                      
                      <span className="text text_type_digits-default">
                        {calcIngredientCount(orderIngredient._id)} x {orderIngredient.price}
                      </span>
                      
                      <div>
                        <CurrencyIcon type="primary" />
                      </div>
                    </div>
                  </li>
              )
            }
          })}
        </ul>
        
        <div className={style.order_preview__ingredients_bottom}>
          <div className={"text text_type_main-default text_color_inactive"}>{date}</div>
          
          <div className={style.order_preview__ingredients_bottom__price}>
              <span className="text text_type_digits-default">
                {orderPrice}
              </span>
            
            <div className={style.order_preview__ingredients_bottom__price_icon}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
      : <ErrorMessage/>
  )
}

export default OrderPreview;