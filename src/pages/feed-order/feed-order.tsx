import React, {useEffect} from "react";
import OrderPreview from "../../components/order-preview/order-preview";
import style from "./feed-order.module.css"
import {feedWsConnectionStartActionCreator} from "../../services/actions/feed";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {Preloader} from "../../components/preloader/preloader";
import {ErrorMessage} from "../../components/error-message/error-message";

const FeedOrder: React.FC = () => {
  const { feedOrders, feedWsClosed, feedWsRequest, feedWsError } = useSelector(store => store.feedOrdersData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(feedWsClosed || !feedOrders.length) {
      dispatch(feedWsConnectionStartActionCreator());
    }
  }, []);
  return (
      feedWsRequest ? <Preloader />:
      feedWsError ? <ErrorMessage /> :
      <div className={style.feed_order_wr}>
        <OrderPreview allOrders={feedOrders} />
      </div>
  )
}

export default FeedOrder;