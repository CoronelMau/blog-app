import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import {
  SignUpPage,
  FormSection,
  SignUpTitle,
  Form,
  Input,
  Button,
  RightSection,
} from '../../styles/SignUp/styles';

export default function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPwd, setRepeatPwd] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username,
      email,
      password: password == repeatPwd && password,
    };

    const config = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };

    fetch('http://localhost:8000/user/register', config)
      .then((res) => {
        if (res.status == 200) navigate('/registered');
      })
      .catch((err) => console.error(err));
  };

  return (
    <SignUpPage>
      <FormSection>
        <SignUpTitle> Sign Up</SignUpTitle>
        <Form>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Repeat Password"
            onChange={(e) => setRepeatPwd(e.target.value)}
          />
          <Button onClick={handleSubmit}>Submit</Button>
        </Form>
        <Button onClick={() => navigate('/')}>Log In</Button>
      </FormSection>

      <RightSection />
    </SignUpPage>
  );
}
