import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderSection,
  Input,
  ProfileImg,
  Title,
} from '../../styles/Header';

export default function Header() {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      const searchQuery = e.target.value.trim(); // Obtener el valor del input y quitar espacios en blanco
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <HeaderSection>
      <HeaderContainer>
        <Title onClick={() => navigate('/main')}>Hello</Title>
        <Input placeholder="Search" onKeyUp={handleSearch} />
        <ProfileImg src="../../../user.png" />
      </HeaderContainer>
    </HeaderSection>
  );
}
