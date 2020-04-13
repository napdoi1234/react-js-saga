import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import style from "./style";
import { TextField } from "@material-ui/core";

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          className={classes.textField}
          onChange={handleChange}
          margin="normal"
          placeholder="nhap tu khoa"
        />
      </form>
    );
  }
}

export default withStyles(style)(SearchBox);
