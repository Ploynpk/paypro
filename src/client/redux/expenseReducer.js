import * as types from './actionTypes';

const initialState = {
    lent: 0,
    borrowed: 0,
    expenseData: []
};

const expenseReducer = (state = initialState , action) => {
    
    switch (action.type) {
        case types.ADD: {

        }
        
        case types.DELETE: {

        }

        case types.EDIT: {

        }

        case types.SETTLE: {
            
        }

         default: {
            return state;
        }
    }
}

export default expenseReducer;