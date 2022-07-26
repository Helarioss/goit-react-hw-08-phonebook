import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const NavLinkStyled = styled(NavLink)`
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

  &:not(:last-child) {
    margin-right: 1rem;
  }
`;
