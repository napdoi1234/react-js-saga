import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import TaskForm from "../taskform/index";
import TaskList from "../../component/tasklist/index";
import { STATUSES } from "../../constant/index";
import * as TaskAction from "./../../actions/task";
import * as ModalAction from "./../../actions/modal";
import style from "./style";
import SearchBox from "../../component/SearchBox";
import { Box } from "@material-ui/core";

class Taskbroad extends Component {
  componentDidMount() {
    const { taskActions } = this.props;
    const { fetchListTask } = taskActions;
    fetchListTask();
  }

  handleFilter = (e) => {
    const { value } = e.target;
    const { taskActions } = this.props;
    const { filterTask } = taskActions;
    filterTask(value);
  };

  toggleForm = () => {
    const { ModalActions, taskActions } = this.props;
    const { showModal, changeModalTitle, changeModalContent } = ModalActions;
    const { setTaskEditting } = taskActions;
    setTaskEditting(null);
    showModal();
    changeModalTitle("Them moi cong viec");
    changeModalContent(<TaskForm />);
  };

  handleEdit = (task) => {
    const { taskActions, ModalActions } = this.props;
    const { setTaskEditting } = taskActions;
    setTaskEditting(task);
    const { showModal, changeModalTitle, changeModalContent } = ModalActions;
    showModal();
    changeModalTitle("Cap nhat cong viec");
    changeModalContent(<TaskForm />);
  };

  handleOpenDeleteModal = (task) => {
    const { ModalActions, classes } = this.props;
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
      hideModal,
    } = ModalActions;
    showModal();
    changeModalTitle("Xoa cong viec");
    changeModalContent(
      <div className={classes.modalDelete}>
        <div className={classes.modalConfirmText}>
          Are you sure delete{" "}
          <span className={classes.modalConfirmTextBold}>{task.title}</span>?
        </div>
        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Huy bo
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleDelete(task)}
            >
              Dong y
            </Button>
          </Box>
        </Box>
      </div>,
    );
  };

  handleDelete(task) {
    const { taskActions } = this.props;
    const { deleteTask } = taskActions;
    const { id } = task;
    deleteTask(id);
  }

  renderSearchBox() {
    let html = null;
    html = <SearchBox handleChange={this.handleFilter} />;
    return html;
  }

  renderBroad() {
    const { listTask } = this.props;
    let xhtml = null;
    xhtml = (
      <Grid container spacing={2}>
        {STATUSES.map((status) => {
          const taskFilter = listTask.filter(
            (task) => task.status === status.value,
          );
          return (
            <TaskList
              tasks={taskFilter}
              status={status}
              key={status.value}
              onClickEdit={this.handleEdit}
              onClickDelete={this.handleOpenDeleteModal}
            />
          );
        })}
      </Grid>
    );
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.Taskbroad}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.toggleForm}
        >
          <AddIcon />
          Them moi cong viec
        </Button>
        {this.renderSearchBox()}
        {this.renderBroad()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listTask: state.task.listTask,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    taskActions: bindActionCreators(TaskAction, dispatch),
    ModalActions: bindActionCreators(ModalAction, dispatch),
  };
};

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withStyles(style), withConnect)(Taskbroad);
