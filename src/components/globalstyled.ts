import styled from "styled-components";

export const NavBar = styled.div`
  flex-direction: row;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  display: flex;
  position: fixed;
  background: #16213b;
  z-index: 2;
`;

export const HeaderContent = styled.div`
  display: flex;
  width: 100%;
  margin-left: 20px;
  margin-right: 20px;
  height: 32.81px;
  margin-top: 34.69px;
  margin-bottom: 20px;
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: center;
  align-items: center;
`;
export const HeaderAddProductButtonWrapper = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: 20px;
  cursor: pointer;
`;
