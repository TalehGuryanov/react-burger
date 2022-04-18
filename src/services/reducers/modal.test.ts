import { OPEN_INGREDIENT_MODAL, CLOSE_INGREDIENT_MODAL, OPEN_ORDER_MODAL, CLOSE_ORDER_MODAL } from "../constants/modal";
import { modalReducer, modalInitialState } from "./modal";

describe('modal reducer', () => {
  it('should return the initial state', () => {
    expect(modalReducer(undefined, {} as any)).toEqual(modalInitialState)
  })
  
  it('OPEN_INGREDIENT_MODAL', () => {
    const action = {
      type: OPEN_INGREDIENT_MODAL
    }
    
    expect(modalReducer(modalInitialState, action)).toEqual({
      ...modalInitialState,
      isIngredientModalOpen: true
    })
  })
  
  it('CLOSE_INGREDIENT_MODAL', () => {
    const action = {
      type: CLOSE_INGREDIENT_MODAL
    }
    
    const initialState = {
      ...modalInitialState,
      isIngredientModalOpen: true
    }
    expect(modalReducer(initialState, action)).toEqual({
      ...initialState,
      isIngredientModalOpen: false
    })
  })
  
  it('OPEN_ORDER_MODAL', () => {
    const action = {
      type: OPEN_ORDER_MODAL
    }
    
    expect(modalReducer(modalInitialState, action)).toEqual({
      ...modalInitialState,
      isOrderModalOpen: true
    })
  })
  
  it('CLOSE_ORDER_MODAL', () => {
    const action = {
      type: CLOSE_ORDER_MODAL
    }
    
    const initialState = {
      ...modalInitialState,
      isOrderModalOpen: true
    }
    expect(modalReducer(initialState, action)).toEqual({
      ...initialState,
      isOrderModalOpen: false
    })
  })
})