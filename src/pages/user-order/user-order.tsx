import React, {useEffect} from "react";
import {useDispatch, useSelector} from "../../services/hooks";
import {userOrdersWsConnectionStartActionCreator} from "../../services/actions/user-orders";
import OrderPreview from "../../components/order-preview/order-preview";
import style from "./user-order.module.css"
import {Preloader} from "../../components/preloader/preloader";
import {ErrorMessage} from "../../components/error-message/error-message";

const UserOrder: React.FC = () => {
  const { userOrdersClosed, userOrdersError, userOrdersRequest, userOrders } = useSelector(store => store.userOrdersData)
  const dispatch = useDispatch();
  
  useEffect(() => {
    if(userOrdersClosed || !userOrders.length) {
      dispatch(userOrdersWsConnectionStartActionCreator());
    }
  }, []);
  
  return (
      !userOrders.length ? <Preloader /> :
      userOrdersError ? <ErrorMessage /> :
      <div className={style.user_order_wr} >
        <OrderPreview allOrders={userOrders} />
      </div>
  )
}

export default UserOrder;