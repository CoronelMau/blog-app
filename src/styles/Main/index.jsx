import styled from 'styled-components';

export const MainSection = styled.div`
  background-color: #f0ece5;
  min-height: 100lvh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostingSection = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 2vh;
  height: 10ch;
  width: 40vw;
  background-color: #31304d;
  margin: 2vh;
  border-radius: 0.5rem;
`;

export const PostingInput = styled.input`
  width: 90%;
  height: 1.5rem;
  padding: 0.5rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  border: none;
`;
