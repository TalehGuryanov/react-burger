import style from "./ingredient-details.module.css";
import PropTypes from "prop-types";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientDetails(props: any) {
  const ingredientsData = props.ingredientsDetails;

  return(
    <div className={style.wr}>
      <div className={style.header}>
        <h3 className={`${style.header__title} ${"text text_type_main-large"}`}>
          Детали ингредиента
        </h3>

        <div className={style.header__icon_close}>
          <CloseIcon type="primary" onClick={props.onCloseModal}/>
        </div>
      </div>

      <div className={style.img}>
        <img src={ingredientsData.image_large} alt=""/>
      </div>

      <div className={`${style.title} ${"text text_type_main-medium"}`}>
        {ingredientsData.name}
      </div>

      <ul className={style.composition}>
        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Калории,ккал
            </span>
          <span className={`${"text text_type_digits-default"}`}>
              {ingredientsData.calories}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Белки, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientsData.proteins}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Жиры, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientsData.fat}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Углеводы, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientsData.carbohydrates}
            </span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propsType = {
  ingredientsData: PropTypes.shape({
    name: PropTypes.string,
    carbohydrates: PropTypes.string,
    fat: PropTypes.string,
    proteins: PropTypes.string,
    calories: PropTypes.string,
    image_large: PropTypes.string
  }).isRequired,
  onCloseModal: PropTypes.func
}

export default IngredientDetails;