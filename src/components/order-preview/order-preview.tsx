import React, {useEffect, useMemo, useState} from "react";
import style from "./order-preview.module.css";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {useParams} from "react-router-dom";
import {ErrorMessage} from "../error-message/error-message";
import {Preloader} from "../preloader/preloader";
import {TIngredient} from "../../services/types/ingredientsTypes";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {feedWsConnectionStartActionCreator} from "../../services/actions/feed";


const OrderPreview: React.FC = () => {
  const [ingredientCount, setIngredientCount] = useState(null);
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  const { orders, wsConnected, wsRequest } = useSelector((store: RootState) => store.ws);
  const dispatch = useDispatch();
  const {id} : {id: string} = useParams();
  
  useEffect(() => {
    if(!wsConnected || !orders.length) {
      dispatch(feedWsConnectionStartActionCreator(true));
    }
  }, []);
  
  const selectedOrder = useMemo(() => orders.find(order => order.number === Number(id)), [orders]);
  const orderIngredients: (TIngredient | undefined)[] | undefined = selectedOrder?.ingredients.map((id) =>
      ingredientItems.find((ingredient) => ingredient._id === id))
  const calcIngredientCount = () => {
    let names: any | {string: number} = {};
    
    orderIngredients?.forEach((item) => {
      if(item) {
        names[item._id] = (names[item._id] || 0) + 1;
      }
    });
  
    setIngredientCount(names)
  }
  const uniqueOrderIngredients = Array.from(new Set(orderIngredients));
  
  useEffect(() => {
      calcIngredientCount();
  }, [])
  
  const content = () => {
    return (
        selectedOrder &&
        <div className={style.order_preview_wr}>
          <div className={style.order_preview__number + " text text_type_digits-default"}>
            #{selectedOrder.number}
          </div>
          
          <div className={style.order_preview__title + " text text_type_main-medium"}>
            {selectedOrder.name}
          </div>
  
          <div className={style.order_preview__status + " text text_color_success"}>
            {selectedOrder.status}
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
                        {ingredientCount && ingredientCount[orderIngredient._id]} x {orderIngredient.price}
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
        </div>
    )
  }
  
  const renderContent: () => React.ReactNode = () => {
    if(!wsConnected) {
      return <ErrorMessage />
    } else {
      return content()
    }
  }
  
  return (
      <>
        {wsRequest ? <Preloader /> : renderContent()}
      </>
  )
}

export default OrderPreview