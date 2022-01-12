import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import React from "react";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import ConstructorBox from "../constructor-box/constructor-box";
import {useDispatch, useSelector} from "react-redux";
import { useDrop } from "react-dnd";
import { ADD_ITEM_TO_CONSTRUCTOR, DELETE_ITEM_FROM_CONSTRUCTOR, ADD_BUN_TO_CONSTRUCTOR, HIDE_ORDER_DATA } from "../../services/actions/actions";
import burger from "../../images/burger.png";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";

function BurgerConstructor() {
  const { fillingItems, bun } = useSelector((store) => store.constructorData);
  const { orderData, orderRequest, orderFailed } = useSelector((store) => store.order);
  const { showOrderModal } = useSelector((store) => store.orderModal);
  const dispatch = useDispatch();

  // Added bun to constructor
  const addBun = (bun) => {
    dispatch({type: ADD_BUN_TO_CONSTRUCTOR, bun: bun})
  }

  // Added filling to constructor
  const addFilling = (item) => {
    item.index = item.id + Math.floor(Math.random() * 100);
    dispatch({type: ADD_ITEM_TO_CONSTRUCTOR, item: item});
  }

  // Removed bun from constructor
  const removeFilling = (index) => {
    dispatch({type: DELETE_ITEM_FROM_CONSTRUCTOR, index })
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item) {
      if(item.type === "bun") {
        addBun(item)
      } else {
        addFilling(item)
      }
    },
    collect: monitor => ({isHover: monitor.isOver()})
  });

  // Get burger price
  const bunPrice = bun ? bun.price * 2 : null;
  const fillingDataPrices = React.useMemo( () => fillingItems.map((item) => item.price), [fillingItems]);

  // Get elements id's
  const bunId = bun ? bun.id : null;
  const fillingIds = React.useMemo(() =>fillingItems.map((item) => item.id), [fillingItems]);
  const constructorItemsIds =[...fillingIds, bunId];


  const fillingItem = React.useMemo(() =>
    fillingItems.map((item) =>
      <ConstructorBox name={item.name} price={item.price} image={item.image} key={item.index} removeItem={() => removeFilling(item.index)}/>),
  [fillingItems]);
  const isEmpty = fillingItems.length || bun;

  const modalContent = () => {
    if(orderRequest) {
      return <Preloader />
    } else if(orderFailed) {
      return <ErrorMessage />
    } else {
      return <OrderDetails orderDetails={orderData} onCloseModal={onCloseModal}/>
    }
  }

  const burgerIcon = <div className={style.burger_img_wr}><img className={`${style.burger_img} ${isHover ? style.burger_img__hover : ""}`} src={burger} alt="Burger image"/></div>

  function onCloseModal() {
    dispatch({type: HIDE_ORDER_DATA})
  }

  return(
    <div className={style.wr} ref={dropTarget}>
      {isEmpty ?
        <>
          <div className={style.block}>
            <div className={style.block__main_item}>
              {bun &&
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (вверх)`}
                price={bun.price}
                thumbnail={bun.image}
              />
              }
            </div>

            {fillingItems &&
            <div className={style.block__items}>
              {fillingItem}
            </div>
            }

            <div className={style.block__main_item}>
              {bun &&
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={`${bun.name} (низ)`}
                price={bun.price}
                thumbnail={bun.image}
              />
              }
            </div>
          </div>
          <OrderButton selectedIngredientsPrice={[...fillingDataPrices, bunPrice]} constructorItemsIds={constructorItemsIds}/>
        </> : burgerIcon
      }
      {showOrderModal && <Modal onCloseModal={onCloseModal}>{modalContent()}</Modal>}
    </div>
  )
};

export default BurgerConstructor;