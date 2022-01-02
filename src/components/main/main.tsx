import style from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types";
import { IngredientsContext } from "../../utils/ingredients-context";
import React from "react";

function Main(props: any) {

  const burgerBuns = React.useMemo(
    () => props.data.find((item: { type: string; }) => item.type === "bun"),
    [props.data]
  );

  return (
    <section className={style.wr}>
      <div className={style.container}>
        <h1 className={`${style.title} ${"text text_type_main-large"}`}>
          Соберите бургер
        </h1>

        <div className={style.content}>
          <BurgerIngredients data={props.data} />

          <IngredientsContext.Provider value={burgerBuns}>
            <BurgerConstructor />
          </IngredientsContext.Provider>
        </div>
      </div>
    </section>
  )
}

Main.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired,
  openModalHandlers: PropTypes.objectOf(PropTypes.func),
  setState: PropTypes.func
}

export default Main;