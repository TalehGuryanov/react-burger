import style from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";

function Main(props: any) {
  return (
    <section className={style.wr}>
      <div className={style.container}>
        <h1 className={`${style.title} ${"text text_type_main-large"}`}>
          Соберите бургер
        </h1>

        <div className={style.content}>
          <BurgerIngredients data={props.data} openModalIngredient={props.openModalHandlers.openIngredient} />
          <BurgerConstructor data={props.data} openOrderModal={props.openModalHandlers.openOrder} />
        </div>
      </div>
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  openModalHandlers: PropTypes.objectOf(PropTypes.func)
}

export default Main;