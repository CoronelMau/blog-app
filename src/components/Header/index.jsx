import { useNavigate } from 'react-router-dom';

import {
  HeaderContainer,
  HeaderSection,
  Input,
  ProfileImg,
  Title,
} from '../../styles/Header';

export default function Header({ handleInfo }) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value != '') {
      navigate('/search');

      const config = {
        method: 'SEARCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: e.target.value,
        }),
      };
      fetch('http://localhost:8000/user/search-profile', config)
        .then((res) => res.json())
        .then((res) => {
          handleInfo(res);
          e.target.value = '';
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <HeaderSection>
      <HeaderContainer>
        <Title>Hello</Title>
        <Input placeholder="Search" onKeyUp={handleSearch} />
        <ProfileImg src="../../../user.png" />
      </HeaderContainer>
    </HeaderSection>
  );
}
