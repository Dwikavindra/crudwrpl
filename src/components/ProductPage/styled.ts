import styled from "styled-components";

export const CardBox = styled.div`
  background-color: #e5e5e5;
  border: 1px solid #9b9b9b;
  height: 280px;
  width: 200px;
  border-radius: 12.56px;
  cursor: pointer;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
  transform: translateZ(0);
  backface-visibility: hidden;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CardImage = styled.div`
  position: relative;
  width: 160px;
  height: 153px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const ProductName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  position: relative;
  width: 160px;
  height: 40px;
  left: 0px;
  top: 163px;
`;

export const ProductGridDiv = styled.div`
  display: grid;
  @media only screen and (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-column-gap: 20px;
    grid-row-gap: 30px;
  }
  @media only screen and (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-row-gap: 20px;
  }
  grid-template-columns: repeat(5, minmax(0, 1fr));
  grid-column-gap: 35px;
  grid-row-gap: 50px;
  justify-items: center;
  align-content: space-evenly;
  padding-top: 0rem;
  padding-bottom: 2rem;
`;
