import style from "./burger-ingredients.module.css"
import Tabs  from "../tabs/tabs";
import IngredientsBox from "../ingredients-box/ingredients-box";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types"

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

BurgerIngredients.PropsType = {
  openModalIngredient: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired
}

export default BurgerIngredients