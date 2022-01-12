import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-box.module.css"
import PropTypes from "prop-types";

function ConstructorBox (props) {
  return (
    <div className={style.item}>
      <div className={style.item_icon}>
        <DragIcon type="primary" />
      </div>

      <ConstructorElement
        type={undefined}
        isLocked={false}
        text={props.name}
        price={props.price}
        thumbnail={props.image}
        handleClose={props.removeItem}
      />
    </div>
  )
}

ConstructorBox.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  image: PropTypes.string,
  removeItem: PropTypes.func
}

export  default ConstructorBox;