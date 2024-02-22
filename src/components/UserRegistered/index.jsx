import { useNavigate } from 'react-router-dom';

import {
  RegisteredPage,
  RegisteredTitle,
  Button,
  RightSection,
  FormSection,
} from '../../styles/UserRegistered';

export default function UserRegistered() {
  const navigate = useNavigate();

  return (
    <RegisteredPage>
      <FormSection>
        <RegisteredTitle> User Registered!</RegisteredTitle>
        <Button onClick={() => navigate('/')}>Log In</Button>
      </FormSection>

      <RightSection />
    </RegisteredPage>
  );
}
