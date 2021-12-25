import style from "./ingredients-item.module.css"
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientsItem(props: any) {
  return(
    <li className={style.wr} onClick={props.onOpen} id={props.id}>
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
  onOpen: PropTypes.func,
  image: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.number
}

export default IngredientsItem;