import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import TaskItem from "./../taskitem/index";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import style from "./style";

class TaskList extends Component {
  render() {
    const { classes, tasks, status, onClickEdit, onClickDelete } = this.props;
    return (
      <Grid item md={4} xs={12} key={status.value}>
        <Box mt={2} mb={2}>
          <div className={classes.status}>{status.label}</div>
        </Box>
        <div className={classes.wrapperListTask}>
          {tasks.map((task) => {
            return (
              <TaskItem
                task={task}
                status={status}
                key={task.id}
                onClickEdit={() => onClickEdit(task)}
                onClickDelete={()=> onClickDelete(task)}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}

export default withStyles(style)(TaskList);
