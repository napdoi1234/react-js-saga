import React, { Component } from "react";
import { withStyles } from "@material-ui/styles";
import style from "./style";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import Icon from "@material-ui/core/Icon";

class TaskItem extends Component {
  render() {
    const { classes, task, status, onClickEdit, onClickDelete } = this.props;
    return (
      <Card key={task.id} className={classes.card}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item md={8}>
              <Typography component="h2">{task.title}</Typography>
            </Grid>
            <Grid item md={4}>
              {status.label}
            </Grid>
          </Grid>
          <p>{task.des}</p>
        </CardContent>
        <CardActions className={classes.cardaction}>
          <Fab
            color="primary"
            aria-label="Edit"
            className={classes.fab}
            size="small"
            onClick={onClickEdit}
          >
            <Icon fontSize="small">edit_icon</Icon>
          </Fab>
          <Fab
            color="primary"
            aria-label="Delete"
            className={classes.fab}
            size="small"
            onClick={onClickDelete}
          >
            <Icon fontSize="small">delete_icon</Icon>
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(style)(TaskItem);
