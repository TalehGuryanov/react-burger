import React, {useEffect} from "react";
import style from "./feed.module.css"
import {useDispatch, useSelector} from "../../services/hooks";
import {feedWsConnectionStartActionCreator} from "../../services/actions/feed";
import OrderCardList from "../../components/order-card-list/order-card-list";
import {RootState} from "../../services/types";

const Feed: React.FC = () => {
  const { orders, wsConnected, wsRequest } = useSelector((store: RootState) => store.ws);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(feedWsConnectionStartActionCreator(true));
  }, []);
  
  return (
      <div className={style.feed}>
        <h1 className={style.feed__title + " text text_type_main-large"}>Лента заказов</h1>
        
        <div className={style.feed__content}>
          <div className={style.feed__content_orders}>
            <OrderCardList orders={orders} wsConnected={wsConnected} wsRequest={wsRequest}/>
          </div>
          
          <div className={style.feed__content_info}></div>
        </div>
      </div>
  )
}

export default Feed