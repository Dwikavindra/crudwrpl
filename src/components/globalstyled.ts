import styled from "styled-components";

export const NavBarContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 2;
`;
export const SearchBarContainer = styled.div`
  width: 100%;
  background: #eaeaea;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  border-bottom-right-radius: 1rem;
  border-bottom-left-radius: 1rem;
`;

export const NavBar = styled.div`
  justify-content: space-between;
  width: 100%;
  display: flex;
  background: #16213b;
  padding: 1.2rem;
`;

export const HeaderHomeIcon = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0rem 1rem;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  &:hover {
    background-color: #1f2d4d;
    border-radius: 0.5rem;
  }
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 9rem;
  height: 3rem;
`;
export const HeaderAddProductButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: 600;
  color: white;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
  &:hover {
    background-color: #1f2d4d;
    border-radius: 0.5rem;
    color: #e3e3e3;
  }
`;
