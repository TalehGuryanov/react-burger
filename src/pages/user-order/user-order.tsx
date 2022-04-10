import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {RootState} from "../../services/types";
import {
  userOrdersWsConnectionClosetActionCreator,
  userOrdersWsConnectionStartActionCreator
} from "../../services/actions/user-orders";
import OrderPreview from "../../components/order-preview/order-preview";
import style from "./user-order.module.css"

const UserOrder: React.FC = () => {
  const { userOrdersConnected, userOrdersError, userOrdersRequest, userOrders } = useSelector((store: RootState) => store.userOrdersData)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(userOrdersWsConnectionStartActionCreator());
    
    return(() => {
      dispatch(userOrdersWsConnectionClosetActionCreator());
    })
  }, []);
  
  return (
      <div className={style.user_order_wr}>
        <OrderPreview allOrders={userOrders} wsConnected={userOrdersConnected} wsRequest={userOrdersRequest} wsError={userOrdersError}/>
      </div>
  )
}

export default UserOrder;