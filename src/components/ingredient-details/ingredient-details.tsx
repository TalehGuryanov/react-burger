import style from "./ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addIngredientDataActionCreator} from "../../services/actions/ingredient-data";
import React, {useEffect} from "react";
import {AppDispatch, RootState, TIngredient} from "../../services/types";

type TSelectedIngredientId = {
  id: string
}

const IngredientDetails: React.FC = () => {
  const { id }: TSelectedIngredientId = useParams();
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  const { ingredientData } = useSelector((store: RootState) => store.currentIngredient);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    if(ingredientItems.length) {
      const selectedIngredient = ingredientItems.find((burger: TIngredient) => burger._id === id);

      dispatch(addIngredientDataActionCreator(selectedIngredient));
    }
  }, [ingredientItems]);

  return(
    <div className={style.wr}>
      <div className={style.img}>
        <img src={ingredientData.image_large} alt=""/>
      </div>

      <div className={`${style.title} ${"text text_type_main-medium"}`}>
        {ingredientData.name}
      </div>

      <ul className={style.composition}>
        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Калории,ккал
            </span>
          <span className={`${"text text_type_digits-default"}`}>
              {ingredientData.calories}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Белки, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientData.proteins}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Жиры, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientData.fat}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Углеводы, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {ingredientData.carbohydrates}
            </span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;
