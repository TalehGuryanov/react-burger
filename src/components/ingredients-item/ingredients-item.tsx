import style from "./ingredients-item.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "../../services/hooks";
import React, {useEffect, useState} from "react";
import {RootState} from "../../services/types";
import {TIngredient} from "../../services/types/ingredientsTypes";

type TIngredientsItemProps = {
  id: string;
  image: string;
  name: string;
  price: number;
  type: string;
  onClick: () => void;
};

const IngredientsItem: React.FC<TIngredientsItemProps> = ({ image, id, name, price, type, onClick}) => {
  const { fillingItems, bun } = useSelector((store: RootState) => store.constructorData);
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: { image, id, name, price, type },
    collect: monitor => ({isDrag: monitor.isDragging()}),
  });
  const [count, updateCount] = useState<number>(0);
  const setCount: () => number = () => {
    if(bun && bun.id === id) {
      return 2
    } else if (fillingItems.length) {
      return fillingItems.filter((item: TIngredient) => item.id === id).length
    } else return 0
  };

  useEffect(() => {
    updateCount(setCount());
  }, [setCount]);
  
  return(
    <li className={`${style.wr} ${isDrag ? style.dragging : ""}`} id={id} ref={dragRef} onClick={onClick}>
      <div>
        {count > 0 && <Counter count={count} size="default"/>}
        <div className={style.img}>
          <img src={image}
               alt={name}
          />
        </div>

        <div className={style.price}>
          <span className={`${"text text_type_main-medium"} ${style.price_icon}`}>
            {price}
          </span>
          <div className={style.price_icon}>
            <CurrencyIcon type="primary" />
          </div>
        </div>

        <div className={`${"text text_type_main-default"} ${style.title}`}>
          {name}
        </div>
      </div>
    </li>
  )
}

export default IngredientsItem;
