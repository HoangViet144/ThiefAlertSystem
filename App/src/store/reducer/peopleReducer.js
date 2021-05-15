import * as actionType from "./actionTypes"

const initialState = {
  peopleLst: {},
};
const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_PEOPLE_LST: {
      return {
        ...state,
        peopleLst: {
          ...state.peopleLst,
          ...action.payload
        }
      };
    }
    default: {
      return { ...state }
    }
  }
};

export default peopleReducer

export const setPeopleLst = peopleLst => {
  console.log(peopleLst)
  return dispatch => {
    dispatch({
      type: actionType.SET_PEOPLE_LST,
      payload: peopleLst
    })
  }
}