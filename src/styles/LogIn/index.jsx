import styled from 'styled-components';

export const LogInPage = styled.div`
  display: flex;
  background-color: #f0ece5;
`;

export const LogInTitle = styled.h2`
  font-size: 2.5rem;
  color: #31304d;
`;

export const FormSection = styled.div`
  width: 50vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 25vh;
  margin: 5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid black;
`;

export const Input = styled.input`
  font-size: 1.2rem;
  border: 1px solid #31304d;
  border-radius: 1.5rem;
  padding: 0.8rem;
  padding-left: 1.2rem;
  width: 25vw;
`;

export const Button = styled.button`
  width: 40%;
  font-size: 1.2rem;
  border: none;
  padding: 0.5rem;
  border-radius: 1rem;
  background-color: #31304d;
  color: #f0ece5;
  cursor: pointer;
`;

export const WelcomeSection = styled.div`
  width: 50vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #31304d;
  border-radius: 10rem 0 0 10rem;
  box-shadow: 30px 0px 15px 0px rgba(0, 0, 0, 0.4) inset;
`;

export const WelcomeTitle = styled.h1`
  font-size: 6rem;
  margin: 10rem;
  text-align: center;
  color: #fff;
`;
