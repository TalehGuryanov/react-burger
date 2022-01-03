import style from "./burger-ingredients.module.css"
import Tabs  from "../tabs/tabs";
import IngredientsBox from "../ingredients-box/ingredients-box";
import PropTypes from "prop-types";
import ingredientType from "../../utils/types"
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React from "react";

function BurgerIngredients (props) {
  const [isModal, setModal] = React.useState(false);
  const [ingredientDetails, setIngredientDetails] = React.useState({});

  function onCloseModal() {
    setModal(false);
  }

  function openIngredientModal(event) {
    const id = event.currentTarget.getAttribute("id");
    const ingredientsArr = props.data.filter((burger) => burger._id === id);

    ingredientsArr.forEach((ingredient) => setIngredientDetails(ingredient));
    setModal(true);
  }

  return(
    <div className={style.wr}>
      <div className={style.tabs}>
        <Tabs />
      </div>

      <IngredientsBox data={props.data} openIngredientModal={openIngredientModal}/>

      {isModal &&
        <Modal onCloseModal={onCloseModal}>
          <IngredientDetails ingredientDetails={ingredientDetails} onCloseModal={onCloseModal}/>
        </Modal>
      }
    </div>
  )
}

BurgerIngredients.PropsType = {
  openModalIngredient: PropTypes.func,
  data: PropTypes.arrayOf(PropTypes.shape(ingredientType)).isRequired
}

export default BurgerIngredients