import style from "./burger-ingredients.module.css"
import IngredientsBox from "../ingredients-box/ingredients-box";
import React from "react";
import { useSelector } from '../../services/hooks';
import {Preloader} from "../preloader/preloader";
import {ErrorMessage} from "../error-message/error-message";
import {RootState} from "../../services/types";

function BurgerIngredients () {
  const { ingredientItems, ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);

  const renderContent: () => React.ReactNode = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else {
      return <IngredientsBox data={ingredientItems}/>
    }
  }

  return(
    <div className={style.wr}>
      {renderContent()}
    </div>
  )
}

export default BurgerIngredients;
