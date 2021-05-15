import * as actionType from "./actionTypes"

const initialState = {
  user: {
    isAuthenticated: false
  },
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload.user
        }
      };
    }
    case actionType.LOGIN: {
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true,
          ...action.payload
        }
      }
    }
    case actionType.SIGNUP: {
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload
        }
      }
    }
    case actionType.AUTHENTICATED: {
      return {
        ...state,
        user: {
          ...state.user,
          isAuthenticated: true
        }
      }
    }
    case actionType.SIGNOUT: {
      return {
        user: {
          isAuthenticated: false
        },
      }
    }
    default: {
      return { ...state }
    }
  }
};

export default userReducer

export const setUser = user_data => {
  return dispatch => {
    dispatch({
      type: actionType.SET_USER,
      payload: {
        user: user_data
      }
    })
  }
}
export const login = (info) => {
  return dispatch => {
    dispatch({
      type: actionType.LOGIN,
      payload: {
        ...info
      }
    })
  }
}
export const signup = (info) => {
  return dispatch => {
    dispatch({
      type: actionType.SIGNUP,
      payload: {
        ...info
      }
    })
  }
}
export const authenticated = () => {
  return dispatch => {
    dispatch({
      type: actionType.AUTHENTICATED
    })
  }
}
export const signout = () => {
  return dispatch => {
    dispatch({
      type: actionType.SIGNOUT,
    })
  }
}