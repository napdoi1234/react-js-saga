import {
  fork,
  take,
  put,
  call,
  delay,
  takeLatest,
  select,
  takeEvery,
} from "redux-saga/effects";
import * as taskTypes from "./../constant/task";
import { STATUS_CODE, STATUSES } from "./../constant/index";
import { getList, updateTask, addTask, deleteTask } from "./../apis/task";
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  filterTaskSuccess,
  addTaskSuccess,
  addTaskFailed,
  fetchListTask,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
  deleteTaskFailed,
} from "./../actions/task";
import { showLoading, hideLoading } from "../actions/ui";
import { hideModal } from "../actions/modal";

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK);
    yield put(showLoading());
    const { params } = action.payload;
    const resp = yield call(getList, params);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListTaskSuccess(data));
    } else {
      yield put(fetchListTaskFailed(data));
    }
    yield delay(1000);
    yield put(hideLoading());
  }
}

function* filterTask({ payload }) {
  yield delay(500);
  yield put(fetchListTask({ q: payload.keyword }));
}

function* addTaskSga({ payload }) {
  yield put(showLoading());
  const { title, description } = payload;
  const resp = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = resp;
  if (status === STATUS_CODE.CREATED) {
    yield put(addTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(addTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  const { title, description, status } = payload;
  const taskEditing = yield select((state) => state.task.taskEditting);
  yield put(showLoading());
  const resp = yield call(
    updateTask,
    { title, description, status },
    taskEditing.id,
  );
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
    yield put(hideModal());
  } else {
    yield put(updateTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteTask, id);
  const { status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  } else {
    yield put(deleteTaskFailed(id));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTask);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}
export default rootSaga;
