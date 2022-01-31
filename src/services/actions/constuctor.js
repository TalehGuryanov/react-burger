import update from 'immutability-helper';

export const ADD_ITEM_TO_CONSTRUCTOR = "ADD_ITEM_TO_CONSTRUCTOR";
export const ADD_BUN_TO_CONSTRUCTOR = "ADD_BUN_TO_CONSTRUCTOR";
export const DELETE_ITEM_FROM_CONSTRUCTOR = "DELETE_ITEM_FROM_CONSTRUCTOR";
export const CLEAN_CONSTRUCTOR = "CLEAN_CONSTRUCTOR";
export const SWAMP_INGREDIENTS = "SWAMP_INGREDIENTS";

export const swapIngredients = (fillings, dragIndex, hoverIndex) => {
  return function (dispatch) {
    const dragItem = fillings[dragIndex];
    const changedFillings = update(fillings, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragItem]
      ]
    })

    dispatch({type: SWAMP_INGREDIENTS, changedArray: changedFillings});
  }
}