/** @jsxRuntime classic /
/* @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import DoneIcon from '@mui/icons-material/Done';
import Icon from '@mui/material/Icon';
import { Typography } from '@mui/material';
import { TOAST_TYPE } from './ServiceSystemToast';
import { useEffect, useState } from 'react';

const getStyle = (style: any, deletingStyle: any) => {
  const baseStyle = css`
    transition: all 2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    padding: 10px;
    display: flex;
    align-items: center;
    width: 200px;
    min-height: 50px;
    margin-top: 3px;
    color: white;
    border-radius: 4px;
    word-break: break-word;
    animation name: example;
    animation-duration: 3s;
    animation-name: fadeIn;
    animation-duration: 2s;
    ${deletingStyle}
 @keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    visibility: visible;
    opacity: 1;
  }
}
 
  `;

  switch (style) {
    case TOAST_TYPE.ALERT:
      return css`
        background-color: rgb(72, 174, 93);
        ${baseStyle}
      `;
    case TOAST_TYPE.ERROR:
      return css`
        background-color: red;
        ${baseStyle}
      `;
    default:
      return css`
        background-color: rgb(228, 175, 26);
        ${baseStyle}
      `;
  }
};

const Toast = ({
  text,
  label,
  onMouseEnter,
  onMouseLeave,
  style,
  deletingStyle,
}: {
  text: any;
  label: any;
  onMouseEnter: any;
  onMouseLeave: any;
  style: any;
  deletingStyle: any;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const currentStyle: any = getStyle(style, deletingStyle);

  return (
    <div
      onMouseEnter={() => onMouseEnter()}
      onMouseLeave={() => onMouseLeave()}
      css={currentStyle}
    >
      <Icon>
        <DoneIcon />
      </Icon>
      <div
        css={css`
          margin-left: 10px;
        `}
      >
        <Typography
          css={css`
            font-weight: bold;
          `}
        >
          {label}
        </Typography>

        <Typography>{text}</Typography>
      </div>
    </div>
  );
};
export default Toast;
