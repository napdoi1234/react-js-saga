import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Clear";
import { connect } from "react-redux";
import { compose, bindActionCreators } from "redux";
import * as modalac from "./../../actions/modal";
import style from "./style";
import { Modal } from "@material-ui/core";

class ModalCommon extends Component {
  render() {
    const { classes, open, component, modalAction, title } = this.props;
    const { hideModal } = modalAction;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}
const mapStateToProps = (state) => ({
  open: state.modal.showModal,
  component: state.modal.component,
  title: state.modal.title,
});
const mapDispatchToProps = (dispatch) => ({
  modalAction: bindActionCreators(modalac, dispatch),
});
const withconnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withStyles(style), withconnect)(ModalCommon);
