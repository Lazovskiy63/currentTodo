/** @jsxRuntime classic /
/* @jsx jsx */
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useEffect, useState } from 'react';
const Toast = ({ text, onMouseEnter, onMouseLeave }) => {
  const [timer, setTimer] = useState(5);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      css={css`
        display: grid;
        justify-content: center;
        align-content: center;
        width: 200px;
        height: 50px;
        background-color: hotpink;
      `}
    >
      {text}
    </div>
  );
};
export default Toast;
