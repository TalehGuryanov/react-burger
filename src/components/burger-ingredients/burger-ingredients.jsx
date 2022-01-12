import style from "./burger-ingredients.module.css"
import Tabs  from "../tabs/tabs";
import IngredientsBox from "../ingredients-box/ingredients-box";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React, {useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from "../../services/actions/actions";
import { SET_INGREDIENT_DATA, DELETE_INGREDIENT_DATA } from "../../services/actions/actions";
import Preloader from "../preloader/preloader";
import ErrorMessage from "../error-message/error-message";


function BurgerIngredients () {
  const { ingredientItems, ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);
  const { ingredientData, isOpenModal } = useSelector(store => store.currentIngredient);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients())
  }, []);


  function onCloseModal() {
    dispatch({type: DELETE_INGREDIENT_DATA});
  }

  function openIngredientModal(event) {
    const id = event.currentTarget.getAttribute("id");
    const selectedIngredient = ingredientItems.find((burger) => burger._id === id);

    dispatch({type: SET_INGREDIENT_DATA, item: selectedIngredient});
  }

  const renderContent = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else {
      return <IngredientsBox data={ingredientItems} openIngredientModal={openIngredientModal}/>
    }
  }

  return(
    <div className={style.wr}>
      <div className={style.tabs}>
        <Tabs />
      </div>

      {renderContent()}

      {isOpenModal &&
        <Modal onCloseModal={onCloseModal} title="Детали ингредиента">
          <IngredientDetails ingredientDetails={ingredientData}/>
        </Modal>
      }
    </div>
  )
}

export default BurgerIngredients;