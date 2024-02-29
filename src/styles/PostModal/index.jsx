import styled from 'styled-components';

export const Modal = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 100;
  position: fixed;
  background-color: rgba(26, 26, 26, 0.9);
  border: none;
  color: #f1f1f1;
  font-size: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PostArea = styled.div`
  background-color: #31304d;
  padding: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 40%;
  height: 60%;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  border-bottom: 1px solid #fff;
  padding-bottom: 1rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  flex: 1;
  text-align: center;
`;

export const CloseModal = styled.p`
  font-size: 1rem;
  cursor: pointer;
`;

export const TextArea = styled.textarea`
  font-family: 'Montserrat', sans-serif;
  resize: none;
  width: 35vw;
  height: 35vh;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

export const Button = styled.button`
  width: 36vw;
  font-size: 1.2rem;
  padding: 0.4rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;
