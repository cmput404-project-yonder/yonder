import { NEW_POST_ERROR, NEW_POST_SUBMITTED, NEW_POST_SUCCESS } from "./StreamTypes";

// define the initial state of the signup store
const initialState = {
  newPostError: "",
  isSubimtted: false,
  post: [],
};

export const streamReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_POST_SUBMITTED:
      return {
        newPostError: "",
        isSubimtted: true,
      };
    case NEW_POST_ERROR:
      const errorState = {
        newPostError: "",
        isSubimtted: false,
      };
      errorState.newPostError = action.errorData;
      return errorState;
    case NEW_POST_SUCCESS:
      return {
        newPostError: "",
        isSubimtted: false,
      };
    default:
      return state;
  }
};
