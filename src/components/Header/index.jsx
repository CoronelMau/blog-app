import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Menu from '../Menu';

import {
  HeaderContainer,
  HeaderSection,
  Input,
  ProfileImg,
  Title,
} from '../../styles/Header';

export default function Header() {
  const navigate = useNavigate();

  const [openMenu, setOpenMenu] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('token'));

    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    };

    fetch('http://localhost:8000/user/user-data', config)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUser(res);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    if (e.keyCode === 13 && e.target.value.trim() !== '') {
      const searchQuery = e.target.value.trim();
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <HeaderSection>
      <HeaderContainer>
        <Title onClick={() => navigate('/main')}>Hello</Title>
        <Input placeholder="Search" onKeyUp={handleSearch} />

        <ProfileImg
          src={user.url ? user.url : '../../../user.png'}
          onClick={() => setOpenMenu(!openMenu)}
        />
      </HeaderContainer>
      {openMenu && <Menu userId={user.id} />}
    </HeaderSection>
  );
}
