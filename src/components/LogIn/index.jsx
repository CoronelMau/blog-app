import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  LogInPage,
  FormSection,
  Form,
  WelcomeSection,
  Input,
  Button,
  LogInTitle,
  WelcomeTitle,
} from '../../styles/LogIn';

export default function LogIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/log-in', config)
      .then((res) => {
        if (res.status === 200) return res.json();
      })
      .then((res) => {
        localStorage.setItem('token', JSON.stringify(res.jwt));
        navigate('/main');
      })
      .catch((err) => console.error(err));
  };

  return (
    <LogInPage>
      <FormSection>
        <LogInTitle> Log In</LogInTitle>
        <Form>
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button onClick={handleSubmit}>Log In</Button>
        </Form>
        <Button onClick={() => navigate('/sign-up')}>Create account</Button>
      </FormSection>

      <WelcomeSection>
        <WelcomeTitle>Welcome Back Again!</WelcomeTitle>
      </WelcomeSection>
    </LogInPage>
  );
}
