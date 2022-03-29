import React from 'react';
import { useHistory } from 'react-router-dom';
import IngredientDetails from '../ingredient-details/ingredient-details';
import {Modal} from "../modal/modal";

const IngredientModal: React.FC = () => {
  const history = useHistory();
  
  const onCloseModal = () => {
    
    history.goBack()
  };
  
  return (
      <Modal onCloseModal={onCloseModal} title="Детали ингредиента">
        <IngredientDetails/>
      </Modal>
  )
}

export default IngredientModal;
