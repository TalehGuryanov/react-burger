import style from "./main.module.css"
import React from "react";
import {HTML5Backend} from "react-dnd-html5-backend";
import BurgerIngredients from "../../components/burger-ingredients/burger-ingredients";
import BurgerConstructor from "../../components/burger-constructor/burger-constructor";
import {DndProvider} from "react-dnd";
import PropTypes from "prop-types";

function Main({isLogged}) {

  return (
    <section className={style.wr}>
      <div className={style.container}>
        <h1 className={`${style.title} ${"text text_type_main-large"}`}>
          Соберите бургер
        </h1>

        <DndProvider backend={HTML5Backend}>
          <div className={style.content}>
            <BurgerIngredients />

            <BurgerConstructor isLogged={isLogged}/>
          </div>
        </DndProvider>
      </div>
    </section>
  )
}

Main.propType = {
  isLogged: PropTypes.bool.isRequired
}

export default Main;
