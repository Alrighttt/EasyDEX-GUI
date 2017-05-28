import React from "react";
import {dismissToasterMessage} from "../../actions/actionCreators";
import Store from "../../store";
import ToasterItem from "./toaster-item";

/**
 * Container component used for creating multiple toasts
 */
class Toaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toasts: []
    };
    this.toastId = 0;
  }

  componentWillReceiveProps(props) {
    if (props &&
      props.toasts) {
      this.setState({
        toasts: props.toasts,
        toastId: props.toasts.length
      });
    } else {
      this.setState({
        toasts: [],
        toastId: 0
      });
    }
  }

  dismissToast(toastId) {
    Store.dispatch(dismissToasterMessage(toastId));
  }

  // render all current toasts
  render() {
    return (
      <div id="toast-container"
           className="single-toast toast-bottom-right"
           aria-live="polite"
           role="alert">
        {this.state.toasts
          .map((toast) => {
            // sets the toastId for all new toasts
            if (!toast.toastId) {
              toast.toastId = this.toastId++;
            }

            return (
              <ToasterItem key={toast.toastId} {...toast} />
            );
          })}
      </div>
    );
  }
}

export default Toaster;