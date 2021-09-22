/** @jsxRuntime classic /
/* @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Filter, ThermostatOutlined } from '@mui/icons-material';
import Toast from './Toast';
let increaseValue = null;
let appendToast = null;
let removeToast = null;
let getToast = null;
let handleStopTimer = null;
let handleStartTimer = null;

const TOAST_REMOVE_DELAY = 5;
let timeout = null;

class ServiceSystemToast extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      toasts: [],
      pause: false,
      timer: 0,
    };

    increaseValue = this.increaseValue;
    increaseValue = increaseValue.bind(this);
    appendToast = this.appendToast;
    appendToast = appendToast.bind(this);
    removeToast = this.removeToast;
    removeToast = removeToast.bind(this);
    getToast = this.getToast;
    getToast = getToast.bind(this);

    handleStopTimer = this.handleStopTimer;
    handleStopTimer = handleStopTimer.bind(this);
    handleStartTimer = this.handleStartTimer;
    handleStartTimer = handleStartTimer.bind(this);
  }

  componentDidUpdate(_, prevState) {
    if (this.state.timer !== prevState.timer) {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(
        () =>
          this.setState((prevState) => ({
            timer: prevState.timer + 1,
          })),
        1000
      );

      if (this.state.timer % TOAST_REMOVE_DELAY === 0) {
        this.removeLastToast();
      }
    }
  }

  removeLastToast() {
    console.log(this.state.toasts);
    this.setState((prevState) => ({
      toasts: prevState.toasts.slice(0, prevState.toasts.length - 1),
    }));
  }

  increaseValue() {
    this.setState((prevState) => ({
      value: prevState.value + 1,
    }));
  }

  alertMessage() {
    console.log('Called from outside');
  }

  appendToast(toast, text = 'sss', timer = 3000) {
    const id = Date.now();
    const pause = false;
    // const removeTimeout = setTimeout(() => {
    //   removeToast(id);
    //   timer = 0;
    // }, timer);

    this.setState((prevState) => ({
      toasts: [...prevState.toasts, { id, text, timer, pause }],
      timer: 1,
    }));
  }

  removeToast(toastId) {
    if (this.state.toasts) {
      console.log('del');

      this.setState((prevState) => ({
        toasts: prevState.toasts.filter((value) => value.id !== toastId),
      }));
    }
  }
  handleStartTimer() {
    this.setState({
      pause: false,
    });
  }
  handleStopTimer() {
    this.setState({
      pause: true,
    });
  }
  getToast(id = 0) {
    console.log(this.state.toasts[id]);
  }
  render() {
    return (
      <div
        css={css`
          position: absolute;
          bottom: 0;
          right: 0;
        `}
      >
        {this.state.toasts.map((toast, index) => {
          return (
            <Toast
              onStartTimer={() => handleStartTimer()}
              onStopTimer={() => handleStopTimer()}
              pause={this.state.pause}
              onRemove={() => removeToast(toast.id)}
              key={toast.id}
              text={toast.text}
            />
          );
        })}
      </div>
    );
  }
}

export default ServiceSystemToast;
export { increaseValue, appendToast, removeToast, getToast };
/* return (
            <div
              onMouseEnter={() => {
                clearTimeout(toast.removeTimeout);
                this.state.toasts.forEach((toastt) =>
                  clearTimeout(toastt.removeTimeout)
                );
              }}
              onMouseLeave={() => {
                this.state.toasts.forEach((toastt) =>
                  setTimeout(() => removeToast(toastt.id), toastt.timer)
                );
              }}
              key={index}
              css={css`
                display: grid;
                justify-content: center;
                align-content: center;
                width: 200px;
                height: 50px;
                background-color: hotpink;
              `}
            >
              {toast.text}
            </div>
          ); */
