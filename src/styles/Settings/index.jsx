import styled from 'styled-components';

export const SettingsPage = styled.div`
  background-color: #f0ece5;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SettingsSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 40%;
  min-height: 100%;
  color: #31304d;
`;

export const MainTitle = styled.h1`
  margin-top: 2rem;
  font-size: 2rem;
  font-weight: bold;
`;

export const Form = styled.div`
  margin-top: 2rem;
  width: 100%;
  padding-bottom: 2rem;
  border-bottom: 1px solid #31304d;
`;

export const Title = styled.h3`
  font-size: 1.25rem;
  padding-bottom: 0.75rem;
  font-weight: bold;
`;

export const Input = styled.input`
  border: 1.5px solid #31304d;
  font-size: 1.25rem;
  width: 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
`;

export const Button = styled.button`
  font-size: 1rem;
  height: 2rem;
  width: 8rem;
  border-radius: 0.5rem;
  border: none;
  background-color: #31304d;
  color: #fff;
  cursor: pointer;
`;
