/** @jsxRuntime classic /
/* @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import React from 'react';
import {
  Filter,
  ThermostatOutlined,
  ThirtyFpsSharp,
} from '@mui/icons-material';
import Toast from './Toast';
import { positions } from '@mui/system';

export enum TOAST_TYPE {
  ALERT,
  WARNING,
  ERROR,
}
declare module 'react' {
  interface HTMLAttributes<T> {
    css?: any;
  }
}
let appendToast: any = null;
let removeToast: any = null;
let getToast: any = null;
let handleStopTimer: any = null;
let handleStartTimer: any = null;

const TOAST_REMOVE_DELAY = 5;
let timeout: any = null;
type MyState = {
  StoppedTime: any;
  toasts: any;
  pause: any;
  timer: any;
  style: any;
};
class ServiceSystemToast extends React.Component<{}, MyState> {
  constructor(props: any) {
    super(props);
    this.state = {
      StoppedTime: 0,
      toasts: [],
      pause: false,
      timer: null,
      style: null,
    };

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

  componentDidUpdate(_state: any, prevState: any) {
    if (this.state.timer !== prevState.timer) {
      if (timeout !== null) {
        clearTimeout(timeout);
      }

      if (this.state.timer === null) {
        return;
      }

      if (TOAST_REMOVE_DELAY <= this.state.timer) {
        this.removeLastToast();
        this.setState({ timer: 0 });
        return;
      }

      timeout = setTimeout(
        () =>
          this.setState((prevState) => ({
            timer: prevState.timer + 1,
          })),
        1000
      );
    }
  }

  removeLastToast() {
    const deletingStyleToast = css`
      opacity: 0.01;
      transition: opacity 500ms ease-in;
    `;
    if (this.state.toasts.length) {
      const currentToasts = this.state.toasts;
      currentToasts[0].deletingStyle = deletingStyleToast;
      this.setState({
        toasts: currentToasts,
      });
    }
    setTimeout(() => {
      this.setState((prevState) => ({
        toasts: prevState.toasts.slice(1, prevState.toasts.length),
      }));
    }, 2000);
  }

  alertMessage() {
    console.log('Called from outside');
  }

  appendToast(label = '', text = '', typeOfToast: any) {
    const id = Date.now();
    const pause = false;
    const deletingStyle = ``;
    this.setState((prevState) => ({
      toasts: [
        ...prevState.toasts,
        { id, text, pause, label, typeOfToast, deletingStyle },
      ],
      timer: 0,
    }));
  }

  removeToast(toastId: any) {
    if (this.state.toasts) {
      this.setState((prevState) => ({
        toasts: prevState.toasts.filter((value: any) => value.id !== toastId),
      }));
    }
  }
  handleStartTimer() {
    this.setState({
      timer: 0,
    });
  }
  handleStopTimer() {
    this.setState({
      timer: null,
    });
  }
  getToast(id = 0) {}

  render() {
    return (
      <div
        css={css`
          position: fixed;
          bottom: 0;
          right: 0;
          margin: 5px;
        `}
      >
        {this.state.toasts.map((toast: any) => {
          return (
            <Toast
              deletingStyle={toast.deletingStyle}
              style={toast.typeOfToast}
              label={toast.label}
              onMouseLeave={() => handleStartTimer()}
              onMouseEnter={() => handleStopTimer()}
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
export { appendToast, removeToast, getToast };
