import { GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_ERROR } from "../constants/ingredients";
import { ingredientsReducer, ingredientsInitialState } from "./ingredients";

describe('ingredient reducer', () => {
  it('should return the initial state', () => {
    expect(ingredientsReducer(undefined, {} as any)).toEqual(ingredientsInitialState)
  })
  
  it('GET_ITEMS_REQUEST', () => {
    const action = {
      type: GET_ITEMS_REQUEST
    }
  
    expect(ingredientsReducer(ingredientsInitialState, action)).toEqual({
      ...ingredientsInitialState,
      ingredientItemsRequest: true
    })
  })
  
  it('GET_ITEMS_SUCCESS', () => {
    const action = {
      type: GET_ITEMS_SUCCESS,
      items: []
    }
    
    const initialState = {
      ...ingredientsInitialState,
      ingredientItemsRequest: true
    }
    
    expect(ingredientsReducer(initialState, action)).toEqual({
      ...initialState,
      ingredientItemsRequest: false,
      ingredientItems: action.items
    })
  })
  
  it('GET_ITEMS_ERROR', () => {
    const action = {
      type: GET_ITEMS_ERROR
    }
    
    expect(ingredientsReducer(ingredientsInitialState, action)).toEqual({
      ...ingredientsInitialState,
      ingredientItemsFailed: true
    })
  })
})
