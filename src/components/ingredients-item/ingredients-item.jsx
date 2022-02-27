import style from "./ingredients-item.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

function IngredientsItem({ image, id, name, price, type }) {
  const { fillingItems, bun } = useSelector((store) => store.constructorData);
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: { image, id, name, price, type },
    collect: monitor => ({isDrag: monitor.isDragging()}),
  });
  const [count, updateCount] = useState(0);
  const setCount = () => {
    if(bun && bun.id === id) {
      return 2
    } else if (fillingItems.length) {
      return fillingItems.filter(item => item.id === id).length
    }
  };
  useEffect(() => {
    updateCount(setCount());
  }, [setCount])

  return(
    <li className={`${style.wr} ${isDrag ? style.dragging : ""}`} id={id} ref={dragRef}>
      <Link
        to={{
          pathname: `/ingredients/${id}`,
          state: { isModal: true },
        }}
        style={{ textDecoration: 'none' }}
      >
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
      </Link>
    </li>
  )
}

IngredientsItem.propType = {
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
  type: PropTypes.string
}

export default IngredientsItem;
