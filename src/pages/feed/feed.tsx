import React, {useEffect} from "react";
import style from "./feed.module.css"
import {useDispatch, useSelector} from "../../services/hooks";
import {feedWsConnectionStartActionCreator} from "../../services/actions/feed";
import OrderCardList from "../../components/order-card-list/order-card-list";
import {RootState} from "../../services/types";
import FeedInfo from "../../components/feed-info/feed-info";
import {ErrorMessage} from "../../components/error-message/error-message";
import {Preloader} from "../../components/preloader/preloader";

const Feed: React.FC = () => {
  const { orders, total, totalToday, wsConnected, wsRequest } = useSelector((store: RootState) => store.ws);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(feedWsConnectionStartActionCreator(true));
  }, []);
  
  
  return (
      wsRequest ? <Preloader /> :
      <div className={style.feed}>
        <h1 className={style.feed__title + " text text_type_main-large"}>Лента заказов</h1>
        
        <div className={style.feed__content}>
          {!wsConnected && <ErrorMessage />}
          
          <div className={style.feed__content_orders}>
            <OrderCardList orders={orders} />
          </div>
          
          <div className={style.feed__content_info}>
            <FeedInfo orders={orders} total={total} totalToday={totalToday}/>
          </div>
        </div>
      </div>
  )
}

export default Feed