import { withStyles } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import React, { Component } from "react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import configureStore from "../../redux/configureStore";
import theme from "./../../commons/Theme";
import Taskbroad from "./../taskbroad/index";
import ModalCommon from "./../../component/Modal/index";
import style from "./style";
import Globalloading from "../../component/GloballLoading";

const store = configureStore();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Globalloading />
          <ToastContainer />
          <ModalCommon />
          <Taskbroad />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(style)(App);
