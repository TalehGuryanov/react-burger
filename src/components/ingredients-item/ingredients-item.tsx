import style from "./ingredients-item.module.css"
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

function IngredientsItem(props: any) {
  return(
    <li className={style.wr} onClick={props.openIngredientModal} id={props.id}>
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
  openModalHandlers: PropTypes.objectOf(PropTypes.func).isRequired,
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired
}

export default IngredientsItem;