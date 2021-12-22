import style from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

function Main(props: any) {
  return (
    <section className={style.wr}>
      <div className={style.container}>
        <h1 className={`${style.title} ${"text text_type_main-large"}`}>
          Соберите бургер
        </h1>

        <div className={style.content}>
          <BurgerIngredients data={props.data} />
          <BurgerConstructor />
        </div>
      </div>
    </section>
  )
}

export default Main;