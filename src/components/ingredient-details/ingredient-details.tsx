import style from "./ingredient-details.module.css";
import {useParams} from "react-router-dom";
import {useSelector} from "../../services/hooks";
import React, {useMemo} from "react";
import {RootState} from "../../services/types";
import {TIngredient} from "../../services/types/ingredientsTypes";

type TSelectedIngredientId = {
  id: string
}

const IngredientDetails: React.FC = () => {
  const { id }: TSelectedIngredientId = useParams();
  const { ingredientItems }  = useSelector((store: RootState) => store.ingredients);
  
  const selectedIngredient: TIngredient | undefined = useMemo(
      () => ingredientItems.find((item: TIngredient) => item._id === id),
      [id, ingredientItems]
  );

  return(
    <div className={style.wr}>
      <div className={style.img}>
        <img src={selectedIngredient?.image_large} alt=""/>
      </div>

      <div className={`${style.title} ${"text text_type_main-medium"}`}>
        {selectedIngredient?.name}
      </div>

      <ul className={style.composition}>
        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Калории,ккал
            </span>
          <span className={`${"text text_type_digits-default"}`}>
              {selectedIngredient?.calories}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Белки, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {selectedIngredient?.proteins}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Жиры, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {selectedIngredient?.fat}
            </span>
        </li>

        <li className={style.composition_item}>
            <span className={`${style.composition_item_title} ${"text text_type_main-default text_color_inactive"}`}>
              Углеводы, г
            </span>

          <span className={`${"text text_type_digits-default"}`}>
              {selectedIngredient?.carbohydrates}
            </span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;
