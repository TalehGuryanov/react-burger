import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./constructor-box.module.css"
import PropTypes from "prop-types";

function ConstructorBox (props: { name: string; price: number; image: string; }) {
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
      />
    </div>
  )
}

ConstructorBox.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
}

export  default ConstructorBox;