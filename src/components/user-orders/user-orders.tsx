import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {
  userOrdersWsConnectionClosetActionCreator,
  userOrdersWsConnectionStartActionCreator
} from "../../services/actions/user-orders";
import {RootState} from "../../services/types";
import {Preloader} from "../preloader/preloader";
import {ErrorMessage} from "../error-message/error-message";
import OrderCardList from "../order-card-list/order-card-list";
import style from "./user-orders.module.css"

const UserOrders: React.FC = () => {
  const { userOrdersClosed, userOrdersError, userOrdersRequest, userOrders } = useSelector((store: RootState) => store.userOrdersData)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(userOrdersClosed || !userOrders.length) {
      dispatch(userOrdersWsConnectionStartActionCreator());
    }
    
    return (() => {
      dispatch(userOrdersWsConnectionClosetActionCreator())
    })
  }, []);
  
  return (
        userOrdersRequest ? <Preloader /> :
        userOrdersError ? <ErrorMessage /> :
        <div className={style.user_orders__wr}>
          <OrderCardList orders={userOrders} />
        </div>
  )
}

export default UserOrders