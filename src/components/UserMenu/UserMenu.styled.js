import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Email = styled.p`
  margin-right: 1rem;
`;
export const Button = styled.div`
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;

  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;

  &.active,
  &:hover,
  &:focus {
    color: #fff;
  }

  &:disabled {
    color: rgba(255, 255, 255, 0.6);
  }
`;
