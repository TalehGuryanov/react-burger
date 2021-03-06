import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import React, {ReactNode} from "react";
import OrderDetails from "../order-details/order-details";
import {Modal} from "../modal/modal";
import ConstructorBox from "../constructor-box/constructor-box";
import {useDispatch, useSelector} from "../../services/hooks";
import {
  swapIngredients, addItemActionCreator, deleteItemActionCreator, addBunActionCreator, cleanConstructorActionCreator
} from "../../services/actions/constuctor";
import burger from "../../images/burger.png";
import {Preloader} from "../preloader/preloader";
import {ErrorMessage} from "../error-message/error-message";
import {RootState, TIsLogged} from "../../services/types";
import {useDrop} from "react-dnd";
import {closeOrderModalActionCreator, openOrderModalActionCreator} from "../../services/actions/modal";
import {orderThunk} from "../../services/actions/order";
import {TIngredient} from "../../services/types/ingredientsTypes";
import {getCookie} from "../../utils/cookie";

type TBurgerConstructorProps = {
  isLogged: TIsLogged
}

const BurgerConstructor: React.FC<TBurgerConstructorProps> = ({isLogged}) => {
  const { fillingItems, bun } = useSelector(store => store.constructorData);
  const { orderData, orderRequest, orderFailed } = useSelector(store => store.order);
  const { isOrderModalOpen } = useSelector(store => store.modal);
  const dispatch = useDispatch();

  // Added bun to constructor
  const addBun: (item: TIngredient) => void = (item) => {
    dispatch(addBunActionCreator(item))
  }

  // Added filling to constructor
  const addFilling: (item: TIngredient) => void = (item) => {
    item.index = item.id ? Number(item.id + Math.floor(Math.random() * 100)) : 0 ;
    dispatch(addItemActionCreator(item));
  }

  // Removed bun from constructor
  const removeFilling: (item: TIngredient) => void = (item) => {
    dispatch(deleteItemActionCreator(item.index));
  }

  const cleanConstructor: () => void = () => {
    dispatch(cleanConstructorActionCreator())
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(item: TIngredient) {
      if(item.type === "bun") {
        addBun(item)
      } else {
        addFilling(item)
      }
    },
    collect: monitor => ({isHover: monitor.isOver()})
  });
  const isEmpty = fillingItems.length || bun;

  // Get burger price
  const bunPrice: number = bun ? bun.price * 2 : 0;
  const fillingDataPrices = React.useMemo( () => fillingItems.map((item) => item.price), [fillingItems]);

  // Get elements id's
  const bunId = bun ? bun.id : null;
  const fillingIds = React.useMemo(() => fillingItems.map((item) => item.id), [fillingItems]);
  const constructorItemsIds =[...fillingIds, bunId];

  // Work with feed-order modal
  const onCloseModal: () => void = () => {
    dispatch(closeOrderModalActionCreator())
  }
  const openModal: () => void = () => {
    dispatch(openOrderModalActionCreator());
  }
  const showOrderData: () => void = () => {
    const accessToken = getCookie("accessToken");
    
    if(constructorItemsIds) {
      const body = {"ingredients": constructorItemsIds};
      const post: RequestInit = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken
        },
        body: JSON.stringify(body)
      };

      dispatch(orderThunk(post));
      cleanConstructor();
      openModal();
    }
  }

  const modalContent: () => ReactNode = () => {
    if(orderRequest) {
      return <Preloader />
    } else if(orderFailed) {
      return <ErrorMessage />
    } else {
      return <OrderDetails orderDetails={orderData} />
    }
  }

  // Swapping ingredients
  const moveIngredients: (dragIndex: number | undefined, hoverIndex: number | undefined) => void = (dragIndex, hoverIndex) => {
    if(dragIndex && dragIndex >= 0) {
      dispatch(swapIngredients(fillingItems, dragIndex, hoverIndex));
    }
  }

  const fillingItem = React.useMemo(() =>
      fillingItems.map((item, index) =>
        <ConstructorBox name={item.name}
                        price={item.price}
                        image={item.image}
                        key={index}
                        index={index}
                        removeItem={() => removeFilling(item)}
                        moveIngredients={moveIngredients}
        />
      ),
    [fillingItems]);

  const burgerIcon =
    <div className={style.burger_img_wr}>
      <img className={`${style.burger_img} ${isHover ? style.burger_img__hover : ""}`} src={burger} alt="Burger image"/>
    </div>

  return(
    <div className={style.wr} ref={dropTarget} data-test="constructor-dropzone">
      {isEmpty ?
        <>
          <div className={style.block}>
            <div className={style.block__main_item}>
              {bun &&
              <ConstructorElement
                type="top"
                isLocked={true}
                text={`${bun.name} (??????????)`}
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
                text={`${bun.name} (??????)`}
                price={bun.price}
                thumbnail={bun.image}
              />
              }
            </div>
          </div>
          <OrderButton selectedIngredientsPrice={[...fillingDataPrices, bunPrice]} showOrderData={showOrderData} isLogged={isLogged}/>
        </> : burgerIcon
      }
      {isOrderModalOpen && <Modal onCloseModal={onCloseModal}>{modalContent()}</Modal>}
    </div>
  )
};

export default BurgerConstructor;
