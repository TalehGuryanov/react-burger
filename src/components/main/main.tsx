import style from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";

function Main(props: any) {
  return (
    <section className={style.wr}>
      <div className={style.container}>
        <h1 className={`${style.title} ${"text text_type_main-large"}`}>
          Соберите бургер
        </h1>

        <BurgerIngredients data={props.data} />
      </div>
    </section>
  )
}

export default Main;