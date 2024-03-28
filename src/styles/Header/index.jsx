import styled from 'styled-components';

export const HeaderSection = styled.div`
  background-color: #31304d;
  color: #fff;
  min-height: 7vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeaderContainer = styled.div`
  width: 80vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* border: 1px solid red; */
`;

export const Title = styled.h1`
  font-size: 1.75rem;
  cursor: pointer;
`;

export const Input = styled.input`
  border: none;
  font-size: 1rem;
  padding: 0.5rem;
  padding-left: 2rem;
  border-radius: 1rem;
  width: 35%;
`;

export const ProfileImg = styled.img`
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 2rem;
  cursor: pointer;
`;
