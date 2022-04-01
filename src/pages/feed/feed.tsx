import React, {useEffect} from "react";
import style from "./feed.module.css"
import {useDispatch} from "../../services/hooks";
import {FeedWsConnectionStartActionCreator} from "../../services/actions/feed";

const Feed: React.FC = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(FeedWsConnectionStartActionCreator());
  });
  
  return (
      <div className={style.feed}>
        <h1 className={style.feed__title + " text text_type_main-large"}>Лента заказов</h1>
        
        <div className={style.feed__content}>
          <div className={style.feed__content_orders}></div>
          
          <div className={style.feed__content_info}></div>
        </div>
      </div>
  )
}

export default Feed