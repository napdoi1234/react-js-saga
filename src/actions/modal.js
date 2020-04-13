import * as modal from "./../constant/modal";

export const showModal = () => ({
  type: modal.SHOW_MODAL,
});
export const hideModal = () => ({
  type: modal.HIDE_MODAL,
});
export const changeModalTitle = (title) => ({
  type: modal.CHANGE_MODAL_TITLE,
  payload: {
    title,
  },
});
export const changeModalContent = (component) => ({
  type: modal.CHANGE_MODAL_CONTENT,
  payload: {
    component,
  },
});
