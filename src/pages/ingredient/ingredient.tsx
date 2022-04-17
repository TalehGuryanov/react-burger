import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useSelector} from "../../services/hooks";
import React from "react";
import {ErrorMessage} from "../../components/error-message/error-message";
import {Preloader} from "../../components/preloader/preloader";
import style from "./ingredient.module.css";
import {RootState} from "../../services/types";

const Ingredient: React.FC = () => {
  const { ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);

  const renderContent = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else {
      return (
        <div className={style.wr}>
          <h1 className={style.title + "text text_type_main-large"}>Детали ингредиента</h1>
          <IngredientDetails />
        </div>
      )
    }
  }

  return renderContent()
}

export default Ingredient;
