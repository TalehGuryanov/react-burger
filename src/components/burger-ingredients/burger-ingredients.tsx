import style from "./burger-ingredients.module.css"
import Tabs  from "../tabs/tabs";
import IngredientsBox from "../ingredients-box/ingredients-box";

function BurgerIngredients (props: any) {
  return(
    <div className={style.wr}>
      <div className={style.tabs}>
        <Tabs />
      </div>

      <IngredientsBox data={props.data} openModalIngredient={props.openModalIngredient}/>
    </div>
  )
}

export default BurgerIngredients