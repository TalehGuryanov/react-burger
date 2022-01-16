import style from "./burger-ingredients.module.css"
import Tabs  from "../tabs/tabs";
import IngredientsBox from "../ingredients-box/ingredients-box";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { ingredients } from "../../services/actions/ingredients";
import { ADD_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../../services/actions/ingredient-data";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";
import {OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL} from "../../services/actions/modal";


function BurgerIngredients () {
  const { ingredientItems, ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);
  const { ingredientData } = useSelector(store => store.currentIngredient);
  const { isIngredientModalOpen } = useSelector(store => store.modal)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ingredients())
  }, []);

  function onCloseModal() {
    dispatch({type: DELETE_INGREDIENT_DATA});
    dispatch({type: CLOSE_INGREDIENT_MODAL});
  }
  
  function openModal() {
    dispatch({type: OPEN_INGREDIENT_MODAL});
  }

  function showIngredientModal(event) {
    const id = event.currentTarget.getAttribute("id");
    const selectedIngredient = ingredientItems.find((burger) => burger._id === id);

    openModal();
    dispatch({type: ADD_INGREDIENT_DATA, item: selectedIngredient});
  }

  const renderContent = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else {
      return <IngredientsBox data={ingredientItems} showIngredientModal={showIngredientModal}/>
    }
  }

  return(
    <div className={style.wr}>
      <div className={style.tabs}>
        <Tabs />
      </div>

      {renderContent()}

      {isIngredientModalOpen &&
        <Modal onCloseModal={onCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredientDetails={ingredientData}/>
        </Modal>
      }
    </div>
  )
}

export default BurgerIngredients;