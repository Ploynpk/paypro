import * as types from './actionTypes';

// set all the actions that could happen

// add
export const addActionCreator = expenseData => ({
    type: types.ADD,
    payload: expenseData
});
  
// delete 
export const deleteActionCreator = expenseData => ({
    type: types.DELETE,
    payload: expenseData
});
// edit
export const editActionCreator = expenseData => ({
    type: types.EDIT,
    payload: expenseData
});
// settle (same with delete)
export const settleActionCreator = expenseData => ({
    type: types.SETTLE,
    payload: expenseData
});