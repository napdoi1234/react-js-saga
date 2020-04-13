import * as taskConstant from "./../constant/task";
import { STATUSES } from "./../constant/index";

export const fetchListTask = (params = {}) => {
  return {
    type: taskConstant.FETCH_TASK,
    payload: {
      params,
    },
  };
};

export const fetchListTaskSuccess = (data) => {
  return {
    type: taskConstant.FETCH_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListTaskFailed = (error) => {
  return {
    type: taskConstant.FETCH_TASK_FAILED,
    payload: {
      error,
    },
  };
};

// export const fetchListTaskRequest = () => {
//   return (dispatch) => {
//     dispatch(fetchListTask());
//     taskApis
//       .getList()
//       .then((response) => {
//         const { data } = response;
//         dispatch(fetchListTaskSuccess(data));
//       })
//       .catch((error) => {
//         dispatch(fetchListTaskFailed(error));
//       });
//   };
// };

export const filterTask = (keyword) => ({
  type: taskConstant.FILTER_TASK,
  payload: {
    keyword,
  },
});

export const filterTaskSuccess = (data) => ({
  type: taskConstant.FILTER_TASK_SUCCESS,
  payload: {
    data,
  },
});

export const addTask = (title, description) => {
  return {
    type: taskConstant.ADD_TASK,
    payload: {
      title,
      description,
    },
  };
};

export const addTaskSuccess = (data) => {
  return {
    type: taskConstant.ADD_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addTaskFailed = (error) => {
  return {
    type: taskConstant.ADD_TASK_FAILED,
    payload: {
      error,
    },
  };
};

export const setTaskEditting = (task) => {
  return {
    type: taskConstant.SET_TASK_EDITTING,
    payload: {
      task,
    },
  };
};

export const updateTask = (title, description, status = STATUSES[0].value) => {
  return {
    type: taskConstant.UPDATE_TASK,
    payload: {
      title,
      description,
      status,
    },
  };
};

export const updateTaskSuccess = (data) => {
  return {
    type: taskConstant.UPDATE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateTaskFailed = (error) => {
  return {
    type: taskConstant.UPDATE_TASK_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteTask = (id) => {
  return {
    type: taskConstant.DELETE_TASK,
    payload: {
      id,
    },
  };
};

export const deleteTaskSuccess = (data) => {
  return {
    type: taskConstant.DELETE_TASK_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteTaskFailed = (error) => {
  return {
    type: taskConstant.DELETE_TASK_FAILED,
    payload: {
      error,
    },
  };
};
