import React, {useEffect} from "react";
import OrderPreview from "../../components/order-preview/order-preview";
import style from "./feed-order.module.css"
import {feedWsConnectionStartActionCreator} from "../../services/actions/feed";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";

const FeedOrder: React.FC = () => {
  const { feedOrders, feedWsConnected, feedWsRequest, feedWsError } = useSelector((store: RootState) => store.feedOrdersData);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(!feedWsConnected || !feedOrders.length) {
      dispatch(feedWsConnectionStartActionCreator());
    }
  }, []);
  return (
      <div className={style.feed_order_wr}>
        <OrderPreview allOrders={feedOrders} wsConnected={feedWsConnected} wsRequest={feedWsRequest} wsError={feedWsError}/>
      </div>
  )
}

export default FeedOrder;