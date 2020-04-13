import { toast } from "react-toastify";

export const toastError = (error) => {
  let mess = null;
  if (typeof error === "object" && error.message) {
    mess = error.message;
  }
  if (mess !== null && typeof mess !== "undefined" && mess !== "") {
    toast.error(mess);
  }
};

export const toastSuccess = (messager) => {
  if (messager !== null && typeof messager !== "undefined" && messager !== "") {
    toast.success(messager);
  }
};
