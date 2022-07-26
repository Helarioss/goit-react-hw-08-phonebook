import styled, { keyframes } from 'styled-components';

const spin = keyframes`
 from {
    transform: rotate(0);
  }
  to{
    transform: rotate(359deg);
  }
`;

export const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 50px;
  background-color: transparent;
`;

export const Border = styled.div`
  width: 80px;
  height: 80px;
  padding: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: rgb(63, 249, 220);
  background: linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.1) 33%,
    rgba(255, 0, 0, 1) 100%
  );
  animation: ${spin} 0.8s linear 0s infinite;
`;

export const Core = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 50%;
`;
