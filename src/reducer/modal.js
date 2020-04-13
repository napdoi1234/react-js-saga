import * as type from "./../constant/modal";

const initialState = {
  showModal: false,
  component: null,
  title: "",
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case type.SHOW_MODAL: {
      return {
        ...state,
        showModal: true,
      };
    }
    case type.HIDE_MODAL: {
      return {
        ...state,
        showModal: false,
        title: "",
        component: null,
      };
    }
    case type.CHANGE_MODAL_TITLE: {
      return {
        ...state,
        title: action.payload.title,
      };
    }
    case type.CHANGE_MODAL_CONTENT: {
      return {
        ...state,
        component: action.payload.component,
      };
    }
    default:
      return state;
  }
};
export default reducer;
