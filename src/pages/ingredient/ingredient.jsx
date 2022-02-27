import IngredientDetails from "../../components/ingredient-details/ingredient-details";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import ErrorMessage from "../../components/error-message/error-message";
import Preloader from "../../components/preloader/preloader";
import style from "./ingredient.module.css";
import {useHistory, useLocation} from "react-router-dom";
import Modal from "../../components/modal/modal";
import {DELETE_INGREDIENT_DATA} from "../../services/actions/ingredient-data";
import {CLOSE_INGREDIENT_MODAL} from "../../services/actions/modal";

function Ingredient() {
  const { ingredientItemsRequest, ingredientItemsFailed }  = useSelector(store => store.ingredients);
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isModalSelector = location?.state?.isModal;

  function onCloseModal() {
    dispatch({type: DELETE_INGREDIENT_DATA});
    dispatch({type: CLOSE_INGREDIENT_MODAL});

    history.goBack();
  }

  const renderContent = () => {
    if(ingredientItemsFailed) {
      return <ErrorMessage />
    } else if(ingredientItemsRequest) {
      return <Preloader />
    } else if (isModalSelector) {
      return (
        <Modal onCloseModal={onCloseModal} title="Детали ингредиента">
          <IngredientDetails/>
        </Modal>
      )
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
