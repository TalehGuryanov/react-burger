import React, {useEffect} from "react";
import style from "./feed.module.css"
import {useDispatch, useSelector} from "../../services/hooks";
import {feedWsConnectionCloseActionCreator, feedWsConnectionStartActionCreator} from "../../services/actions/feed";
import OrderCardList from "../../components/order-card-list/order-card-list";
import FeedInfo from "../../components/feed-info/feed-info";
import {ErrorMessage} from "../../components/error-message/error-message";
import {Preloader} from "../../components/preloader/preloader";

const Feed: React.FC = () => {
  const { feedOrders, total, totalToday, feedWsClosed, feedWsRequest, feedWsError } = useSelector(store => store.feedOrdersData);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(feedWsClosed || !feedOrders.length) {
      dispatch(feedWsConnectionStartActionCreator());
    }
    
    return(() => {
      dispatch(feedWsConnectionCloseActionCreator());
    })
  }, []);
  
  
  return (
      !feedOrders.length ? <Preloader /> :
      feedWsError? <ErrorMessage /> :
      
      <div className={style.feed}>
        <h1 className={style.feed__title + " text text_type_main-large"}>Лента заказов</h1>
        
        <div className={style.feed__content}>
          <div className={style.feed__content_orders}>
            <OrderCardList orders={feedOrders} />
          </div>
  
            <div className={style.feed__content_info}>
            <FeedInfo orders={feedOrders} total={total} totalToday={totalToday}/>
            </div>
        </div>
      </div>
  )
}

export default Feed