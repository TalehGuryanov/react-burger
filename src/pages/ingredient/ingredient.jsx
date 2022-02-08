import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {ingredients} from "../../services/actions/ingredients";
import ErrorMessage from "../../components/error-message/error-message";
import Preloader from "../../components/preloader/preloader";
import {ADD_INGREDIENT_DATA} from "../../services/actions/ingredient-data";
import style from "./ingredient.module.css";
import Modal from "../../components/modal/modal";

function Ingredient() {
  const { id } = useParams();
  const { ingredientItems, ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);
  const { ingredientData } = useSelector(store => store.currentIngredient);
  const dispatch = useDispatch();
  const location = useLocation();
  const isModal = location?.state?.isModal;

  const showCurrentIngredient = () => {
    const selectedIngredient = ingredientItems.find((burger) => burger._id === id);

    dispatch({type: ADD_INGREDIENT_DATA, item: selectedIngredient});
  }

  useEffect(() => {
    if(!ingredientItems.length) {
      dispatch(ingredients());
    } else {
      showCurrentIngredient();
    }
  }, [ingredientItems]);

  const renderContent = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else if(isModal) {
      return (
        <Modal title="Детали ингредиента">
          <IngredientDetails ingredientDetails={ingredientData}/>
        </Modal>
      )
    } else  {
      return (
        <div className={style.wr}>
        <h1 className={style.title + "text text_type_main-large"}>Детали ингредиента</h1>
          <IngredientDetails ingredientDetails={ingredientData}/>
        </div>
      )
    }
  }

  return renderContent()
}

export default Ingredient;