import {constructorReducer, constructorInitialState} from "./constructor";

import {
  ADD_ITEM_TO_CONSTRUCTOR,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  CLEAN_CONSTRUCTOR,
  ADD_BUN_TO_CONSTRUCTOR,
  SWAMP_INGREDIENTS
} from "../constants/constructor";

describe('constructor reducer', () => {
  it('should return the initial state', () => {
    expect(constructorReducer(undefined, {} as any)).toEqual(constructorInitialState)
  })
  
  it('should add fillings to constructor', () => {
    const action = {
      type: ADD_ITEM_TO_CONSTRUCTOR,
      item: [] as any
    }
    
    expect(constructorReducer(constructorInitialState, action)).toEqual({
      ...constructorInitialState,
      fillingItems: [action.item]
    })
  })
  
  it('should add bun to constructor', () => {
    const action = {
      type: ADD_BUN_TO_CONSTRUCTOR,
      bun: [] as any
    }
    
    expect(constructorReducer(constructorInitialState, action)).toEqual({
      ...constructorInitialState,
      bun: action.bun
    })
  })
  
  it('should remove items from constructor', () => {
    const action = {
      type: DELETE_ITEM_FROM_CONSTRUCTOR,
      index: 1
    }
    
    expect(constructorReducer(constructorInitialState, action)).toEqual({
      ...constructorInitialState,
      fillingItems: constructorInitialState.fillingItems.filter((item) => item.index !== action.index)
    })
  })
  
  it('should clear constructor', () => {
    const action = {
      type: CLEAN_CONSTRUCTOR,
    }
    
    expect(constructorReducer(constructorInitialState, action)).toEqual(constructorInitialState)
  })
  
  it('swamp constructor', () => {
    const action = {
      type: SWAMP_INGREDIENTS,
      changedArray: [] as any
    }
    
    expect(constructorReducer(constructorInitialState, action)).toEqual({
      ...constructorInitialState,
      fillingItems: action.changedArray
    })
  })
})