import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types"

function IngredientDetails({ ingredientDetails }) {

  return(
    <div className={style.wr}>
      <div className={style.img}>
        <img src={ingredientDetails.image_large} alt=""/>
      </div>

      <div className={`${style.title} ${"text text_type_main-medium"}`}>
        {ingredientDetails.name}
      </div>

      <ul className={style.composition}>
        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Калории,ккал
            </span>
          <span className={`${"text text_type_digits-default"}`}>
              {ingredientDetails.calories}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Белки, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientDetails.proteins}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Жиры, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientDetails.fat}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Углеводы, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientDetails.carbohydrates}
            </span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propsType = {
  ingredientDetails: PropTypes.shape(ingredientType)
}

export default IngredientDetails;