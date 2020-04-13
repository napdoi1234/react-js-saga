import { Box, Grid, MenuItem } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { Field, reduxForm } from "redux-form";
import renderTextField from "../../component/FormHelper/textField";
import * as modalac from "./../../actions/modal";
import * as taskActions from "./../../actions/task";
import style from "./style";
import validate from "./validate";
import renderSelectField from "../../component/FormHelper/Select";

class TaskForm extends Component {
  required = (value) => {
    let error = "vui long nhap tieu de";
    if (value !== null && typeof value !== "undefined" && value.trim() !== "") {
      error = null;
    }
    return error;
  };

  minLength = (value) => {
    let error = null;
    if (value.length < 5) {
      error = "Tieu de phai tu 5 ki tu ";
    }
    return error;
  };

  handleSubmitForm = (data) => {
    const { taskAction, taskEdit } = this.props;
    const { addTask, updateTask } = taskAction;
    const { title, description, status } = data;
    if (taskEdit && taskEdit.id) {
      updateTask(title, description, status);
    } else {
      addTask(title, description);
    }
  };

  renderState() {
    let xthml = null;
    const { taskEdit, classes } = this.props;
    if (taskEdit && taskEdit.id) {
      xthml = (
        <Grid item md={12}>
          <Field
            id="status"
            lable="Trang thai"
            className={classes.select}
            name="status"
            component={renderSelectField}
          >
            <MenuItem value={0}>Ready</MenuItem>
            <MenuItem value={1}>In Progress</MenuItem>
            <MenuItem value={2}>Compeleted</MenuItem>
          </Field>
        </Grid>
      );
    }
    return xthml;
  }

  render() {
    const {
      classes,
      modalAction,
      handleSubmit,
      invalid,
      submitting,
      initialValues,
    } = this.props;
    const { hideModal } = modalAction;
    const { description, title } = initialValues;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              lable="Tieu de"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
              value={title}
              // validate={[this.required, this.minLength]}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              lable="Mo ta"
              className={classes.textField}
              multiline
              rowsMax="4"
              margin="normal"
              name="description"
              component={renderTextField}
              value={description}
            />
          </Grid>
          {this.renderState()}
          <Grid item md={12}>
            <Box display="flex" mt={2} flexDirection="row-reverse">
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={invalid || submitting}
              >
                Luu lai
              </Button>
              <Button variant="contained" onClick={hideModal}>
                Huy bo
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  taskEdit: state.task.taskEditting,
  initialValues: {
    description: state.task.taskEditting ? state.task.taskEditting.des : null,
    status: state.task.taskEditting ? state.task.taskEditting.status : null,
    title: state.task.taskEditting ? state.task.taskEditting.title : null,
  },
});
const mapDispatchToProps = (dispatch) => ({
  modalAction: bindActionCreators(modalac, dispatch),
  taskAction: bindActionCreators(taskActions, dispatch),
});
const FORM_NAME = "TASK_MANAGER";
const withReduxForm = reduxForm({
  form: FORM_NAME,
  validate,
});
const withconnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(style), withconnect, withReduxForm)(TaskForm);
