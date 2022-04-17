import React from "react";
import {TOrder} from "../../services/types/orders";
import style from "./feed-info.module.css";
import OrdersNumberList from "../orders-number-list/orders-number-list";

type TOrderCardList = {
  orders: TOrder[]
  total: number
  totalToday: number
}

const FeedInfo: React.FC<TOrderCardList> = ({orders,total,totalToday}) => {
  
  return (
      <div className={style.feed_info_wr}>
        <div className={style.feed_info__top}>
          <div className={style.feed_info__top_col}>
            <div className={style.feed_info__top_col__title + " text text_type_main-medium"}>
              Готовы:
            </div>
  
            <OrdersNumberList orders={orders} isDone={true}/>
          </div>
  
          <div className={style.feed_info__top_col}>
            <div className={style.feed_info__top_col__title + " text text_type_main-medium"}>
              В работе:
            </div>
    
            <OrdersNumberList orders={orders} isDone={false}/>
          </div>
        </div>
        
        <div className={style.feed_info__middle}>
          <span className="text text_type_main-medium">Выполнено за все время:</span>
          <div className={style.feed_info__middle_text + " text text_glowing text_type_digits-large"}>
            {total}
          </div>
        </div>
  
        <div className={style.feed_info__bottom}>
          <span className="text text_type_main-medium">Выполнено за сегодня:</span>
          <div className={style.feed_info__bottom_text + " text text_glowing text_type_digits-large"}>
            {totalToday}
          </div>
        </div>
      </div>
  )
}

export default FeedInfo;