import styled, { keyframes } from 'styled-components';

const move = keyframes`
  to {
    stroke-dashoffset: -136;
  }
`;

export const StyledSpinner = styled.div`
  width: ${({ size }) => `${size}px`};

  polygon {
    stroke: #000;
    stroke-dasharray: 17;
    animation: ${move} 2.5s cubic-bezier(0.35, 0.04, 0.63, 0.95) infinite;
  }
`;
