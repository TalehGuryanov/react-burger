import style from "./ingredients-item.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";

function IngredientsItem(props) {
  const { image, id, name, price, type } = props;
  const [{isDrag}, dragRef] = useDrag({
    type: "ingredient",
    item: { image, id, name, price, type },
    collect: monitor => ({isDrag: monitor.isDragging()}),
  });

  return(
    <li className={`${style.wr} ${isDrag ? style.dragging : ""}`} onClick={props.showIngredientModal} id={props.id} ref={dragRef}>
      <Counter count={1} size="default" />
      <div className={style.img}>
        <img src={props.image}
             alt={props.name}
        />
      </div>

      <div className={style.price}>
        <span className={`${"text text_type_main-medium"} ${style.price_icon}`}>
          {props.price}
        </span>
        <div className={style.price_icon}>
          <CurrencyIcon type="primary" />
        </div>
      </div>

      <div className={`${"text text_type_main-default"} ${style.title}`}>
        {props.name}
      </div>
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