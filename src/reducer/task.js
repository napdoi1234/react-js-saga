import { toastError, toastSuccess } from "../helpers/toasthelper";
import * as taskC from "./../constant/task";

const initialState = {
  listTask: [],
  taskEditting: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskC.FETCH_TASK: {
      return {
        ...state,
        listTask: [],
      };
    }
    case taskC.FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Tai list task thanh cong");
      return {
        ...state,
        listTask: data,
      };
    }
    case taskC.FETCH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTask: [],
      };
    }
    case taskC.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTask: data,
      };
    }
    case taskC.ADD_TASK: {
      return {
        ...state,
      };
    }
    case taskC.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Them moi task thanh cong");
      return {
        ...state,
        listTask: [data].concat(state.listTask),
      };
    }
    case taskC.ADD_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskC.SET_TASK_EDITTING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditting: task,
      };
    }
    case taskC.UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case taskC.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTask } = state;
      const index = listTask.findIndex((item) => item.id === data.id);
      if (index !== -1) {
        const newList = [
          ...listTask.slice(0, index),
          data,
          ...listTask.slice(index + 1),
        ];
        toastSuccess("Cap nhat list task thanh cong");
        return {
          ...state,
          listTask: newList,
        };
      }
      return {
        ...state,
      };
    }
    case taskC.UPDATE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskC.DELETE_TASK: {
      return {
        ...state,
      };
    }
    case taskC.DELETE_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess("Xoa task thanh cong");
      return {
        ...state,
        listTask: state.listTask.filter((item) => item.id !== data),
      };
    }
    case taskC.DELETE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
