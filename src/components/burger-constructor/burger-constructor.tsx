import {ConstructorElement} from "@ya.praktikum/react-developer-burger-ui-components";
import style from "./burger-constructor.module.css"
import OrderButton from "../order-button/order-button";
import ConstructorBox from "../constructor-box/constructor-box";

function BurgerConstructor() {
  return(
    <div className={style.wr}>
      <ConstructorBox />
      <OrderButton />
    </div>
  )
};

export default BurgerConstructor;